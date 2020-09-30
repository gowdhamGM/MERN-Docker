const mongoose = require('mongoose');

const timesheetData = mongoose.Schema({

    employeeId:{
        type:String,
    },
    employeeName:{
        type: String,
    },
    status:{
        type:String,
    },

    date:{
        type :String,
    },
    clientName:{
        type :String,
    },
    projectName:{
        type:String,
    },
    taskName:{
        type: String,
    },
    
    workDone : {
        type : String,
    },
    durationHrs:{
        type: String,
    },
    durationMins:{
        type: String,
    },
    createdAt: {
        type: Date, 
    },
    updatedAt: {
      type: Date, 
    }

}) 
module.exports= mongoose.model("year_2020",timesheetData);