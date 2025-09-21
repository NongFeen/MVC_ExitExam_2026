const petModel = require("../models/petModel");

exports.getAllPets = (req, res) => {
    const pets = petModel.getAllPets();
    console.log(">>")
    res.json(pets);
};

//get all data by type
exports.getPetsByType = (req, res) => {
    const type = req.params.type.toLowerCase();
    const pets = petModel.getPetsByType(type);

    if (pets) {
        res.json(pets);
    } else {
        res.status(404).json({ message: "Invalid pet type" });
    }
};

//2 input 
// type=x, petID=12345678
exports.getPetById = (req, res) => {
    const type = req.params.type.toLowerCase();
    const petId = req.params.id;

    const pet = petModel.getPetById(type, petId);

    if (pet) {
        res.json(pet);
    } else {
        res.status(404).json({ message: "Pet not found" });
    }
};

//add new pet
exports.addPet = (req, res) => {
    const { type, healthDate, vaccineCount, additionalInfo } = req.body;

    const validTypes = ["phoenix", "dragon", "owl"];
    if (!validTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid pet type" });
    }

    let newPet = {
        pet_type: type,
        last_health_check: healthDate,
        vaccines_received: vaccineCount,
    };

    console.log(newPet);
    // Check type
    if (type === "phoenix") {
        if (additionalInfo === false) {
            petModel.saveRejectedPet({
                pet_type: "phoenix",
                rejected_reason: "Phoenix must have a fireproof certificate certificate"
            });
            return res.status(400).json({ message: "Phoenix must have a fireproof certificate certificate" });
        }
        newPet.fireproof_certificate = true; // replace with fire_resistance_certificate
        console.log(newPet);
    } else if (type === "dragon") {
        const pollutionLevel = parseFloat(additionalInfo);
        if (pollutionLevel > 70) {
            petModel.saveRejectedPet({
                pet_type: "dragon",
                rejected_reason: `Dragon's pollution level must be less than 70%. Given pollution level: ${pollutionLevel}`
            });
            return res.status(400).json({ message: "Dragon's pollution level must be less than 70%" });
        }
        newPet.smoke_pollution_level = pollutionLevel; // replace with smoke_pollution_level
    } else if (type === "owl") {
        const flightDistance = parseFloat(additionalInfo);
        if (flightDistance < 100) {
            petModel.saveRejectedPet({
                pet_type: "owl",
                rejected_reason: `Owl's flight distance must be at least 100 km. Given distance: ${flightDistance}`
            });
            return res.status(400).json({ message: "Owl's flight distance must be at least 100 km" });
        }
        newPet.flight_distance_without_food = flightDistance; // replace with flight_distance_without_food
    }

    // If no rejection, add the new pet
    const petAdded = petModel.addNewPet(type, newPet);
    if (!petAdded) {
        return res.status(500).json({ message: "Error adding pet",
            newPet
        });
    }

    // Send response back
    res.status(201).json({ message: "Pet added successfully", pet: newPet });
};

// Get all rejected pets
exports.getAllRejectedPets = (req, res) => {
    const rejectedPets = petModel.getRejectedPets();
    if (rejectedPets.length > 0) {
        res.json(rejectedPets);
    } else {
        res.status(404).json({ message: "No rejected pets found" });
    }
};

// Get rejected pets by type
exports.getRejectedPetsByType = (req, res) => {
    const type = req.params.type.toLowerCase();
    const rejectedPets = petModel.getRejectedPetsByType(type);

    if (rejectedPets && rejectedPets.length > 0) {
        res.json(rejectedPets);
    } else {
        res.status(404).json({ message: `No rejected pets found for type: ${type}` });
    }
};

