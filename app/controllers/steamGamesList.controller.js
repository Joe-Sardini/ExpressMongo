const db = require("../models");
const SteamGames = db.SteamGamesList;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.appid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a steam game entry
  const steamGameEntry = new SteamGames({
    appid: req.body.appid,
    playtime_windows_forever: req.body.playtime_windows_forever,
  });
  
  // Save 
  steamGameEntry
    .save(steamGameEntry)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the steam Game."
      });
    });
};

// Retrieve 
exports.findAll = (req, res) => {
  const appid = req.query.appid;
  let condition = appid ? { appid: { $regex: new RegExp(appid), $options: "i" } } : {};

  SteamGames.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving steam games."
      });
    });
};

exports.findByAppid = (req, res) => {
  const id = req.params.appid;

  SteamGames.find({appid: id})
  .then(data => {
    if (!data){
      res.status(404).send({ message: "Not found steam game with appid " + id });
    }else{
      res.send(data);
    }
  })
  .catch(err => {
    res
      .status(500).send({message: `Error retrieving steam game: ${err}`})
  })
}

// Find a single video game with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SteamGames.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found videoGame with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving videoGame with id=${id}`});
    });
};

// Update a steam game by the id in the request
exports.updateByAppid = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.appid;

  SteamGames.findOneAndUpdate({appid:id}, [{ $set: { 'gameName':req.body.gameName } }], { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Steam Game with id=${id}. Maybe VideoGame was not found!`
        });
      } else res.send({ message: "Steam Game was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "findByAppidAndUpdate: Error updating steam game: " + err
      });
    });
};

// Update a steam game by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  SteamGames.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Steam Game with id=${id}. Maybe VideoGame was not found!`
        });
      } else res.send({ message: "Steam Game was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating steam game: " + err
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SteamGames.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete VideoGame with id=${id}. Maybe VideoGame was not found!`
        });
      } else {
        res.send({
          message: "VideoGame was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete VideoGame with id=" + id
      });
    });
};

// Delete all VideoGame from the database.
exports.deleteAll = (req, res) => {
  SteamGames.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Steam games were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all VideoGame."
      });
    });
};

// Find all published VideoGame
exports.findAllPublished = (req, res) => {
  SteamGames.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving VideoGame."
      });
    });
};