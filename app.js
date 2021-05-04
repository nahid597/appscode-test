const express = require('express');
const app = express();
const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//connect with mongodb
mongoose.connect('mongodb://localhost/apps-code',
{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
     useCreateIndex: true 
})
.then(res => console.log('connecting with mongodb..'))
.catch(err => console.log(err));


async function setCourse() {
    let course = new Course();

    course.name = "nahid";
    course.isPublished = true;
    course.price = 20.5;

    try{
        const result = await course.save();
         console.log(result);
    } catch (ex){
        console.log(ex.message);
    }
}

async function getCourse() {
  const result = await Course.find({price: {$gte: 20}});
  console.log(result);
}

//getCourse();


//configuration
console.log(`App name ${config.get('name')}`);
console.log(`mail server name ${config.get('mail.host')}`);

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb',extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));
app.use('/uploads', express.static('uploads'));

app.use('/api/courses', courses);
app.use('/',home);




const port = process.env.PORT || 8080;

app.listen(port, () => console.log('server listening on port' + port));