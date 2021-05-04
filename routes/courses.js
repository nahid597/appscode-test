const express = require('express');
const {Course, courseValidation} = require('../models/course');
const router = express.Router();

router.get('/',async(req,res) => {
    const courses = await Course.find();
    res.send(courses);
});

router.get('/:id',async(req,res) => {

    try{
        const course = await Course.findById(req.params.id);
        res.status(200).send(course);
    } catch(ex) {
        res.send(ex.message);
    }
   
});

router.post('/', async(req,res) => {

    const result  = courseValidation(req.body);

    if(result.error) {
        res.status(200).send(result.error.details[0].message);
        return;
    }

    let course = new Course({
        name: req.body.name,
        isPublished: req.body.isPublished,
        price: req.body.price
    });

    course = await course.save();

    res.send(course);
});

router.put('/:id',async(req,res) => {
    let course
    try{
        course = await Course.findById(req.params.id);
    } catch (ex) {
        res.status(404).send(ex.message);
    }

    const result = courseValidation(req.body);

    if(result.error) {
        res.status(200).send(result.error.details[0].message);
        return;
    }
 
    course.name = req.body.name;
    course.price = req.body.price;
    course.isPublished = req.body.isPublished;

     course = await course.save();
    res.send(course);
 });

 router.delete('/:id', (req,res) => {
     let course;

     try{
        course = Course.findById(req.params.id);
        console.log(course);
     }catch(ex) {
        res.send(ex.message);
     }
    
     Course.deleteOne({_id:req.params.id})
    .then(result => {
        res.status(200).send({
            message: "delete successfully",
            data: result
        })
    }).catch(err => res.status(404).send("given id is not valid"));
 });

 module.exports = router;