const router = require('express').Router();
const User = require('./users/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const ClientData = require('./users/clientSchema');
const EmpData = require('./users/userSchema')
const TimeSheet = require('./users/timesheetSchema');
const { findById, find } = require('./users/userSchema');

router.post('/register', async(req, res) => {
  
    try {
        var emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json("Email already 1exists");
        }

        var hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            userName: req.body.userName,
            password: hash,
            empId: req.body.empId,
            email: req.body.email,
            role: req.body.role
        });

        var data = await user.save();
        res.json(data);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/login', async(req, res) => {

    try {
        var userData = await User.findOne({ email: req.body.email });
        var clientData = await ClientData.find();
        if (!userData) {
            return res.status(400).json("Email Not Found");
        }
        var validpsd = await bcrypt.compare(req.body.password, userData.password);
        if (!validpsd) {
            return res.status(400).json("Password Mismatch");
        }
        const userToken = jwt.sign({ email: userData.email, role: userData.role, empId:userData.empId }, 'key', {
            algorithm: "HS256",
            expiresIn: '1hr',
        })
        return res.header('auth', userToken).json({
            token: userToken,
            role: userData.role,
            id: userData._id,
            name: userData.userName,
            empId:userData.empId,
        });
        
    } catch (e) {
        res.status(400).json(e);
    }
});

const validUser = (req, res, next) => {
    var token = req.header('auth');
    req.token = token;
    next();
}

router.get('/getall', validUser, async(req, res) => {
    jwt.verify(req.token, 'key', async(err, data) => {
        if (err) {
            res.status(400).json({ error: "Invalid User" });
        } else {
            const data = await User.find().select(['-password']);
            res.json(data)
        }
    })
});

router.get('/get/:id', validUser, async(req, res) => {
    jwt.verify(req.token, 'key', async(err, data) => {
        if (err) {
            res.status(400).json({ error: "Invalid User" });
        } else {
            const data = await User.findById(req.params.id).select(['-password']);
            res.json(data)
        }
    })
});

router.get('/logout', validUser, async(req, res, next) => {
    res.clearCookie("access_token")
    res.json({ message: "Logged out" })
});
//___________________________ClientTable_____________________________________________________
router.post("/clientpostdata", async(req, res) => {
    try{
        var clientExist = await ClientData.findOne({clientName:req.body.clientName});
        if (clientExist){
            return res.status(400).json("Client already exists");

        }
        var clientdata = new ClientData({
            clientName: req.body.clientName,
            companyName: req.body.companyName,
            clientStatus: req.body.clientStatus,
    
    });
    var data = await clientdata.save();
    res.json(data);
}   catch(e){
    res.status(400).json(e)
}
});




router.get('/clientgetdata', async(req, res) => {
    var findData = await ClientData.find().select(['-__v']);
    res.json(findData)

});

router.get('/clientgetdata/:id', async(req, res) => {
    var findData = await ClientData.find({_id:req.params.id}).select(['-__v']);
    res.json(findData)

});

router.delete("/clientdeldata/:id", async(req, res) => {
    var getData = await ClientData.deleteOne({ clientName: req.params.id }).then(e => {
        res.json(e)
    })

})

router.put("/clientupddata/:id", async(req, res) => {

    var updData = await ClientData.update({ _id: req.params.id }, {
        $set: {
            clientName: req.body.clientName,
            companyName: req.body.companyName,
            clientStatus: req.body.clientStatus,
        }
    }).then(e => {
        var delData = ClientData.findOne({ _id: req.params.id }).then(e => {
            res.json(e)
        })
    }).catch(err => {
        console.log(err);
    })
})


//----------------projectTable-----------------------


//Post project in represented client in project array
router.post("/clientpostpro/:id",async(req,res) =>{
    try{
        var projectExist = await ClientData.findOne({clientName:req.params.id,'project.projectName':req.body.projectName})
        if(projectExist){
            return res.status(400).json("Project already exists")
        }
    var putPro = await ClientData.updateOne({ clientName:req.params.id}, {
        $push: {
            "project":{clientName:req.params.id,projectName:req.body.projectName,proStatus:req.body.proStatus}
        
        }
    }).then(e => {
        var delData = ClientData.findOne({ clientName: req.params.id }).then(e => {
            res.json(e)
        })
    })
}catch(e){
    res.status(400).json(e)
}
});


// Get all project details represented client section using PRAM:clientID
router.get('/clientgetallpro/:id', async(req, res) => {
    var findData = await ClientData.find({_id:req.params.id});
    res.json(findData)

});

// Get sepecified project details represented client section using project name PRAM:clientID,projectID
router.get('/clientgetpro1/:id', async(req, res) => {
    var findData = await ClientData.find({'_id':req.params.id,'project._id':req.body.id},{_id:0,project:{$elemMatch:{_id:req.body.id}}});
    res.json(findData)

});

router.get('/clientgetpro/:id', async(req, res) => {
    var findData = await ClientData.find({'clientName':req.params.id}).select(['-__v']);
    res.json(findData)

});


//Delete project in represented client section by using PRAM:clientname,projectname
router.delete("/clientdelpro/:id/:projectName",async(req,res) =>{
    var putPro = await ClientData.updateOne({ clientName:req.params.id}, {
        $pull: {
            "project":{projectName:req.params.projectName}
        
        }
    }).then(e =>{
        res.json(e)
    })

})


//Edit project in represented client in project array PRAM: clientID, projectID,project new name
router.put("/clientupdpro/:id/:projectName", async(req, res) => {

    var updData = await ClientData.updateMany({ clientName:req.params.id,'project.projectName':req.params.projectName}, {
        $set: {
            'project.$.projectName' :req.body.projectName
            
        }
    }).then(e => {
        var delData = ClientData.find({ clientName: req.params.id }).then(e => {
            res.json(e)
        })
   })
 })

//_______________________Employee Table________________________________________________


//Add new user in user collection
router.post('/register_emp', async(req, res) => {
  
    try {
        var emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).json("Email already 1exists");
        }

        var hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            userName: req.body.userName,
            password: hash,
            empId: req.body.empId,
            email: req.body.email,
            role: req.body.role
        });

        var data = await user.save();
        res.json(data);
    } catch (e) {
        res.status(400).json(e);
    }

});


//Get specific users details using role 

router.get('/usergetdata/:role', async(req, res) => {
    var findData = await EmpData.find({ role: req.params.role }).select(['-__v']);
    res.json(findData)

});

//Get specific single user detail using id 
router.get('/usergetdata/:id', async(req, res) => {
    var findData = await EmpData.find({ _id: req.params.id }).select(['-__v']);
    res.json(findData)

});

//Edit specific client data using id

router.put("/empupddata/:id", async(req, res) => {

    var updData = await EmpData.update({ _id: req.params.id }, {
        
        $set: {
            email: req.body.email,
            userName: req.body.userName,
            password: await bcrypt.hash(req.body.password, 10),
            empId:req.body.empId,
            
        }
    }).then(e => {
        var updatedData = EmpData.find({ _id: req.params.id }).then(e => {
            res.json(e)
        })
    }).catch(err => {
        console.log(err);
    })
})

router.delete("/empdeldata/:id", async(req, res) => {
    var getData = await EmpData.deleteOne({ _id: req.params.id }).then(e => {
        res.json(e)
    })

})




//___________________________TimesheetTable____________________________________________


router.post("/timesheetpostdata",async(req,res)=>{

    var timeSheetdata = new TimeSheet({
        employeeId: req.body.employeeId,
        employeeName: req.body.employeeName,
        status: req.body.status,
        date: req.body.date,
        clientName:req.body.clientName,
        projectName:req.body.projectName,
        taskName:req.body.taskName,
        workDone:req.body.workDone,
        durationHrs:req.body.durationHrs,
        durationMins :req.body.durationMins,
        createdAt:new Date(),
        updatedAt: new Date(),

});
var data = await timeSheetdata.save();
res.json(data);
})

router.get ("/timesheetgetdata",async(req,res)=>{
    var findData=await TimeSheet.find().select(['-__v']);
    res.json(findData)
})

router.get('/timesheetgetdata/:id', async(req, res) => {
    var findData = await TimeSheet.find({ employeeId: req.params.id }).select(['-__v']);
    res.json(findData)
    console.log(findData)
});

router.get('/timesheetgetdata2/:id', async(req, res) => {
    var findData = await TimeSheet.find({ employeeId: req.params.id, date: req.body.date }).select(['-__v']);
    res.json(findData)
    console.log(findData)

});




router.get('/tsheet', async(req, res) => {
    var findData = await TimeSheet.find({
        $expr:{
            $eq:[
                {
                    $year:"createdAt"
                },
                2020
            ],
            $eq:[
                {
                    $month:"createdAt"
                },
                9
            ]
        },
        employeeId:"2707"
    })
    res.json(findData)

 })

    

    

router.put("/timesheetupddata/:id", async(req, res) => {

    var updData = await TimeSheet.update({ _id: req.params.id }, {
        
        $set: {
            employeeId: req.body.employeeId,
            employeeName: req.body.employeeName,
            status: req.body.status,
            date: req.body.date,
            clientName:req.body.clientName,
            projectName:req.body.projectName,
            taskName:req.body.taskName,
            workDone:req.body.workDone,
            durationHrs:req.body.durationHrs,
            durationMins :req.body.durationMins,
            updatedAt: new Date(),
            
        }
    }).then(e => {
        var updatedData = TimeSheet.find({ _id: req.params.id }).then(e => {
            res.json(e)
        })
    }).catch(err => {
        console.log(err);
    })
})

router.delete("/timesheetdeldata/:id", async(req, res) => {
    var getData = await TimeSheet.deleteOne({ _id: req.params.id }).then(e => {
        res.json(e)
    })

})



module.exports = router;
