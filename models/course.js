const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
    name: {type: String,required: true},
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {type: Number, 
        required: function () {
            return this.isPublished
        }},
});

const Course = mongoose.model('Course', courseSchema);

function courseValidation(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        isPublished: Joi.bool().required(),
        price: Joi.number().required()
    });

   const result = schema.validate(course);
   return result;
}

module.exports = {
    Course,
    courseValidation
}
