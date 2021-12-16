module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        rating: Number,
        genre: String,
        console: String,
        multiplayer: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const EmulatorGame = mongoose.model("EmulatorGame", schema);
    return EmulatorGame;
  };