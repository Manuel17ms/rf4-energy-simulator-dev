const Location = require('../models/Location');
const Simulation = require('../models/Simulation');

/**
 * A simple deterministic estimator:
 *
 * Baseline consumption per m2 (kWh per m2 per year) depending on housingType:
 *  - apartment: 30 kWh/m2/yr (example)
 *  - house: 40 kWh/m2/yr (example)
 *
 * Adjustments:
 *  - residents: extra usage for hot water/cooking, add per-person factor
 *  - energy sources: gas vs electricity have different CO2 factors (kgCO2 per kWh or per unit)
 *  - climateFactor from Location: factor >1 increases heating needs in colder climates
 *
 * CO2 calculation:
 *  - electricity: 0.35 kgCO2 per kWh (example)
 *  - gas: 0.2 kgCO2 per kWh-equivalent (example)
 *
 * These numbers are illustrative and should be refined for production.
 */

const ENERGY_CO2 = {
  electricity: 0.35, // kg CO2 per kWh
  gas: 0.20
};

function calcBaseConsumption(squareMeters, housingType) {
  const basePerM2 = housingType === 'house' ? 40 : 30; // kWh per m2 per year
  return squareMeters * basePerM2;
}

function calcResidentsAddition(residents) {
  // per person extra kWh/year for water & cooking
  return residents * 300; // example 300 kWh per person/year
}

exports.postSimulation = async (req, res) => {
  try {
    const payload = req.body;
    const {
      squareMeters = 80,
      housingType = 'apartment',
      residents = 1,
      energy = { water: 'electricity', heating: 'gas', cooking: 'electricity' },
      locationId
    } = payload;

    // get location factor (default 1)
    let location = null;
    if (locationId) {
      location = await Location.findOne({ id: locationId });
    }
    const climateFactor = (location && location.climateFactor) ? location.climateFactor : 1.0;

    // Base consumption
    const base = calcBaseConsumption(squareMeters, housingType);
    const residentsExtra = calcResidentsAddition(residents);

    // Heating share: assume heating is ~40% of base
    const heatingShare = base * 0.4 * climateFactor;
    // Other uses from base
    const otherShare = base * 0.6;

    // Energy mix adjustments: if heating is gas or electricity; if gas assume it's more efficient kWh-equivalent
    // For simplicity we sum kWh estimate:
    const heatingKWh = heatingShare;
    const waterKWh = residents * 150; // per person hot water (kWh/yr) — example
    const cookingKWh = residents * 100; // per person cooking (kWh/yr) — example

    const totalKWh = Math.round(heatingKWh + otherShare + waterKWh + cookingKWh + residentsExtra);

    // CO2 estimation: map each use to energy type and co2 factor
    // We'll approximate entire consumption CO2 by weighting major usages:
    // - heating uses energy.heating
    // - water uses energy.water
    // - cooking uses energy.cooking
    // - remaining 'otherShare' considered mixed electricity
    const co2Heating = heatingKWh * (ENERGY_CO2[energy.heating] || ENERGY_CO2.electricity);
    const co2Water = waterKWh * (ENERGY_CO2[energy.water] || ENERGY_CO2.electricity);
    const co2Cooking = cookingKWh * (ENERGY_CO2[energy.cooking] || ENERGY_CO2.electricity);
    const co2Other = otherShare * ENERGY_CO2.electricity;

    const totalCo2Kg = Math.round((co2Heating + co2Water + co2Cooking + co2Other) * 10) / 10;

    // Get location average (simple: use location.climateFactor to derive average)
    let locationAverage = {
      estimatedConsumptionKWh: Math.round(totalKWh * (location ? (1 + (location.climateFactor - 1) * 0.9) : 1.05)),
      co2EquivalentKg: Math.round(totalCo2Kg * (location ? (1 + (location.climateFactor - 1) * 0.9) : 1.05))
    };

    // Persist simulation (optional)
    const sim = new Simulation({
      squareMeters, housingType, residents, energy, locationId,
      estimatedConsumptionKWh: totalKWh,
      co2EquivalentKg: totalCo2Kg
    });
    await sim.save();

    res.json({
      estimatedConsumptionKWh: totalKWh,
      co2EquivalentKg: totalCo2Kg,
      locationAverage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locs = await Location.find({}, { _id: 0, __v: 0 });
    res.json(locs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving locations', error: err.message });
  }
};

exports.compareLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const location = await Location.findOne({ id: locationId });
    if (!location) return res.status(404).json({ message: 'Location not found' });

    // Create a naive average based on climateFactor
    const baseAvg = 3500; // sample average kWh/year for the city baseline
    const estimatedConsumptionKWh = Math.round(baseAvg * location.climateFactor);
    const co2EquivalentKg = Math.round(estimatedConsumptionKWh * 0.3); // example factor

    res.json({ estimatedConsumptionKWh, co2EquivalentKg });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
