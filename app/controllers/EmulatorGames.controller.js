const db = require("../models");
const EmulatorGame = db.EmulatorGame;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const EmulatorGame = new EmulatorGame({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    genre: req.body.genre,
    console: req.body.console,
    multiplayer: req.body.multiplayer
  });

  // Save Video Game in the database
  EmulatorGame
    .save(EmulatorGame)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the entry."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  EmulatorGame.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  EmulatorGame.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found EmulatorGame with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving EmulatorGame with id=${id}`});
    });
};

exports.findAllByUser = (req, res) => {
  const user = req.params.user;

  EmulatorGame.find({ user: user })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "User Not found" });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving user data`});
    });
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  EmulatorGame.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update EmulatorGame with id=${id}. Maybe EmulatorGame was not found!`
        });
      } else res.send({ message: "EmulatorGame was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating EmulatorGame with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  EmulatorGame.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete EmulatorGame with id=${id}. Maybe EmulatorGame was not found!`
        });
      } else {
        res.send({
          message: "EmulatorGame was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete EmulatorGame with id=" + id
      });
    });
};

// Delete all EmulatorGame from the database.
exports.deleteAll = (req, res) => {
  EmulatorGame.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} EmulatorGame were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all EmulatorGame."
      });
    });
};

// Find all published EmulatorGame
exports.findAllPublished = (req, res) => {
  EmulatorGame.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving EmulatorGame."
      });
    });
};