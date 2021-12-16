module.exports = app => {
    const EmulatorGames = require("../controllers/EmulatorGames.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Video Game
    router.post("/", EmulatorGames.create);
  
    // Retrieve all videoGames
    router.get("/", EmulatorGames.findAll);
  
    // Retrieve all published videoGames
    router.get("/published", EmulatorGames.findAllPublished);
  
    // Retrieve a single Video Game with id
    router.get("/:id", EmulatorGames.findOne);
  
    // Update a Video Game with id
    router.put("/:id", EmulatorGames.update);
  
    // Delete a Video Game with id
    router.delete("/:id", EmulatorGames.delete);
  
    // Create a new Video Game
    router.delete("/", EmulatorGames.deleteAll);
  
    app.use("/api/EmulatorGames", router);
  };