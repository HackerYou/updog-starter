//starter file
// > this is your import 
// > the syntax is commonJS
// > require finds a package from the node_modules folder
// const express = require('express');
// > make an application with express
// const app = express();
// > when u start an application, u start a process
// const port = process.env.PORT || 8080;

// > __dirname references where the process has been started
// > this is middleware
// app.use(express.static('public'));
// > create our first endpoint 
// app.get('/api', (req, res) => {
//   res.send({
//     message: 'success'
//   });
// });

// app.listen(port);

/// second iteration of this file:
const express = require('express');
const app = express();
// to 
const mongoose = require('mongoose');
//route to watch
const router = express.Router();
//port to watch
const port = process.env.PORT || 8080;
//create a schema
const Pet= require('./models/pet.js');
// to parse POST requests
const bodyParser = require('body-parser');

// mongoose.connect('mongodb://localhost/updog');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/updog'

mongoose.connect(dbURL);

app.use(express.static('public'));

app.use(bodyParser.json());

router.route('/')
    .get((req,res) =>  {
        res.json({
            message:'ypo sup'
        });
    });

router.route('/pets')
    .get((req,res) => {
        Pet.find({}, (err, docs) =>{
            if (err) {
                res
                //add a status code
                    .status(400) // here, the fetcher will ask for a format, and you'll just give that
                    .send({
                        message:'Something is upppp, dog.'
                    })
                    // has the headers / content type
                    // tells the API to send back json
                    .json({
                        message: 'Something is upppp, dog.'
                    });
                return;
            }
            res
                .status(200)
                .send(docs);
        });
    })
    .post((req, res) =>{
        const body = req.body;
        const pet = new Pet();
        pet.name = body.name;
        pet.description = body.description;
        pet.photo = body.photo;
        pet.score = 0;
        pet.save((err, doc) =>{
            if (err){
                res
                    .status(400)
                    .send({
                        message:'Cannot add pet'
                    });
                return ;
            }
            res
                .status(200)
                .send(doc);
        });
    });
router.route('/pets/:pet_id')
    .get( (req, res) =>{
        const petId = req.params.pet_id;
        Pet.findById(petId, (err, doc)=> {
            if(err){
                res
                    .status(400)
                    .json({
                        message:'errrror'
                    });
                return;
            }
            res
                .status(200)
                .json(doc);
        });
    })
    .put((req, res) => {
        const petId = req.params.pet_id;
        Pet.findById(petId, (err, doc)=>{
            if (err){
                res
                    .status(400)
                    .json({
                        message:'sorry bruh'
                    });
                return;
            }
            Object.assign(doc, req.body, {score: doc.score+1});
            doc.save((err, savedDoc)=>{
                if(err){
                    res
                        .status(400)
                        .json({
                            message:'probz my guy'
                        });
                    return;
                }
                res
                    .status(203)
                    .json(savedDoc);
            });

        });
    })
    .delete((req, res) => {
        const petId = req.params.pet_id;
        Pet.findByIdAndRemove(petId, (err, doc) =>{
            if (err) {
                res
                    .status(400)
                    .json({
                        message: 'sorry bruh'
                    });
                return;
            }

            res.status(200).json(doc);
        });
    });



app.use('/api', router);

app.listen(port);