"use strict";

var router = require('express').Router();

var User = require('./users/userSchema');

var bcrypt = require('bcryptjs');

var jwt = require("jsonwebtoken");

var ClientData = require('./users/clientSchema');

var ProjectData = require('./users/projectSchema');

var CheckboxData = require('./users/checkbox');

router.post('/register', function _callee(req, res) {
  var emailExist, hash, user, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          emailExist = _context.sent;

          if (!emailExist) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json("Email already 1exists"));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 8:
          hash = _context.sent;
          user = new User({
            username: req.body.username,
            password: hash,
            empId: req.body.empId,
            email: req.body.email,
            role: req.body.role
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          data = _context.sent;
          res.json(data);
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          res.status(400).json(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router.post('/login', function _callee2(req, res) {
  var userData, clientData, validpsd, userToken;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 3:
          userData = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(ClientData.find());

        case 6:
          clientData = _context2.sent;

          if (userData) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json("Email Not Found"));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, userData.password));

        case 11:
          validpsd = _context2.sent;

          if (validpsd) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(400).json("Password Mismatch"));

        case 14:
          userToken = jwt.sign({
            email: userData.email,
            role: userData.role
          }, 'key', {
            algorithm: "HS256",
            expiresIn: '1hr'
          });
          return _context2.abrupt("return", res.header('auth', userToken).json({
            token: userToken,
            role: userData.role,
            id: userData._id,
            name: userData.username // client:clientData,

          }));

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json(_context2.t0);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
});

var validUser = function validUser(req, res, next) {
  var token = req.header('auth');
  req.token = token;
  next();
};

router.get('/getall', validUser, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          jwt.verify(req.token, 'key', function _callee3(err, data) {
            var _data;

            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!err) {
                      _context3.next = 4;
                      break;
                    }

                    res.status(400).json({
                      error: "Invalid User"
                    });
                    _context3.next = 8;
                    break;

                  case 4:
                    _context3.next = 6;
                    return regeneratorRuntime.awrap(User.find().select(['-password']));

                  case 6:
                    _data = _context3.sent;
                    res.json(_data);

                  case 8:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.get('/get/:id', validUser, function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          jwt.verify(req.token, 'key', function _callee5(err, data) {
            var _data2;

            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!err) {
                      _context5.next = 4;
                      break;
                    }

                    res.status(400).json({
                      error: "Invalid User"
                    });
                    _context5.next = 8;
                    break;

                  case 4:
                    _context5.next = 6;
                    return regeneratorRuntime.awrap(User.findById(req.params.id).select(['-password']));

                  case 6:
                    _data2 = _context5.sent;
                    res.json(_data2);

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
router.get('/logout', validUser, function _callee7(req, res, next) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res.clearCookie("access_token");
          res.json({
            message: "Logged out"
          });

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //___________________________ClientTable_____________________________________________________

router.post("/clientpostdata", function _callee8(req, res) {
  var clientExist, clientdata, data;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(ClientData.findOne({
            clientname: req.body.clientname
          }));

        case 3:
          clientExist = _context8.sent;

          if (!clientExist) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return", res.status(400).json("Client already exists"));

        case 6:
          clientdata = new ClientData({
            clientname: req.body.clientname,
            companyname: req.body.companyname,
            clientstatus: req.body.clientstatus
          });
          _context8.next = 9;
          return regeneratorRuntime.awrap(clientdata.save());

        case 9:
          data = _context8.sent;
          res.json(data);
          _context8.next = 16;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json(_context8.t0);

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/clientgetdata', function _callee9(req, res) {
  var findData;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(ClientData.find().select(['-__v']));

        case 2:
          findData = _context9.sent;
          res.json(findData);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
router.get('/clientgetdata/:id', function _callee10(req, res) {
  var findData;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(ClientData.findOne({
            _id: req.params.id
          }).select(['-__v']));

        case 2:
          findData = _context10.sent;
          res.json(findData);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
router["delete"]("/clientdeldata/:id", function _callee11(req, res) {
  var getData;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(ClientData.deleteOne({
            clientname: req.params.id
          }).then(function (e) {
            res.json(e);
          }));

        case 2:
          getData = _context11.sent;

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
});
router.put("/clientupddata/:id", function _callee12(req, res) {
  var updData;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(ClientData.update({
            _id: req.params.id
          }, {
            $set: {
              clientname: req.body.clientname,
              companyname: req.body.companyname,
              clientstatus: req.body.clientstatus
            }
          }).then(function (e) {
            var delData = ClientData.findOne({
              _id: req.params.id
            }).then(function (e) {
              res.json(e);
            });
          })["catch"](function (err) {
            console.log(err);
          }));

        case 2:
          updData = _context12.sent;

        case 3:
        case "end":
          return _context12.stop();
      }
    }
  });
});
router.get("/checkboxget", function _callee13(req, res) {
  var findbox;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(CheckboxData.find().select(['-__v']));

        case 2:
          findbox = _context13.sent;
          res.json(findbox);

        case 4:
        case "end":
          return _context13.stop();
      }
    }
  });
});
router.post("/checkboxpost", function _callee14(req, res) {
  var checkboxdata, data;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          checkboxdata = new CheckboxData({
            name: req.body.name
          });
          _context14.next = 3;
          return regeneratorRuntime.awrap(checkboxdata.save());

        case 3:
          data = _context14.sent;
          res.json(data);

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
}); //----------------projectTable-----------------------
//Post project in represented client in project array

router.post("/clientpostpro/:id", function _callee15(req, res) {
  var projectExist, putPro;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(ClientData.findOne({
            clientname: req.params.id,
            'project.projectname': req.body.projectname
          }));

        case 3:
          projectExist = _context15.sent;

          if (!projectExist) {
            _context15.next = 6;
            break;
          }

          return _context15.abrupt("return", res.status(400).json("Project already exists"));

        case 6:
          _context15.next = 8;
          return regeneratorRuntime.awrap(ClientData.updateOne({
            clientname: req.params.id
          }, {
            $push: {
              "project": {
                clientname: req.params.id,
                projectname: req.body.projectname,
                prostatus: req.body.prostatus
              }
            }
          }).then(function (e) {
            var delData = ClientData.findOne({
              clientname: req.params.id
            }).then(function (e) {
              res.json(e);
            });
          }));

        case 8:
          putPro = _context15.sent;
          _context15.next = 14;
          break;

        case 11:
          _context15.prev = 11;
          _context15.t0 = _context15["catch"](0);
          res.status(400).json(_context15.t0);

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Get all project details represented client section using PRAM:clientID

router.get('/clientgetallpro/:id', function _callee16(req, res) {
  var findData;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(ClientData.find({
            _id: req.params.id
          }));

        case 2:
          findData = _context16.sent;
          res.json(findData);

        case 4:
        case "end":
          return _context16.stop();
      }
    }
  });
}); // Get sepecified project details represented client section using project name PRAM:clientID,projectID

router.get('/clientgetpro/:id', function _callee17(req, res) {
  var findData;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(ClientData.find({
            '_id': req.params.id,
            'project._id': req.body.id
          }, {
            _id: 0,
            project: {
              $elemMatch: {
                _id: req.body.id
              }
            }
          }));

        case 2:
          findData = _context17.sent;
          res.json(findData);

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
}); //Delete project in represented client section by using PRAM:clientname,projectname

router["delete"]("/clientdelpro/:id/", function _callee18(req, res) {
  var putPro;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(ClientData.updateOne({
            clientname: req.params.id
          }, {
            $pull: {
              "project": {
                projectname: req.body.projectname
              }
            }
          }).then(function (e) {
            res.json(e);
          }));

        case 2:
          putPro = _context18.sent;

        case 3:
        case "end":
          return _context18.stop();
      }
    }
  });
}); //Edit project in represented client in project array PRAM: clientID, projectID,project new name

router.put("/clientupdpro/:id/", function _callee19(req, res) {
  var updData;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(ClientData.update({
            _id: req.params.id,
            'project._id': req.body.id
          }, {
            $set: {
              'project.$.projectname': req.body.projectname
            }
          }).then(function (e) {
            var delData = ClientData.findOne({
              _id: req.params.id
            }).then(function (e) {
              res.json(e);
            });
          }));

        case 2:
          updData = _context19.sent;

        case 3:
        case "end":
          return _context19.stop();
      }
    }
  });
});
module.exports = router;