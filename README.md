Progetto:Tenergy


Backend: Node.js + Express + MongoDB Atlas

Frontend: Vue 3 + Vite + Pinia + Chart.js

Database: MongoDB Atlas


Deploy online consultabile ai seguenti link:


Backend:
https://tenergy-backend.onrender.com

Frontend:
https://rf4-energy-simulator-1.onrender.com



Avvio locale:
Backend
cd backend
npm install
npm run dev


Oppure con dotenv precaricato:

node -r dotenv/config server.js

Frontend
cd frontend
npm install
npm run dev

Testing:

Il progetto include una test-suite per verificare il corretto funzionamento delle API.

Tecnologie usate:

Jest

Supertest

Eseguire i test
cd backend
npm test


I test coprono:

-Creazione simulazione
-Recupero storico
-Confronto località


Database:


Il progetto utilizza MongoDB Atlas consultabile al seguente link: https://cloud.mongodb.com/v2/6990d086a82ff163f1f75a03#/clusters/detail/Tnergy.


CI/CD:

GitHub Actions esegue automaticamente:

install dipendenze

esecuzione test backend

Ad ogni push su main.

