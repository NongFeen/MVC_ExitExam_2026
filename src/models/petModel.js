const fs = require("fs");
const path = require("path");

const phoenixFilePath = path.join(__dirname, "phoenixData.json");
const dragonFilePath = path.join(__dirname, "dragonData.json");
const owlFilePath = path.join(__dirname, "owlData.json");
const rejectedFilePath = path.join(__dirname,"rejectedPetData.json");

//Data logic

// Read JSON file
const readJSON = (file) => {
    if (!fs.existsSync(file)) {
        console.error(`❌ Error: File ${file} not found.`);
        return [];
    }
    return JSON.parse(fs.readFileSync(file, "utf8"));
};

exports.getAllPets = () => {
    return {
        phoenix: readJSON(phoenixFilePath),
        dragon: readJSON(dragonFilePath),
        owl: readJSON(owlFilePath),
    };
};

// file paths for pet types
const filePaths = {
    phoenix: phoenixFilePath,
    dragon: dragonFilePath,
    owl: owlFilePath,
};

exports.getPetsByType = (type) => {
    if (!filePaths[type]) {
        return null;
    }
    return readJSON(filePaths[type]);
};

// find pet by id
exports.getPetById = (type, id) => {
    const pets = exports.getPetsByType(type);
    if (!pets) return null;
    return pets.find((pet) => pet.pet_id === id);
};
//#region Add new pet
const getFilePathByPetType = (type) => {
    switch (type) {
        case "phoenix":
            return phoenixFilePath;
        case "dragon":
            return dragonFilePath;
        case "owl":
            return owlFilePath;
        default:
            return null;
    }
};

// gen ID by looking all id in database 
// if dupe then gen again
const generatePetId = () => {
    let petId;
    let pets;

    do {
        petId = Math.floor(10000000 + Math.random() * 90000000); 
        pets = Object.values(exports.getAllPets()).flat(); 
    } while (pets.some(pet => pet.pet_id === petId)); //dupe id 

    return petId;
};

// Add new pet 
exports.addNewPet = (type, newPet) => {
    newPet.pet_id = generatePetId(); 
    const pets = exports.getPetsByType(type);  

    //#region find rejected pet type to save
    if (type === "phoenix") {
        console.log(newPet);
        if (!newPet.fireproof_certificate) {
            saveRejectedPet(newPet); // Save to rejected data
            return false;
        }
    }
    if (type === "dragon") {
        if (newPet.smokePollutionLevel > 70) {
            saveRejectedPet(newPet);
            return false;
        }
    }
    if (type === "owl") {
        if (newPet.flyingDistance < 100) {
            saveRejectedPet(newPet);
            return false;
        }
    }
    //#endregion

    if (!pets) {
        return false;
    }

    // Add the new pet to the pets array
    pets.push(newPet);
    const filePath = getFilePathByPetType(type); 
    if (filePath) {
        fs.writeFileSync(filePath, JSON.stringify(pets, null, 2), 'utf8');
        return true;
    }

    return false;
};

//save rejected data
const saveRejectedPet = (rejectedPet) => {
    const rejectedPetDataPath = path.join(__dirname, "rejectedPetData.json");
    rejectedPet.pet_id = generatePetId();
    let rejectedPets = [];
    if (fs.existsSync(rejectedPetDataPath)) {
        rejectedPets = readJSON(rejectedPetDataPath);
    }

    rejectedPets.push(rejectedPet);
    fs.writeFileSync(rejectedPetDataPath, JSON.stringify(rejectedPets, null, 2), 'utf8');
};
exports.saveRejectedPet = saveRejectedPet;


// Get all rejected pets
exports.getRejectedPets = () => {
    return readJSON(rejectedFilePath);
};

// Get rejected pets by type
exports.getRejectedPetsByType = (type) => {
    const rejectedPets = readJSON(rejectedFilePath);
    return rejectedPets.filter(pet => pet.pet_type.toLowerCase() === type.toLowerCase());
};


