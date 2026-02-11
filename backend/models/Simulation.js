import mongoose from 'mongoose'

const simulationSchema = new mongoose.Schema({

  squareMeters: Number,
  housingType: String,
  residents: Number,
  energy: Object,
  locationId: String,

  estimatedConsumptionKWh: Number,
  co2EquivalentKg: Number,

  sessionId: String

}, { timestamps: true })

export default mongoose.model('Simulation', simulationSchema)


