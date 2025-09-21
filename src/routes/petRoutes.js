const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

//route of api then call in controller
router.get("/allpet/", petController.getAllPets); 
router.get("/findpet/:type", petController.getPetsByType); 
router.get("/findpetbyid/:type/:id", petController.getPetById); 
router.post('/addpet', petController.addPet);
router.get("/rejected", petController.getAllRejectedPets);
router.get("/rejected/:type", petController.getRejectedPetsByType);

module.exports = router;
