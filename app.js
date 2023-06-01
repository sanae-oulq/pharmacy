const express = require('express');
const mongoose = require('mongoose'); // Importer le module mongoose
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001'
};

app.use(cors(corsOptions)); 

const cityController = require('./controllers/CityController');
const zoneController = require('./controllers/ZoneController');
const pharmacieController = require('./controllers/PharmacieController');


mongoose.connect('mongodb://127.0.0.1:27017/location', { // Configurer la connexion à la base de données
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/cities', cityController);
app.use('/api/zones', zoneController);
app.use('/api/pharmacies', pharmacieController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
