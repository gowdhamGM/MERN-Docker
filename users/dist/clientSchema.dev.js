"use strict";

var mongoose = require('mongoose');

var ClientData = mongoose.Schema({
  clientname: {
    type: String
  },
  companyname: {
    type: String
  },
  clientstatus: {
    type: String
  },
  project: [{
    clientname: {
      type: String
    },
    projectname: {
      type: String
    },
    prostatus: {
      type: String
    }
  }]
});
module.exports = mongoose.model("ClientData", ClientData);