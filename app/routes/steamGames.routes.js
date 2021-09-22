module.exports = app => {
    const steamGames = require("../controllers/steamGamesList.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Video Game
    router.post("/", steamGames.create);
  
    // Retrieve all videoGames
    router.get("/", steamGames.findAll);
  
    // Retrieve all published videoGames
    router.get("/published", steamGames.findAllPublished);
  
    // Retrieve a single Video Game with id
    router.get("/:id", steamGames.findOne);
  
    // Retrieve a single Video Game with id
    router.get("/appid/:appid", steamGames.findByAppid);

    // Update a steam game with appid
    router.put("/appid/:appid", steamGames.updateByAppid);

    // Update a Video Game with id
    router.put("/:id", steamGames.update);
  
    // Delete a Video Game with id
    router.delete("/:id", steamGames.delete);
  
    // Create a new Video Game
    router.delete("/", steamGames.deleteAll);
  
    app.use("/api/steamGames", router);
  };