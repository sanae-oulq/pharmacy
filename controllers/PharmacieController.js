const express = require('express');
const router = express.Router();

const Pharmacie = require('../models/Pharmacie');
const PharmacieService = require('../services/PharmacieService');
const pharmacieService = new PharmacieService(Pharmacie);


// GET all pharmacies
router.get('/', async (req, res) => {
  try {
    const pharmacies = await pharmacieService.getAllPharmacies();
    res.json(pharmacies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a pharmacie by id
router.get('/:id', async (req, res) => {
  try {
    const Pharmacie = await pharmacieService.getPharmacieById(req.params.id);
    if (!Pharmacie) {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    res.json(Pharmacie);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    res.status(500).send('Server Error');
  }
});


// GET a pharmacie by garde, zone and city
router.get('/:garde/:zone', async (req, res) => {
  try {
    const Pharmacies = await pharmacieService.getPharmaciesByGZC(req.params.garde, req.params.zone);
  
    if (!Pharmacies) {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    res.json(Pharmacies);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    res.status(500).send('Server Error');
  }
});


// POST a new Pharmacie
router.post('/', async (req, res) => {
  try {
    const Pharmacie = new Pharmacie(req.body);
    await pharmacieService.savePharmacie(Pharmacie);
    res.json(Pharmacie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update a Pharmacie by id
router.put('/:id', async (req, res) => {
  try {
    let Pharmacie = await pharmacieService.getPharmacieById(req.params.id);
    if (!Pharmacie) {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    Pharmacie.name = req.body.name;
    await pharmacieService.savePharmacie(Pharmacie);
    res.json(Pharmacie);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    res.status(500).send('Server Error');
  }
});

// DELETE a Pharmacie by id
router.delete('/:id', async (req, res) => {
  try {
    const Pharmacie = await pharmacieService.getPharmacieById(req.params.id);
    if (!Pharmacie) {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    await pharmacieService.deletePharmacie(req.params.id);
    res.json({ msg: 'Pharmacie removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pharmacie not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
