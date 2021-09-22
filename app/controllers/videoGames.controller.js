const db = require("../models");
const VideoGame = db.videoGames;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const videoGame = new VideoGame({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    rating: req.body.rating,
    genre: req.body.genre,
    user: req.body.user
  });

  // Save Video Game in the database
  videoGame
    .save(videoGame)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the video Game."
      });
    });
};

// Retrieve all videoGame from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  VideoGame.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single video game with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  VideoGame.findById(id)
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  VideoGame.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update VideoGame with id=${id}. Maybe VideoGame was not found!`
        });
      } else res.send({ message: "VideoGame was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  VideoGame.findByIdAndRemove(id, { useFindAndModify: false })
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
  VideoGame.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} VideoGame were deleted successfully!`
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
  VideoGame.find({ published: true })
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