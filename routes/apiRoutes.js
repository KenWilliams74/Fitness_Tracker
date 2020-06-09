const router = require("express").Router();
const db = require("../models");
const mongojs = require("mongojs");


router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });


  router.get("/api/workouts/range", (req, res) => {
    let date = new Date();

    db.Workout.find({day : {$gte: new Date().setDate(new Date().getDate()-7)}})
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });


  router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.put("/api/workouts/:id", (req, res) => {
    db.Workout.update(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $push: { 
          exercises: req.body
        } 
      },
  
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });


module.exports = router;