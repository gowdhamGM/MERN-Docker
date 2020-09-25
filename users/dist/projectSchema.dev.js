"use strict";

var mongoose = require('mongoose');

var ProjectData = mongoose.Schema({
  clientname: {
    type: String
  },
  projectname: {
    type: String
  },
  status: {
    type: String
  }
});
module.exports = mongoose.model("ProjectData", ProjectData);