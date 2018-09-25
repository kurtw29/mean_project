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
    type: {type:String, required:[true, "must include the type of question"]} // HEAD OR HEART
})


var DecisionSchema = new mongoose.Schema({
    quality: {type:String, required:[true, "must include decision quality"]},  //Framing, Alternatives, Information, Values, Integrations, Commitment to Action
    questions: [QuestionSchema]
})

const Question = mongoose.model('question', QuestionSchema);
const Decision = mongoose.model('decision', DecisionSchema);

// ROUTING FOR CRUD
app.get("/decisions", (req, res) => {
    console.log("Enter /decisions for retrive all decisions");
    Decision.find({})
    .then(
        data => res.json({message: true, decisions: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

app.post("/decision", (req, res) =>{
    console.log("Enter POST /decision/ to CRAETE decision. req.body: ", req.body);
    Decision.create(req.body)
    .then(
        data => res.json({message: true, decision: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});

app.post("/question/:id", (req, res) =>{
    console.log("Enter POST /question/ to CRAETE question. req.body: ", req.body);
    Question.create(req.body, function(err, data){
        if(err){
            console.log("error creating question for decision ", err)
            res.json({message:false, err:err})
        }
        else {
            console.log("pushing ", data, " into Movie collection")
            Decision.update({_id:req.params.id}, {$push: {questions: data}}, function(err, data) {
                if(err){
                    console.log("Error in pushing data into Decision ",err )
                    res.json({message:false, err:err})
                }
                else {
                    console.log("We successfully pushed question in decision")
                    res.json({message:true, data: data})
                }
            })
        }
    })
})

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

app.get("/decision/:id", (req, res) => {
    console.log("Enter /decision/:id for retrive decision by id");
    Decision.findOne({_id: req.params.id})
    .then(
        data => res.json({message: true, decision: data})
    )
    .catch(
        error => res.json({message: false, err: error})
    )
});


//post for reviewing a movie with <:id>
app.post("/question/:id", (req, res) => {
    console.log("Update movie with id:",req.params.id)
    console.log("Update movie with req.body:",req.body)
    Review.create(req.body, function(err, data){
        if(err){
            console.log("Erro creating review for adding ",err)
            res.json({message:false, err})
        }else{
            console.log("pushing",data,"into Movie collection")
             Question.update({_id:req.params.id}, {$push: {reviewing:data}}, function(err){
                if(err){
                    console.log("Error in pushing data into Movie ",err)
                    res.json({message:false, err})
                }
                res.json({message:true})
            })
        }
    })
   
})

app.put("/question/:d_id", (req, res) => {
    console.log("Enter PUT /questionfor UPDATE question. req.body: ", req.body);
    Decision.findOne({_id:req.params.d_id}, function(err, data){
        console.log("Finding one decision quality before editing question, data: ", data);
        if(err){
            res.json({message:false, err:err});
        }else{
            console.log("successfully gotten the 'Decision' for qustion update");
            Question.update({_id: req.body._id}, req.body, {runValidators: true, context: 'query'})
            .then(
                data => res.json({message: true, question: data})
            )
            .catch(
                error => res.json({message: false, err: error})
            )
        }
    });
});

// app.delete("/question/:id", (req, res) => {
//     console.log("Enter DELETE /question/:id for delete question by id");
//     question.remove({_id: req.params.id})
//     .then(
//         data => res.json({message: true, question: data})
//     )
//     .catch(
//         error => res.json({message: false, err: error})
//     )
// });

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