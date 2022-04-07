import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questionArray: any;
  correctAnswerArray:any
  answerArray: any[] = [];
  showResult: boolean = false;
  questionAttempted!:number
  wrongAnswers!:number
  correctAnswers!:number
  totalScore!:number
  @ViewChild('score') score!:ElementRef
  @ViewChild('quiz') quiz!:ElementRef
  constructor(private quizService:QuizService) {
    this.correctAnswers=0
    this.wrongAnswers=0
    this.totalScore=0
  }

  ngOnInit(): void {
    this.getQuestion()
    for (let i = 0; i < this.questionArray.length; i++) {
      this.answerArray[i] = -1;
    }
  }

  getQuestion(){
    this.quizService.getQuestion().subscribe((data:any)=>{
      this.questionArray=data.questionList
    })

  }

  selectAnswer(i: any, j: any) {
    this.answerArray[i] = j;
  }

  submitAnswer() {
    let answerArrayObj = {
      answerArray:this.answerArray
    }
    this.quizService.submitFinalAnswer(answerArrayObj).subscribe((value:any)=>{
      this.correctAnswerArray = value.answerList
      this.questionAttempted=value.scoreMaterix.questionAttempted
      this.correctAnswers=value.scoreMaterix.correctAnswer
      this.wrongAnswers=value.scoreMaterix.wrongAnswer
      this.totalScore=value.scoreMaterix.totalScore
      this.showResult = true;
      setTimeout(()=>{this.score.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });},100) 
    },(error:any)=>{
      console.error("Unable to calculate the result.",error)
    })
  }
  retake(){
    this.getQuestion()
    this.correctAnswers=0
    this.wrongAnswers=0
    this.totalScore=0
    this.showResult = false;
    setTimeout(()=>{this.quiz.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });},100) 
  }
}
