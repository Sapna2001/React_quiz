import React, {Component} from 'react';
import {QuizData} from './QuizData'
import './styles.css'

export class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userAnswer: null,
      currentIndex: 0,
      options: [],
      quizend: false,
      score: 0,
      disabled: true //user cannot click on the next button until he selects an option
    }
  }

  loadQuiz = () => {
    const {
      currentIndex
    } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer
      }
    })
  }

  nextQuestion = () => {
    const {
      userAnswer,
      answer,
      score
    } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null
    })
  }

  componentDidMount() {
    this.loadQuiz();
  }

  checkAnswer = answer => {
    this.setState({
      userAnswer:answer,
      disabled:false
    })
  }

finishHandler = ()=>{
  if(this.state.currentIndex === QuizData.length -1){
    this.setState({
      quizend:true
    })
  }
}

 componentDidUpdate(prevProps,prevState){
   const{currentIndex}=this.state;
   if(this.state.currentIndex !== prevState.currentIndex){
     this.setState(() => {
       return {
         disabled: true,
         question: QuizData[currentIndex].question,
         options: QuizData[currentIndex].options,
         answer: QuizData[currentIndex].answer
       }
     })
   }
 }

  render() {
    const{question,options,currentIndex,userAnswer,quizend} =this.state;
    if(quizend){
      return(
        <div>
        <h1>Game over</h1>
        <h2>Score : {this.state.score}</h2>
        <p>Correct Answers</p>
        <ul>
        {QuizData.map((item,index) => (
          <li className='options'
          key = {index}>
          {item.answer}
          </li>
        ))}
        </ul>
        </div>
      )
    }
    return (
      <div>
        <h2>{question}</h2>
        <span>{`Question ${currentIndex+1} of ${QuizData.length} `}</span>
        {
          options.map(option =>
          <p key = {option.id} className={`options ${userAnswer===option ? "selected" : null}`}
          onClick = {()=>this.checkAnswer(option)}>
           {option}
          </p>)
        }
        {currentIndex < QuizData.length-1 &&
        <button disabled={this.state.disabled} onClick={this.nextQuestion}>Next Question</button>
      }
      {
        currentIndex === QuizData.length -1 &&
        <button onClick= {this.finishHandler} disabled={this.state.disabled}>Finish</button>
      }

      </div>
    )
  }

}

export default Quiz
