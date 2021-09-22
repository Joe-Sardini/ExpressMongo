module.exports = app => {
    const videoGames = require("../controllers/videoGames.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Video Game
    router.post("/", videoGames.create);
  
    // Retrieve all videoGames
    router.get("/", videoGames.findAll);
  
    // Retrieve all published videoGames
    router.get("/published", videoGames.findAllPublished);
  
    // Retrieve a single Video Game with id
    router.get("/:id", videoGames.findOne);
  
    // Update a Video Game with id
    router.put("/:id", videoGames.update);
  
    // Delete a Video Game with id
    router.delete("/:id", videoGames.delete);
  
    // Create a new Video Game
    router.delete("/", videoGames.deleteAll);
  
    app.use("/api/videoGames", router);
  };