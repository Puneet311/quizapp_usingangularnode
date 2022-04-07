const express = require("express");
var cors = require('cors');
const path=require("path");
const app = express();
const fs = require('fs');
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public/dist/quizapp')));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/dist/quizapp/index.html"));
  
})
app.get('/get-ques',(req,res)=>{
    fs.readFile('question.json', (err, data) => {
        if (err) res.status(500).send("not data found");
        let student = JSON.parse(data);
        res.status(200).json(student)
    });
})

app.post('/submit-ans',(req,res)=>{
    let resAns = req.body.answerArray
    let questionAttempted = resAns.length
    let correctAnswer = 0
    let wrongAnswer = 0
    let totalScore = 0
    fs.readFile('answer.json',(err,data)=>{
        if(err) console.error("Data not available");
        let answer = JSON.parse(data).answerList
        resAns.forEach((value,index)=>{
            if(value === -1){
                questionAttempted=questionAttempted-1
                answer[index].isCorrect = false
            }else if(value !==-1 && value === answer[index].correctOption){
                correctAnswer+=1
                answer[index].isCorrect = true
            }
            else if (value !== -1 && value !== answer[index].correctOption){
                wrongAnswer+=1
                answer[index].isCorrect = false
            }
            
          })
          totalScore = correctAnswer *2
        let resObj = {
            answerList : answer,
            scoreMaterix:{
                questionAttempted,
                correctAnswer,
                wrongAnswer,
                totalScore
            }
        }
        res.status(200).json(resObj)  
    })
})


app.listen(3000, () => console.log(`server is runing at port 3000`));