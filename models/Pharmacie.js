const mongoose = require('mongoose');

const pharmacieSchema = new mongoose.Schema({
  name: {
    type: String,   
    required: true
  }
});

module.exports = mongoose.model('Pharmacie', pharmacieSchema);
