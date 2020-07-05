
const shajs = require('sha.js');
const image = require('./image');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = image.multer;
const storage = image.storage;

//set up database connection
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var user;


mongo.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
    //error in connection
    console.error(err);
    return
  }
  //connected to database
  const db = client.db('kviskoteka');


  //set up http and headers
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });


  /******** HTTP REQUESTS ********/

  //REGISTER WITHOUT IMAGE
  app.post("/register", (req, res, next) => {

    const collection = db.collection('users');

    //check if username or email already exists
    collection.findOne({
      $or: [{ username: req.body.username },
      { email: req.body.email }]
    }, (err, item) => {
      if (err) {
        res.status(200).json({
          flag: false
        });
        return;
      }
      //if username and email are available
      if (item == null) {
        collection.insertOne({
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          profession: req.body.profession,
          password: shajs('sha256').update(req.body.password).digest('hex'),
          gender: req.body.gender,
          jmbg: req.body.jmbg,
          question: req.body.question,
          answer: req.body.answer,
          type: req.body.type,
          username: req.body.username,
          accepted: false
        }, (err, result) => {
          if (err) {
            //couldn't insert into database
            res.status(200).json({
              flag: false
            });

          } else {
            //inserted into database
            res.status(200).json({
              flag: true
            });
          }
        });

        //username or email taken
      } else {
        res.status(200).json({
          flag: false
        });
      }
    });
  });



  //REGISTER WITH IMAGE
  app.post("/registerWithImage", multer({ storage: storage }).single("image"), (req, res, next) => {

    const collection = db.collection('users');

    //check if username or email already exists
    collection.findOne({
      $or: [{ username: req.body.username },
      { email: req.body.email }]
    }, (err, item) => {
      if (err) {

        res.status(200).json({
          flag: false
        });
        return;
      }
      //if username and email are available
      if (item == null) {
        collection.insertOne({
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          profession: req.body.profession,
          password: shajs('sha256').update(req.body.password).digest('hex'),
          gender: req.body.gender,
          jmbg: req.body.jmbg,
          question: req.body.question,
          answer: req.body.answer,
          type: req.body.type,
          username: req.body.username,
          imagePath: "./images/" + req.file.filename,
          accepted: false
        }, (err, result) => {
          if (err) {
            //couldn't insert into database
            res.status(200).json({
              flag: false
            });

          } else {
            //inserted into database
            res.status(200).json({
              flag: true
            });
          }

        });

        //username or email taken
      } else {
        res.status(200).json({
          flag: false
        });

      }
    });

  });


  //LOGIN
  app.post("/login", (req, res, next) => {

    const collection = db.collection('users');

    //check if username or email already exists
    collection.findOne({
      username: req.body.username,
    }, (err, item) => {

      if (err) {
        res.status(200).json({
          type: '',
          message: 'Error'
        });
        return;
      }

      //if username found
      if (item != null) {
        //check password
        if (item.password === shajs('sha256').update(req.body.password).digest('hex')) {
          if (item.accepted === true) {
            res.status(200).json({
              type: item.type,
              message: 'Success'
            });
            return;
          } else {
            res.status(200).json({
              type: '',
              message: 'Not accepted'
            });
            return;
          }
        } else {
          res.status(200).json({
            type: '',
            message: 'Wrong password'
          });
        }
        //username doesn't exist
      } else {
        res.status(200).json({
          type: '',
          message: 'Wrong username'
        });
      }
    });
  });

  //CHANGEPSW
  app.post("/changePsw", (req, res, next) => {

    const collection = db.collection('users');

    //check if username or email already exists
    collection.findOne({
      username: req.body.username,
    }, (err, item) => {
      if (err) {

        res.status(200).json({
          message: 'Error'
        });
        return;
      }
      //if username found
      if (item != null) {
        //check password
        if (item.password === shajs('sha256').update(req.body.oldpsw).digest('hex')) {
          collection.updateOne({
            username: req.body.username
          },
            { '$set': { 'password': shajs('sha256').update(req.body.newpsw).digest('hex') } }, (err, item) => {

              if (err) {
                //couldn't insert into database
                res.status(200).json({
                  message: 'Error'
                });
                return;
              }
              res.status(200).json({
                message: 'Success'
              });
              return;
            });
        } else {
          res.status(200).json({
            message: 'Wrong password'
          });
        }
        //username doesn't exist
      } else {
        res.status(200).json({
          message: 'Wrong username'
        });
      }
    });

  });

  //FORGOT PSW
  app.post("/forgotPsw", (req, res, next) => {

    const collection = db.collection('users');

    //check if username or email already exists
    collection.findOne({
      username: req.body.username,
    }, (err, item) => {

      if (err) {
        res.status(200).json({
          message: 'Error',
          question: ''
        });
        return;
      }
      //if username found
      if (item != null) {
        //check password
        if (item.jmbg === req.body.jmbg) {
          user = item;
          res.status(200).json({
            message: 'Success',
            question: item.question
          });
        } else {
          res.status(200).json({
            message: 'Wrong jmbg',
            question: ''
          });
        }
        //username doesn't exist
      } else {
        res.status(200).json({
          message: 'Wrong username',
          question: ''
        });
      }
    });

  });

  //CHECK ANSWER
  app.post("/checkAnswer", (req, res, next) => {
    if (user != null && user.username === req.body.username) {
      if (user.answer === req.body.answer) {
        res.status(200).json({
          flag: true
        });
        return;
      }
    }
    res.status(200).json({
      flag: false
    });
  });

  //UPDATE PSW
  app.post("/updatePsw", (req, res, next) => {

    const collection = db.collection('users');
    if (user.username === req.body.username) {
      collection.updateOne({
        username: user.username
      },
        { '$set': { 'password': shajs('sha256').update(req.body.newPsw).digest('hex') } }, (err, item) => {

          if (err) {
            //couldn't insert into database
            res.status(200).json({
              flag: false
            });
            return;
          }
          res.status(200).json({
            flag: true
          });
          return;
        });
    } else {
      // two users tried to change psw, try again

      res.status(200).json({
        flag: false
      });
      return;
    }

  });

  //LAST 20 DAYS' STATS
  app.get("/playerStats20", (req, res, next) => {

    const collection = db.collection('games');
    const date = new Date();
    date.setDate(date.getDate() - 20);
    date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
    collection.aggregate([
      { $match: { date: { $gt: date } } },
      { $group: { _id: "$username", points: { $sum: "$points" } } },
      { $sort: { points: -1 } },
      { $project: { username: "$_id", _id: false, points: 1 } }
    ]).limit(10).toArray(function (err, result) {
      if (err) {
        res.status(200).json({
          players: null,
          flag: false
        });
        return;
      }
      res.status(200).json({
        players: result,
        flag: true
      });

    });
  });



  //THIS MONTH'S STATS
  app.get("/playerStats30", (req, res, next) => {

    const collection = db.collection('games');
    const date = new Date();
    date.setDate(1);
    date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
    collection.aggregate([
      { $match: { date: { $gt: date } } },
      { $group: { _id: "$username", points: { $sum: "$points" } } },
      { $sort: { points: -1 } },
      { $project: { username: "$_id", _id: false, points: 1 } }
    ]).limit(10).toArray(function (err, result) {
      if (err) {
        res.status(200).json({
          players: null,
          flag: false
        });
        return;
      }
      res.status(200).json({
        players: result,
        flag: true
      });

    });
  });



  //ANAGRAM UPDATE
  app.post("/anagramUpdate", (req, res, next) => {

    const collection = db.collection('anagrams');

    //get current anagram count
    collection.countDocuments().then(index => {

      //insert new anagram
      collection.insertOne({
        index: index + 1,
        riddle: req.body.riddle,
        answer: req.body.answer
      }, (err, result) => {
        if (err) {
          //couldn't insert into database
          res.status(200).json({
            flag: false
          });

        } else {
          //inserted into database
          res.status(200).json({
            flag: true
          });
        }

      });
    });
  });

  //ANAGRAM GET
  app.get("/anagramGet", (req, res, next) => {

    const collection = db.collection('anagrams');
    const date = new Date();
    date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
    db.collection('gamesCalendar').aggregate([
      {
        $project:
        {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
          game: 1,
          anagramIndex: { $ifNull: ["$anagramIndex", 0] }
        }
      },
      {
        $match: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          game: 'anagram'
        }
      }
    ]).toArray(function (err, result) {
      if (result.length != 0) {
        // game otd is anagram
        //find anagram
        collection.findOne({
          index: result[0].anagramIndex,
        }, (err, item) => {

          if (err) {
            res.status(200).json({
              riddle: '',
              flag: false
            });
            return;
          }
          //if anagram found
          if (item != null) {
            res.status(200).json({
              riddle: item.riddle,
              flag: true
            });
            //anagram not found
          } else {
            res.status(200).json({
              riddle: '',
              flag: false
            });
          }
        });

        // if game otd isn't anagram
      } else {
        //find anagram randomly
        collection.countDocuments().then((count) => {
          collection.findOne({
            index: Math.floor(Math.random() * count + 1),
          }, (err, item) => {

            if (err) {
              res.status(200).json({
                riddle: '',
                flag: false
              });
              return;
            }
            //if anagram found
            if (item != null) {
              res.status(200).json({
                riddle: item.riddle,
                flag: true
              });
              //anagram not found
            } else {
              res.status(200).json({
                riddle: '',
                flag: false
              });
            }
          });
        });
      }
    });

  });

  //ANAGRAM SUBMIT
  app.post("/anagramSubmit", (req, res, next) => {

    let collection = db.collection('anagrams');

    collection.findOne({
      riddle: req.body.riddle
    }, (err, anagram) => {
      if (err) {
        res.status(200).json(-5);
        return;
      }

      //if anagram found
      if (anagram != null) {
        db.collection('users').findOne({
          username: req.body.username,
        }, (err, user) => {

          if (err) {
            res.status(200).json(-4);
            return;
          }
          //if username found
          if (user != null) {
            const date = new Date();
            date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
            let points;
            if (anagram.answer.toLowerCase() === req.body.answer.toLowerCase()) {
              points = 10;
            } else {
              points = 0;
            }
            db.collection('games').insertOne({
              username: req.body.username,
              game: 'anagram',
              points: points,
              date: date
            }, (err, result) => {
              if (err) {
                //couldn't insert into database
                res.status(200).json(-3);
              } else {
                //inserted into database
                res.status(200).json(points);
              }
            }); // end insert game
            //username doesn't exist
          } else {
            res.status(200).json(-2); // username not found
          }
        }); // end findOne user

        //anagram not found
      } else {
        res.status(200).json(-1); //anagram riddle not found
      }
    }); //end findOne anagram


  });// end post

  // CHECK IF GAME OF THE DAY PLAYED
  app.post("/gamePlayed", (req, res, next) => {

    const collection = db.collection('games');

    //find game of the day for user
    const date = new Date();
    date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
    collection.aggregate([
      {
        $project:
        {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
          username: 1
        }
      },
      {
        $match: {
          username: req.body.username,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    ]).toArray(function (err, result) {
      if (err) {

        res.status(200).json({
          flag: false,
          played: false,
          game: ''
        });
        return;
      }
      //if game already played
      if (result.length !== 0) {
        res.status(200).json({
          flag: true,
          played: true,
          game: ''
        });

        return;
        //game not played yet
      } else {
        //check what is game otd
        db.collection('gamesCalendar').aggregate([
          {
            $project:
            {
              year: { $year: "$date" },
              month: { $month: "$date" },
              day: { $dayOfMonth: "$date" },
              game: 1
            }
          },
          {
            $match: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate()
            }
          }
        ]).toArray(function (err, items) {

          if (err) {
            res.status(200).json({
              flag: false,
              played: false,
              game: ''
            });
            return;
          }
          //if game otd exists
          if (items != null) {
            res.status(200).json({
              flag: true,
              played: false,
              game: items[0].game
            });
            return;

            //game otd doesn't exist
          } else {
            res.status(200).json({
              flag: false,
              played: false,
              game: ''
            });
            return;
          }
        });
      }
    });

  });

  //GET USER REQUESTS
  app.get("/userRequests", (req, res, next) => {

    const collection = db.collection('users');
    collection.aggregate(
      { $match: { accepted: false, type: 'player' } },
      {
        $project: {
          username: 1, name: 1, lastname: 1, email: 1, profession: 1,
          gender: 1, jmbg: 1, question: 1, answer: 1
        }
      }
    ).toArray(function (err, result) {
      if (err) {
        res.status(200).json({
          users: null,
          flag: false
        });
        return;
      }
      res.status(200).json({
        users: result,
        flag: true
      });

    });


  });


  //ACCEPT USER REQUESTS
  app.post("/acceptUser", (req, res, next) => {

    const collection = db.collection('users');

    if (req.body.accept) { // update user.accepted to true
      collection.updateOne({
        username: req.body.user.username
      },
        { '$set': { 'accepted': true } }, (err, item) => {

          if (err) {
            //couldn't update database
            res.status(200).json({
              flag: false
            });
            return;
          }
          res.status(200).json({
            flag: true
          });
          return;
        });
    } else { // delete user from database
      collection.deleteOne({
        username: req.body.user.username
      }, (err, result) => {

        if (err) {
          //couldn't delete from database
          res.status(200).json({
            flag: false
          });
          return;
        }
        res.status(200).json({
          flag: true
        });
        return;
      });
    }



  }); // end post

  //ALL ANAGRAMS GET
  app.get("/allAnagramsGet", (req, res, next) => {

    const collection = db.collection('anagrams');
    collection.find().toArray(function (err, result) {
      if (err) {
        res.status(200).json({
          anagrams: null,
          flag: false
        });
        return;
      }
      res.status(200).json({
        anagrams: result,
        flag: true
      });

    });

  });

  //GAME OTD SUBMIT
  app.post("/gameOTDSubmit", (req, res, next) => {

    const date = new Date(req.body.date);
    date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
    let collection = db.collection('gamesCalendar');
    collection.aggregate([
      {
        $project:
        {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
        }
      },
      {
        $match: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    ]).toArray(function (err, result) {
      if (err) {
        res.status(200).json(false);
        console.log(err);
        return;
      }
      //damned utc and cest
      const dateUpdate = date;
      dateUpdate.setTime(dateUpdate.getTime() + (2 * 60 * 60 * 1000));
      //if date doesn't exist
      if (result.length == 0) {
        collection.insertOne({
          date: dateUpdate,////////////////
          game: req.body.game.toLowerCase(),
          anagramIndex: req.body.anagramIndex
        }, (err, result) => {
          if (err) {
            res.status(200).json(false);
            return;
          } else {
            res.status(200).json(true);
            return;
          }
        }); // end insertOne

        //game already exists
      } else {
        const currDate = new Date();
        const dateMin = new Date(dateUpdate);
        const dateMax = new Date(dateUpdate);
        dateMin.setHours(0);
        dateMin.setMinutes(0);
        dateMin.setTime(dateMin.getTime() + (2 * 60 * 60 * 1000));
        dateMax.setHours(23);
        dateMax.setMinutes(59);
        dateMax.setTime(dateMax.getTime() + (2 * 60 * 60 * 1000));
        // change game for today
        if (dateUpdate.getFullYear() == currDate.getFullYear() &&
          dateUpdate.getMonth() == currDate.getMonth() &&
          dateUpdate.getDate() == currDate.getDate()) {
          db.collection('games').findOne({
            date: { $gte: dateMin, $lt: dateMax } ////////
          }, (err, item) => {
            if (err) {
              res.status(200).json(false);
              return;
            }
            //if game already played
            if (item != null) {
              res.status(200).json(false);
              return;

              //game wasn't played yet
            } else {
              collection.updateOne({
                date: { $gte: dateMin, $lt: dateMax }///////
              },
                { '$set': { 'game': req.body.game.toLowerCase(), 'anagramIndex': req.body.anagramIndex } },
                (err, item) => {

                  if (err) {
                    //couldn't insert into database
                    res.status(200).json(false);
                    console.log(err);
                    return;
                  } else {
                    res.status(200).json(true);
                    return;
                  }
                }); //changed game for given date
            }
          });
          // change game otd in the future
        } else {
          collection.updateOne({
            date: { $gte: dateMin, $lt: dateMax }///////
          },
            { '$set': { 'game': req.body.game.toLowerCase(), 'anagramIndex': req.body.anagramIndex } },
            (err, item) => {

              if (err) {
                //couldn't insert into database
                res.status(200).json(false);
                console.log(err);
                return;
              } else {
                res.status(200).json(true);
                return;
              }
            }); //changed game for given date
        }
      }
    }); //end findOne game with date



  });// end post

  //MY NUMBER SUBMIT
  app.post("/myNumberSubmit", (req, res, next) => {

    let collection = db.collection('games');


    db.collection('users').findOne({
      username: req.body.username,
    }, (err, user) => {

      if (err) {
        res.status(200).json(false);
        return;
      }
      //if username found
      if (user != null) {
        const date = new Date();
        date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
        collection.insertOne({
          username: req.body.username,
          game: 'moj broj',
          points: req.body.points,
          date: date
        }, (err, result) => {
          if (err) {
            //couldn't insert into database
            res.status(200).json(false);
          } else {
            //inserted into database
            res.status(200).json(true);
          }
        }); // end insert game

        //username doesn't exist
      } else {
        res.status(200).json(false); // username not found
      }
    }); // end findOne user


  });// end post

  //TODAY'S STATS
  app.post("/playerStatsToday", (req, res, next) => {

    const collection = db.collection('games');
    const dateMin = new Date();
    const dateMax = new Date();
    dateMin.setHours(0);
    dateMin.setMinutes(0);
    dateMin.setTime(dateMin.getTime() + (2 * 60 * 60 * 1000));
    dateMax.setDate(dateMax.getDate() + 1);
    dateMax.setHours(0);
    dateMax.setMinutes(0);
    dateMax.setTime(dateMax.getTime() + (2 * 60 * 60 * 1000));
    collection.aggregate([
      { $match: { date: { $gte: dateMin, $lt: dateMax } } },
      { $sort: { points: -1 } },
      { $project: { username: 1, _id: false, points: 1 } }
    ]).limit(10).toArray(function (err, result) {
      if (err) {
        res.status(200).json({
          players: null,
          flag: false
        });
        return;
      }
      let userIsInStats = false;
      for (let i = 0; i < result.length; i++) {
        if (result[i].username === req.body.username) {
          userIsInStats = true;
          break;
        }
      }

      //add user to stats
      if (!userIsInStats) {
        //find game of the day for user
        collection.aggregate([
          { $match: { date: { $gte: dateMin, $lt: dateMax }, username: req.body.username } },
          { $project: { username: 1, _id: false, points: 1 } }
        ]).toArray(function (err, resultForUsername) {
          if (err) {
            res.status(200).json({
              players: null,
              flag: false
            });
            return;
          }
          //if user played the game today
          if (resultForUsername.length !== 0) {
            result.push(resultForUsername[0]);
            res.status(200).json({
              players: result,
              flag: true
            });

            return;

            //user didnt play game otd yet
          } else {
            res.status(200).json({
              players: result,
              flag: true
            });

            return;
          }
        });

      // user already in stats
      } else {
        res.status(200).json({
          players: result,
          flag: true
        });

        return;
      }

    });


  });

  //ZG GAME SUBMIT
  app.post("/myZGSubmit", (req, res, next) => {

    const collection = db.collection('games');
    const date = new Date();
    date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
    if (req.body.zgPair.name !== '') {
      db.collection('zgDatabase').findOne({
        name: req.body.zgPair.name,
        field: req.body.zgPair.field
      }, (err, item) => {
        if (err) {
          console.log(err);
          res.status(200).json({
            valid: false,
            points: 0,
            evalNeeded: false
          });
        } else {
          //if name and field found
          const dateMin = new Date();
          const dateMax = new Date();
          dateMin.setHours(0);
          dateMin.setMinutes(0);
          dateMax.setDate(dateMax.getDate() + 1);
          dateMax.setHours(0);
          dateMax.setMinutes(0);
          dateMin.setTime(dateMin.getTime() + (2 * 60 * 60 * 1000));
          dateMax.setTime(dateMax.getTime() + (2 * 60 * 60 * 1000));
          if (item != null) {
            //insert new game
            dateMax.setTime(dateMax.getTime() + (2 * 60 * 60 * 1000));
            collection.updateOne({
              date: { $gte: dateMin, $lt: dateMax },
              username: req.body.username
            }, {
              $set: {
                username: req.body.username,
                game: 'zanimljiva geografija',
                date: date
              }, $inc: { points: 2 }
            }, {
              upsert: true,
            }, (err, result) => {
              if (err) {
                //couldn't insert into database
                console.log(err);
                res.status(200).json({
                  valid: false,
                  points: 0,
                  evalNeeded: false
                });
              } else {
                //inserted into database
                res.status(200).json({
                  valid: true,
                  points: 2,
                  evalNeeded: false
                });
              }
            }); // end insert game

            // name not found
          } else {
            //insert new game
            dateMax.setTime(dateMax.getTime() + (2 * 60 * 60 * 1000));
            collection.updateOne({
              date: { $gte: dateMin, $lt: dateMax },
              username: req.body.username
            }, {
              $set: {
                username: req.body.username,
                game: 'zanimljiva geografija',
                date: date
              }
            }, {
              upsert: true,
            }, (err, result) => {
              if (err) {
                //couldn't insert into database
                console.log(err);
                res.status(200).json({
                  valid: false,
                  points: 0,
                  evalNeeded: false
                });
              } else {
                //inserted into database
                //send to supervisor - name, field, username, date
                db.collection('zgEval').insertOne({
                  date: date,
                  username: req.body.username,
                  field: req.body.zgPair.field,
                  name: req.body.zgPair.name
                }, (err, result) => {
                  if (err) {
                    res.status(200).json({
                      valid: truefalse,
                      points: 0,
                      evalNeeded: false
                    });
                  } else {
                    res.status(200).json({
                      valid: true,
                      points: 0,
                      evalNeeded: true
                    });
                  }

                });
              }
            }); // end insert game
          } // end if else for field found or not
        } // end findOne field error or not
      }); // end findOne field

      //if name is empty
    } else {
      //insert new game
      const dateMin = new Date();
      const dateMax = new Date();
      dateMin.setHours(0);
      dateMin.setMinutes(0);
      dateMin.setTime(dateMin.getTime() + (2 * 60 * 60 * 1000));
      dateMax.setDate(dateMax.getDate() + 1);
      dateMax.setHours(0);
      dateMax.setMinutes(0);
      dateMax.setTime(dateMax.getTime() + (2 * 60 * 60 * 1000));
      collection.updateOne({
        date: { $gte: dateMin, $lt: dateMax },
        username: req.body.username
      }, {
        $set: {
          username: req.body.username,
          game: 'zanimljiva geografija',
          date: date
        }
      }, {
        upsert: true,
      }, (err, result) => {
        if (err) {
          //couldn't insert into database
          console.log(err);
          res.status(200).json({
            valid: false,
            points: 0,
            evalNeeded: false
          });
        } else {
          //inserted into database
          res.status(200).json({
            valid: true,
            points: 0,
            evalNeeded: false
          });
        }
      });
    }

  });

  //GET EVAL REQUESTS
  app.get("/zgEvals", (req, res, next) => {

    const collection = db.collection('zgEval');
    collection.find().toArray(function (err, result) {
      if (err) {
        res.status(200).json({
          evals: null,
          flag: false
        });
        return;
      }
      res.status(200).json({
        evals: result,
        flag: true
      });

    });


  });


  //ACCEPT EVAL REQUESTS
  app.post("/acceptEval", (req, res, next) => {


    // remove eval pair from zgEval collection
    db.collection('zgEval').deleteOne({
      field: req.body.evalPair.field,
      name: req.body.evalPair.name
    }, (err, result) => {
      if (err) {
        //couldn't delete from database
        res.status(200).json({
          flag: false
        });
        return;
      } else {
        //deleted from zgEval

        if (req.body.accept) {
          // add points to user
          const dateMin = new Date(req.body.evalPair.date);
          const dateMax = new Date(req.body.evalPair.date);
          dateMin.setHours(0);
          dateMin.setMinutes(0);
          dateMax.setDate(dateMax.getDate() + 1);
          dateMax.setHours(0);
          dateMax.setMinutes(0);
          db.collection('games').updateOne({
            date: { $gte: dateMin, $lt: dateMax },
            username: req.body.evalPair.username,
            game: 'zanimljiva geografija'
          }, {
            $inc: { points: 4 }
          }, (err, item) => {
            if (err) {
              //couldn't update database
              res.status(200).json({
                flag: false
              });
              return;
            } else {
              //user's points updated
              db.collection('zgDatabase').insertOne({
                name: req.body.evalPair.name,
                field: req.body.evalPair.field
              }, (err, result) => {
                if (err) {
                  //couldn't insert into zg database
                  res.status(200).json({
                    flag: false
                  });
                } else {
                  //inserted into zg database
                  res.status(200).json({
                    flag: true
                  });
                }

              });
            }
          });
          // rejected request
        } else {

          res.status(200).json({
            flag: true
          });
          return;
        }
      }

    });

  }); // end post

  //GET LETTERS FOR 5x5
  app.get("/5x5GameLetters", (req, res, next) => {

    const collection = db.collection('lettersFor5x5');
    collection.countDocuments({}, function (error, numOfDocs) {
      if (error) {
        res.status(200).json({
          letters: null,
          flag: false
        });
        return;
      } else {
        collection.findOne({
          index: (Math.floor(Math.random() * Math.floor(numOfDocs)) + 1)
        }, function (err, result) {

          if (err) {
            res.status(200).json({
              letters: null,
              flag: false
            });
            return;
          } else {
            res.status(200).json({
              letters: result.letters,
              flag: true
            });
          }
        });
      }
    });

  });

  //MY 5x5 SUBMIT
  app.post("/5x5GameUpdatePoints", (req, res, next) => {

    let collection = db.collection('games');


    db.collection('users').findOne({
      username: req.body.username,
    }, (err, user) => {

      if (err) {
        res.status(200).json(false);
        return;
      } else {
        //if username found
        if (user != null) {
          const date = new Date();
          date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
          collection.insertOne({
            username: req.body.username,
            game: '5x5',
            points: req.body.points,
            date: date
          }, (err, result) => {
            if (err) {
              //couldn't insert into database
              res.status(200).json(false);
            } else {
              //inserted into database
              res.status(200).json(true);
            }
          }); // end insert game

          //username doesn't exist
        } else {
          res.status(200).json(false); // username not found
        }
      }
    }); // end findOne user
  });// end post

  //5x5 LETTERS UPDATE
  app.post("/lettersUpdate", (req, res, next) => {

    const collection = db.collection('lettersFor5x5');

    //get current count
    collection.countDocuments().then(index => {

      //insert new letters array
      collection.insertOne({
        index: index + 1,
        letters: req.body
      }, (err, result) => {
        if (err) {
          //couldn't insert into database
          res.status(200).json({
            flag: false
          });

        } else {
          //inserted into database
          res.status(200).json({
            flag: true
          });
        }

      });
    });

  });

});
module.exports = app;

