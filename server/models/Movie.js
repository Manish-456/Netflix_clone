const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
      required: true,
    },
    imgTitle: {
      type: String,
      required: true,
    },
    imgSm: {
      type: String,
    },
    video: {
      type: String,
    },
    limit: {
      type: Number,
    },
    genre: {
      type: String,
    },
    trailor : {
     type : String
    },
     year : {
      type : String
     },
     isSeries : {
      type : Boolean,
      default: false
     },
     duration : {
      type : String
     }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
