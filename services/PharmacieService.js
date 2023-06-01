const Pharmacie = require('../models/Pharmacie');

class PharmacieService {
  constructor(pharmacieModel) {
    this.pharmacieModel = pharmacieModel;
  }

  // Get all pharmacies
  async getAllPharmacies() {
    try {
      const pharmacies = await this.pharmacieModel.find();
      return pharmacies;
    } catch (error) {
      throw new Error(`Unable to fetch pharmacies: ${error}`);
    }
  }

  // Get a pharmacie by ID
  async getPharmacieyById(id) {
    try {
      const pharmacie = await this.pharmacieModel.findById(id);
      return pharmacie;
    } catch (error) {
      throw new Error(`Unable to fetch pharmacie with ID ${id}: ${error}`);
    }
  }

  async getPharmaciesByGZC(garde, zone){
    try {
      const pharmacies = await this.pharmacieModel.find({ garde: garde, zone_id: zone });
  
      const filteredPharmacies = pharmacies.filter((pharmacy) => {
        return pharmacy.zone_id !== null;
      });
      return filteredPharmacies;

    } catch (err) {
        throw new Error(`Unable to fetch pharmacie by garde, zone and city`);
    }
  }

  // Save a new pharmacie
  async savePharmacie(pharmacie) {
    try {
      const newPharmacie = new this.pharmacieModel(Pharmacie);
      const savedPharmacie = await newPharmacie.save();
      return savedPharmacie;
    } catch (error) {
      throw new Error(`Unable to save pharmacie: ${error}`);
    }
  }

  // Update a pharmacie
  async updatePharmacie(id, updatedPharmacie) {
    try {
      const existingPharmacie = await this.pharmacieModel.findById(id);
      if (!existingPharmacie) {
        return null;
      }
      existingPharmacie.name = updatedPharmacie.name;
      const updated = await existingPharmacie.save();
      return updated;
    } catch (error) {
      throw new Error(`Unable to update pharmacie with ID ${id}: ${error}`);
    }
  }

  // Delete a pharmacie by ID
  async deletePharmacie(id) {
    try {
      const deleted = await this.pharmacieModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      throw new Error(`Unable to delete pharmacie with ID ${id}: ${error}`);
    }
  }
}

module.exports = PharmacieService;
