const express = require('express');
const mongoose = require('mongoose'); // Importer le module mongoose
require("dotenv").config();
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://pharmacy-frontend-nu.vercel.app/'
};

app.use(cors(corsOptions)); 

const cityController = require('./controllers/CityController');
const zoneController = require('./controllers/ZoneController');
const pharmacieController = require('./controllers/PharmacieController');


mongoose.connect(process.env.MONGO_URI, { 
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
