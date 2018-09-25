const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const path = require('path')
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/dist/public'));

//set up mongoose MODEL
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/meeting')
var QuestionSchema = new mongoose.Schema({
    question: {type:String, required: [true, "cannot submit empty question"], minlength:[4, "must be at least 4 characters"]},
    type: {type:String, required:[true, "must include the type of question"]}, // HEAD OR HEART
    quality: {type:String, required:[true, "must include decision quality"]},  //Framing, Alternatives, Information, Values, Integrations, Commitment to Action
})



const Question = mongoose.model('question', QuestionSchema);

// ROUTING FOR CRUD
app.get("/questions", (req, res) => {
    console.log("Enter /questions for retrive all questions");
    Question.find({})
    .then(
        data => res.json({message: true, decisions: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

app.post("/question", (req, res) =>{
    console.log("Enter POST /question to CRAETE a question. req.body: ", req.body);
    Question.create(req.body)
    .then(
        data => res.json({message: true, decision: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});



app.get("/question/:id", (req, res) => {
    console.log("Enter /question/:id for retrive question by id");
    Question.findOne({_id: req.params.id})
    .then(
        data => res.json({message: true, question: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

// Pick and retrive a question randomly
app.get("/random", (req, res) => {
    console.log("Enter /random for pick a question randomly from ALL the questions");
    Question.find({})
    .then(
        data => {
            console.log("sucess, data.length: ", data.length)
            let picker = Math.floor(Math.random()*data.length);
            console.log("success data retrive, generated picker: ", picker, "/n data[picker]: ", data[picker])
            res.json({message: true, question: data[picker]})
        }
    )
    .catch(
        error => res.json({message: false, err: error})
    )
})

// random question from selected "Qulity" and "Type" of question.
app.post("/question_random", (req, res) =>{
    console.log("Entered /question_random ")
    var pick = Math.trunc(Math.random()*6);
    Question.find({quality: req.body.quality, type: req.body.type})
    .then(
        data => {
            console.log("success, ", data.length)
            let picker = Math.floor(Math.random()*data.length);
            console.log("success data retrive, generated picker: ", picker, "/n data[picker]: ", data[picker])
            res.json({message: true, question:data[picker]})
        }
    )
    .catch(
        error => res.json({message: false, err:error})
    )
    // if(pick == 0){
    //     pick_quality = "framing"
    // }
    // var pick_type = random();
})

//get question given quality & type **** SHOULDN'T THIS BE A POST?
app.get("/specific_question", (req, res) => {
    console.log("Enter / questions/parameters for retrieve question by params");
    Question.find({ quality: req.body.quality, type: req.body.type})
    .then (
        data => res.json({message: true, questions: data})
    )
    .catch(
        error => res.json({message:false, err: error})
    )
});

app.put("/question/:id", (req, res) => {
    console.log("Enter PUT /questionfor UPDATE question. req.body: ", req.body);
    Question.updateOne({_id: req.params.id}, req.body)
    .then(
        data => res.json({message:true, question:data})
    )
    .catch (
        error => res.json({message:false, err: error})
    )
});


app.delete("/question/:id", (req, res) => {
    console.log("Enter DELETE /question/:id for delete question by id");
    Question.remove({_id: req.params.id})
    .then(
        data => res.json({message: true, question: data})       //It there's no message, it will still shows up as data == null;
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

// app.delete("/questionReview/:mvid&:_id", (req, res) => {
//     console.log("delete(questionReview), req.params: ", req.params)
//     question.update({_id:req.params.mvid}, {$pull: {reviewing:{_id:req.params._id}}})
//     .then(
//         data => {
//             console.log('finding movie to delete true')
            // Review.remove({_id: req.params._id})
            // .then(
            //     data => {
            //         console.log("betreview remove true")
            //         res.json({message: true, question: data})
            //     }
            // )
            // res.json({message: true, question: data})
            
            // .catch(
            //     error => {
            //         console.log("betreview remove error")
            //         res.json({message: false, err: error})
            //     }
            // )
    //     }
    // )
    // .catch(
    //     error => {
    //         console.log('finding movie to delete review: promise:error')
    //         res.json({message: false, err: error})
    //     }
    // )
        // console.log("Enter DELETE /question/:id for delete question by id");
    // Review.remove({_id: req.params.mvid})
    // .then(
    //     data => res.json({message: true, question: data})
    // )
    // .catch(
    //     error => res.json({message: false, err: error})
    // )
// });


app.get('*', (req, res) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'))
})
app.listen(8000)