const mongoose = require('mongoose');


const ClientData = mongoose.Schema({
    clientName: {
        type: String
    },
    companyName: {
        type: String
    },
    clientStatus: {
        type: String
    },
    project:[{
        clientName:{type:String},
        projectName: {type: String},
        proStatus:{type: String}
        }]   
})

module.exports = mongoose.model("ClientData",ClientData);