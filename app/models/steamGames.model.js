module.exports = mongoose => {
    const schema = mongoose.Schema(
      {
        appid: Number,
        playtime_windows_forever: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const SteamGamesList = mongoose.model("SteamGamesList", schema);
    return SteamGamesList;
  };