import React from "react";
import {Helmet} from "react-helmet";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IsEmpty from "./IsEmpty";

import correctSound from "../../sounds/correct.mp3";
import incorrectSound from "../../sounds/incorrect.mp3";
import QuizImage1 from "../../images/SVG/quiz-wave-1.svg";
import QuizImage2 from "../../images/SVG/quiz-wave-2.svg";

import Summary from "./Summary";

// This is where the majority of the quiz is being handled. Ideally it will be seperated into different components soon as this file is HUGE!

// Past line 612 is just CSS styles

class Play extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // Quiz functionality states
            questions:  [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: "",
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled: false, 
            previousButtonDisabled: true,
            previousRandomNumber: [],
            disableButtons: false,
            time: {},

            // Show / Hide components and return states 
            showQuestions: "block",
            showSummary: " ",
            showDialog: "none",
            showOverlay: "none",
            returnHome: false,
            displayQuiz: "translateX(-100%) scale(0)",
            answerMessage: "",
            showConfetti: "none",
            optionDisabled: true,
            backgroundChange: "#23758b",
            homeAppear: "",
            doesQuizExist: "",
            questionDisplay: ""
        }

        this.interval = null;
        this.correctSound = React.createRef();
        this.wrongSound = React.createRef();
    }

    // This method starts up the game and is called when the user selects the 'Play' button on the home page
    startGame = () => {
        let {currentQuestionIndex} = this.state;
        let questions;
        let currentQuestion;
        let nextQuestion;
        let previousQuestion;
        let answer;

        // IGNORE the first part of this IF statement, It's just lazy coding and needs to be changed
        // The else basically displays the questions if they exist
        if(this.props.questions === undefined || this.props.questions === ""){
            questions = [
                {
                    "default question": "default answer", 
                    "default question 2": "default answer"
                }
            ];
            currentQuestion = {"default question": "default question 2"};
            nextQuestion = {"default question": "default question 2"};
            previousQuestion = {"default question": "default question 2"};
            answer = "default answer";
        } else {
            questions = this.props.questions;
            currentQuestion = this.props.questions[currentQuestionIndex];
            nextQuestion = this.props.questions[currentQuestionIndex + 1];
            previousQuestion = this.props.questions[currentQuestionIndex - 1];
            answer = this.props.questions[currentQuestionIndex].answer;
        }
        
        // Sets the questions data to state, so they can be used throughout the rest of this component
        if(questions.length === 0 || questions === undefined || currentQuestion.length === 0 || currentQuestion === undefined){
            console.log("somethings gone wrong here")
        } else {
            this.setState({
                questions: questions,
                currentQuestion:currentQuestion,
                nextQuestion: nextQuestion,
                previousQuestion: previousQuestion, 
                numberOfQuestions: questions.length,
                answer:  answer
            });
        }
    }
    // Used to constantly check if a quiz exists when state changes. I.e when the user goes to a new page.
    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.checkIfQuizExists();
            this.exitQuiz();
            clearInterval(this.interval);
            this.setState({
                questions: this.props.questions
            })
            if(this.state.currentQuestionIndex !== 0){
                this.setState({
                    currentQuestionIndex: 0,
                    score: 0
                });
                this.showOptions();
            }
            if(this.state.showSummary !== "dissapear 1.2s linear forwards"){
                this.setState({
                    showSummary: "dissapear 1.2s linear forwards"
                })
            }
        }
    }
    
    // Checks if JSON has questions data, if not then removes the quiz component from the page
    checkIfQuizExists = () => {
        // METHOD APPEARS TO WORK BUT PROBABLY DOES NOT < WILL LIKELY REQUIRE FURTHER TESTING!!!!
        if(this.props.questions === undefined){
            setTimeout(() => {
                this.setState({
                    homeAppear: "dissapear 1s linear forwards",
                    doesQuizExist: "dissapear 1s linear forwards"
                });
            },100)
         } else {
            this.setState({
                homeAppear: "appear 1s linear forwards",
                doesQuizExist: "appear 1s linear forwards"
            });
         }
    }
    
    // Can't actually remember why this is here, but I'm keeping it just incase ....
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    // Displays the questions from the JSON file
    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;

        if(!IsEmpty(this.state.questions)){
            questions = this.state.questions;
            currentQuestion =  questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({ 
                currentQuestion, 
                nextQuestion,
                previousQuestion,
                answer,
                previousRandomNumber: [],
            }, () => {
                this.showOptions();
            });
        }
    }
    
    // Plays a sound for the users right and wrong answers. Just a nice feature more than anything
    handleOptionClick = (e) => {
        if(e.target.innerHTML.toLowerCase() === this.state.answer){
            setTimeout(() => {
                this.correctSound.current.play();
            }, 300);
            this.correctAnswer();
        } else {
            setTimeout(() => {
                this.wrongSound.current.play();
            }, 300);
            this.incorrectAnswer();
        }
    }

    // Handles the users answer if it is correct
    correctAnswer = () => {
        this.setState({
            optionDisabled: false,
            backgroundChange: "#52b830",
            questionDisplay: "translateX(160%)"
        });
        setTimeout(() => {
            this.setState({
                answerMessage: "Correct",
            })
        }, 320)
        setTimeout(() => {
            this.setState({
                questionDisplay: "translateX(0)"
            })
            this.setState(prevState => ({
                score: prevState.score + 1,
                correctAnswers: prevState.correctAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
                answerMessage: "",
            }), () => {
                if(this.state.nextQuestion === undefined){
                    this.end();
                } else {
                    this.displayQuestions(
                        this.state.questions, 
                        this.state.currentQuestion, 
                        this.state.nextQuestion, 
                        this.state.previousQuestion);
                }
            })
        }, 1700);
    }

    // Handles the users answer if it is incorrect
    incorrectAnswer = () => {
        navigator.vibrate(1000);
        this.setState({
            optionDisabled: false,
            backgroundChange: "#f7554d",
            questionDisplay: "translateX(160%)"
        });
        setTimeout(() => {
            this.setState({
                answerMessage: "Incorrect",
            })
        }, 320)
        setTimeout(() => {
            this.setState({
                questionDisplay: "translateX(0)"
            })
            this.setState(prevState => ({
                wrongAnswers: prevState.wrongAnswers + 1,
                currentQuestionIndex: prevState.currentQuestionIndex + 1,
                numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
                answerMessage: "",
                backgroundChange: "red"
            }), () => {
                if(this.state.nextQuestion === undefined){
                    this.end();
                } else {
                    this.displayQuestions(
                        this.state.questions, 
                        this.state.currentQuestion, 
                        this.state.nextQuestion, 
                        this.state.previousQuestion);
                }
            })
        }, 1700)
    }
    showOptions = () => {
        const options = Array.from(document.querySelectorAll(".option"));
        options.forEach(option => {
            option.style.visibility = "visible";
        });
        this.setState({
            usedFiftyFifty: false,
            optionDisabled: true,
            backgroundChange: "#23758b"
        })
    }

    // Handles the hints lifeline
    // !!!!!!!!!!!!!!!!! IGNORE THIS < likely going to be scrapped soon !!!!!!!!!!!!!!!!
    handleHints = () => {
        if(this.state.hints > 0){
            const options = Array.from(document.querySelectorAll(".option"));
            let indexOfAnswer;
            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                    indexOfAnswer = index;
                }
            });
            while (true) {
                const randomNumber = Math.round(Math.random() * 3);
                if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumber.includes(randomNumber)){
                    options.forEach((option, index) => {
                        /* Sorts bug that removes option even though its already removed */
                        if(option.style.visibility !== "hidden"){
                            if(index === randomNumber){
                                option.style.visibility = "hidden";
                                this.setState((prevState) => ({
                                    hints: prevState.hints  - 1,
                                    previousRandomNumber: prevState.previousRandomNumber.concat(randomNumber)
                                }));    
                            }
                        }
                    });
                    break;
                }
                if(this.state.previousRandomNumber.length >= 3) break;
            } 
        }
    }

    // Starts the countdown Timer displayed in the Lifeline section of the quiz. Just a simple countdown clock.
    startTimer = () => {
        const countdownTime = Date.now() + 60000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countdownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) /  (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000 );

            if(distance < 0){
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.end();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000);
    }

    // Handles the 5050 Lifeline functionality
    handleFiftyFifty = () => {
        if(this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false){
            const options = document.querySelectorAll(".option");
            const randomNumbers = [];
            let indexOfAnswer;

            options.forEach((option, index) => {
                if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                    indexOfAnswer = index;
                }
            });
            let count = 0;
            do {
                const randomNumber = Math.round(Math.random() * 3);
                console.log(randomNumber);
                if(randomNumber !== indexOfAnswer){
                    console.log("random number: ", randomNumber, " index: ", indexOfAnswer);

                    if(randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
                        randomNumbers.push(randomNumber);
                        count ++;
                    }
                }
            } while (count < 2);
            options.forEach((option, index) => {
                if(randomNumbers.includes(index)){
                    option.style.visibility = "hidden";
                }
            });
            this.setState(prevState => ({
                fiftyFifty: prevState.fiftyFifty - 1,
                usedFiftyFifty: true
            }))
        }
    }

    // This method is used when the quiz ends. It is used to determine the players results.
    // This is likely where the user will recieve their XP / Badge
    end  = () => {
        const { state } = this;
        let playerResult = "failed";
        let successMessage = "Please try again!";

        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints
        };
        if(playerStats.score === playerStats.numberOfQuestions){
            playerResult = "passed"
            successMessage = "Well done, you can now move on!"
            setTimeout(() => {
                this.setState({
                    showConfetti: "block"
                });
            }, 2400)
        }
        this.setState({
            endScore: playerStats.score,
            endNumOfQuestions: playerStats.numberOfQuestions,
            endNumOfAnsweredQuestions: playerStats.numberOfAnsweredQuestions,
            endNumberOfCorrectAnswers: playerStats.correctAnswers,
            endNumberOfWrongAnswers: playerStats.wrongAnswers,
            success: playerResult,
            successMessage: successMessage,

        });
        setTimeout(() => {
            console.log("player stats", this.state.endScore);
            this.setState({
                showQuestions: "none",
                numberOfAnsweredQuestions: 0,
                currentQuestionIndex: playerStats.numberOfQuestions - 1,
                time: {
                    minutes: 0,
                    seconds: 0
                },
                hints: 0,
                fiftyFifty: 0,

                showSummary: "appear 1.2s linear forwards",
                displayQuiz: "translateX(-100%) scale(0)"
            });
            clearInterval(this.interval);
            console.log(this.state);
        }, 1000)
    }

    // Restarts the quiz when the user selects the 'play again' button. Basically just resets all values to their original form.
    resetQuiz = () => { 
        clearInterval(this.interval);
        this.showOptions();
        this.setState({
            showQuestions: "block",
            currentQuestionIndex: 0,
            hints: 5,
            fiftyFifty: 2,
            wrongAnswers: 0,
            correctAnswers: 0,
            currentQuestion: this.state.questions[0],
            nextQuestion: this.state.questions[0 + 1],
            answer: this.state.questions[0].answer,
            previousQuestion: undefined,
            endNumOfQuestions: 0,
            endNumOfAnsweredQuestions: 0,
            success: "",
            successMessage: "",
            score: 0,
            endScore: 0,
            showSummary: "dissapear 1.2s linear forwards",
            displayQuiz: "translateX(0) scale(1)",
            showConfetti: "none"
        });
        this.startTimer();
    }

    // Displays a dialog box to give the user an option to either exit the quiz or resume the quiz
    quitQuiz = () => {
        console.log("are you sure you want to quit this quiz?");
        this.setState({
            showDialog: "block",
            showOverlay: "block",
        });
        clearInterval(this.interval);
    }

    // Used when the user selects 'yes' from the dialog box to quit the quiz and return home
    exitQuiz = () => {
        this.setState({
            showDialog: "none",
            showOverlay: "none",
            homeAppear: "appear 1s linear forwards",
            displayQuiz: "translateX(0) scale(1)"
        });
    }

    // Used when the user selects 'no' from the dialog menu to resume the quiz
    resumeQuiz = () => {
        console.log("pause state", this.state.time.seconds)
        this.setState({
            showDialog: "none",
            showOverlay: "none"
        });
        const currentTime = this.state.time.seconds + "000";
        const resumeTime = parseInt(currentTime) ;

        const countdownTime = Date.now() + resumeTime;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countdownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) /  (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000 );

            if(distance < 0){
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.end();
                });
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000);
    }

    // Used when the user selects the 'play' button from the home screen. Just displays the quiz component and runs the 'start game' method.
    startQuiz = () => {
        setTimeout(() => {
            this.setState({
                displayQuiz: "translateX(0) scale(1)",
                homeAppear: "dissapear 1s linear forwards"
            }); 
        }, 800);
        this.startGame();
        this.startTimer();
        this.setState({
            hints: 5,
            fiftyFifty: 2
        });
        if(this.state.currentQuestionIndex !== 0){
            this.resetQuiz();
        }
    }

    // Return the user home from the summary page when they select the 'return' button
    returnHome = () => {
        this.setState({
            homeAppear: "appear 1s linear forwards"
        })
    }

    // Renders the quiz into a html format
    render(){
        const {
            currentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions, 
            hints, 
            fiftyFifty,
            time,

            endScore,
            endNumOfQuestions,
            success,
            successMessage
        } = this.state;
        return (
        <React.Fragment>
            <audio ref = {this.correctSound} src = {correctSound}></audio>
            <audio ref = {this.wrongSound} src = {incorrectSound}></audio>
            <Helmet> <title> Quiz Page </title></Helmet>
                <ContentWrapper style = {{animation: this.state.doesQuizExist}}>
                    <Home style = {{animation: this.state.homeAppear}} >
                        <div className = "content-container">
                            <h1> Quiz </h1>
                            <div className = "button-container">
                                <button onClick = {this.startQuiz}>Start</button> 
                            </div>
                        </div>
                        <img src = {QuizImage1} className = "top-quiz-wave" />
                        <img src = {QuizImage2} className = "bottom-quiz-wave"/>
                    </Home>
                    <QuizContainer style = {{transform: this.state.displayQuiz }}>
                        <div style = {{position: "relative"}}>
                            <DialogContainer style = {{display: this.state.showDialog, zIndex: "100000001"}}>
                                <h1> Are you sure you want to quit the quiz? </h1>
                                <button onClick = {this.exitQuiz}> Yes </button>
                                <button onClick = {this.resumeQuiz}> No </button>
                            </DialogContainer>

                            <OverlayContainer style = {{display: this.state.showOverlay, zIndex: "100000000"}}/>
                            <Container style = {{background: this.state.backgroundChange}}>
                                <span onClick = {this.quitQuiz} className = "quitQuiz" > X </span>
                                <div className = "main-content-container">
                                    <p style = {{transform: this.state.questionDisplay}} className = "numberOfQuestionsContainer">
                                        <span className = "qNumber">
                                            Question {currentQuestionIndex + 1} of {numberOfQuestions}
                                        </span>
                                    </p>
                                    <H5 style = {{transform: this.state.questionDisplay}}> {currentQuestion.question} </H5>
                                    <OptionsContainer style = {{transform: this.state.questionDisplay}}>
                                        <button disabled = {!this.state.optionDisabled} onClick = {this.handleOptionClick} className = "option">{currentQuestion.optionA}</button>
                                        <button disabled = {!this.state.optionDisabled} onClick = {this.handleOptionClick} className = "option">{currentQuestion.optionB}</button>
                                        <button disabled = {!this.state.optionDisabled} onClick = {this.handleOptionClick} className = "option">{currentQuestion.optionC}</button>
                                        <button disabled = {!this.state.optionDisabled} onClick = {this.handleOptionClick} className = "option">{currentQuestion.optionD}</button>
                                    </OptionsContainer>
                                    <LifelineContainer style = {{transform: this.state.questionDisplay}}>
                                        <p onClick = {this.handleHints}>
                                            <span className = "lifeline help-icon">
                                                <FontAwesomeIcon icon = "lightbulb"/>
                                            </span>
                                            <span className = "lifelineNum">{hints}</span>
                                        </p>
                                        <p>
                                            <span className = "timer help-icon"><FontAwesomeIcon icon="hourglass" /></span>
                                            <span className = "">{time.minutes}:{time.seconds}</span>
                                        </p>
                                        <p onClick = {this.handleFiftyFifty}>
                                            <span className = "5050 help-icon">
                                                <FontAwesomeIcon icon = "heart"/>
                                            </span>
                                            <span className = "lifelineNum">{fiftyFifty}</span>
                                        </p>
                                    </LifelineContainer>
                                </div>
                                <SuccessMessage>
                                    <h1> {this.state.answerMessage} </h1>
                                </SuccessMessage>
                            </Container>
                            </div>
                        </QuizContainer>
                        <SummaryContainer style = {{animation: this.state.showSummary}}>
                            <Summary
                                    score = {endScore}
                                    numOfQuestions = {endNumOfQuestions}
                                    success = {success}
                                    successMessage = {successMessage}
                                    playAgain = {this.resetQuiz}
                                    homeReturn = {this.returnHome}
                                    showConfetti = {this.state.showConfetti}
                                />
                        </SummaryContainer>
                </ContentWrapper>
            </React.Fragment>
        )
    }
}

const ContentWrapper = styled.div`
    position: relative;
    overflow: hidden;
    height: 100vh;
`
/* HOME PAGE STYLES */ 
const Home = styled.div`
    position: absolute;
    width: 100%; 
    left:0;
    top: 0;
    z-index: 3;


    background: #23758b;
    height: 60vh;
    padding: 14px;
    color: white;
    position: relative;
    overflow: hidden;
    transition: 1.6s;

    .content-container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        h1{
            font-size: 4.5em;
            font-weight: 800;
            text-align: center;
            font-family: dosis;
            @media only screen and (max-width: 430px){
                font-size: 7em;
                font-weight: 800;
            }
            @media only screen and (max-width: 800px) and (min-width: 430px){
                font-size: 8em
            }
            @media only screen and (max-width: 1400px) and (min-width: 800px){
                font-size: 10em;
            }
            @media only screen and (min-width: 1400px) and (max-width: 2000px){
                font-size: 12em;
            }
            @media only screen and (min-width: 2000px){
                font-size: 14em;
            }
        }
        p{
            color: white;
            text-align: center;
            padding: 10px 0;
            @media only screen and (max-width: 430px){
                font-size: 1.1em;
            }
            @media only screen and (max-width: 800px) and (min-width: 430px){
                font-size: 2em;
            }
            @media only screen and (max-width: 1400px) and (min-width: 800px){
                font-size: 2.4em;
            }
            @media only scren and (min-width: 1400px) and (max-width: 2000px){
                font-size: 3.2em;
            }
            @media only screen and (min-width: 2000px){
                font-size: 4em;
            }
        }
        .button-container{
            width: 100%;
            text-align: center;
            button{
                border: 4px solid white;
                background: #3589a1;
                border-radius: 8px;
                font-size: 2.2em;
                padding: 20px 50px;
                color: white;
                transition: .4s all;
                font-weight: 600;
                &:hover{
                    background: #23758b;
                }
                @media only screen and (max-width: 430px){
                    width: 100%;
                }
                @media only screen and (max-width: 800px) and (min-width: 430px){
                    font-size: 2.5em;
                    margin-top: 14px;   
                }
                @media only screen and (max-width: 1400px) and (min-width: 800px){
                    font-size: 2.8em;
                    margin-top: 30px;
                }
                @media only screen and (min-width: 1400px) and (max-width: 2000px){
                    font-size: 3.6em;
                    margin-top: 50px;
                }
                @media only screen and (min-width: 2000px){
                    font-size: 4.8em;
                    margin-top: 80px;
                    padding: 60px 140px;
                }
            }
        }
        @media only screen and (max-width: 1400px) and (min-width: 430px){
            width: 100%;
        }
    }
    .top-quiz-wave{
        position: absolute;
        top: -5%;
        right: 0;
        width: 500px;
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            width: 700px;
        }
        @media only screen and (min-width: 1400px) and (max-width: 2000px){
            width: 850px;
        }
        @media only screen and (min-width: 2000px){
            width: 1200px;
        }
    }
    .bottom-quiz-wave{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 250px;
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            width: 350px;
        }
        @media only screen and (min-width: 1400px) and (max-width: 2000px){
            width: 500px;
        }
        @media only screen and (min-width: 2000px){
            width: 750px;
        }
    }
    @media only screen and (max-width: 430px){
        height: 100vh;
    }
    @media only screen and (max-width: 3000px) and (min-width: 430px){
        height: 100vh;
    }
`

/* MAIN QUIZ STYLES */
const QuizContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    transition: 1.2s all;
`
const Container = styled.div`
    width: 97.15%;
    padding: 14px;
    transition: 1.2s all;
    background: #23758b;
    color: white;
    height: 60vh;
    z-index: 100000;
    position: relative;
    .main-content-container{
        top: 30%;
        position: absolute;
        transform: translateY(-30%);
        @media only screen and (max-width: 574px){
            width: 100%;
        }
        @media only screen and (max-width: 800px) and  (min-width: 574px){
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
            width: 94%;
        }
        @media only screen and (max-width: 1050px) and (min-width: 800px){
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
            width: 84%;
        }
        @media only screen and (min-width: 1050px) and (max-width: 1500px){
            width: 84%;
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            top: 40%;
            left: 50%;
            width: 75%;
            transform: translate(-50%, -50%);
        }
        @media only screen and (min-width: 2000px){
            top: 40%;
            left: 50%;
            width: 68%;
            transform: translate(-50%, -50%);
        }
    }
    .quitQuiz{
        font-weight: 800;
        color: white;
        position: absolute;
        top: 12px;
        left: 12px;
        font-size: 1.7em;
        cursor: pointer;
        z-index:
        @media only screen and (max-width: 800px) and (min-width: 574px){
            font-size: 2.2em;
            top: 15px;
            left: 15px;
        }
        @media only screen and (max-width: 1500px) and (min-width: 800px){
            top: 30px;
            left: 30px;
            font-size: 3em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            top: 40px;
            left: 40px;
            font-size: 3.4em;
        }
        @media only screen and (min-width: 2000px){
            top: 60px;
            left: 60px;
            font-size: 5em;
        }
    }
    h1{ 
        text-align: center;
        font-weight: 400;
        font-size: 6em;
        color: white;
    }
    .numberOfQuestionsContainer{
        text-align: center;
        font-size: 1em;
        font-weight: 100;
        transition: 1s all;
        .qNumber{
            color: white;
            font-weight: 100;
            @media only screen and (max-width: 1050px) and (min-width: 574px){
                font-size: 1.6em;
            }
            @media only screen and (max-width: 1500px) and (min-width: 1050px){
                font-size: 2em;
            }
            @media only screen and (min-width: 1500px) and (max-width: 2000px){
                font-size: 2.2em;
            }
            @media only screen and (min-width: 2000px){
                font-size: 3.4em;
            }
        }
    }
    @media only screen and (max-width: 7000px){
        height: 100vh;
        width: 100%;
        padding: 0;
    }
`
const OverlayContainer = styled.div`
    position:absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.35;
    background: black;
    z-index: 6665;
    transition: .6s all;
    display: none;
`
const DialogContainer = styled.div`
    transform: translate(-50%,-50%);
    position: absolute;
    width: 30%;
    padding: 40px 20px;
    background: white;
    color: black;
    top: 50%;
    left: 50%;
    text-align: center;
    z-index: 6666;
    border-radius: 10px;
    h1{
        font-size: 1.4em;
        color: black;
        font-weight: 600;
        font-family: sans-serif;
        @media only screen and (max-width: 800px) and (min-width: 430px){
            font-size: 1.6em
        }
        @media only screen and (min-width: 800px) and (max-width: 1100px){
            font-size: 1.8em;
        }
        @media only screen and (min-width: 1100px) and (max-width: 2000px){
            font-size: 2.2em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 2.8em;
        }
    }
    button{
        width: 35%;
        margin: 10px;
        border-radius: 5px;
        border: none;
        padding: 10px;
        cursor: pointer;
        background: #e8e8e8;
        font-size: 1.1em;
        @media only screen and (max-width: 110px) and (min-width: 430px){
            font-size: 1.2em;
            width: 40%;
            padding: 16px;
        }
        @media only screen and (min-width: 1100px) and (max-width: 2000px){
            font-size: 1.4em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 1.7em;
            padding: 20px;
        }
    }
    @media only screen and (max-width: 430px){
        width: 80%;
    }
    @media only screen and (max-width: 800px) and (min-width: 430px){
        width: 60%;
    }
    @media only screen and (min-width: 800px) and (max-width: 1100px){
        width: 48%;
    }
    @media only screen and (min-width: 1100px) and (max-width: 2000px){
        width: 40%;
    }
    @media only screen and (min-width: 2000px){
        width: 35%;
    }
`
const LifelineContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    transition: 1s all;
    margin: 0 auto;
    color: white;
    margin-top: 30px;
    p{
        padding: 14px 20px;
        position: relative;
        text-align: center;
        background: rgba(71,187,230,0.6);
        margin: 0 8px;
        border-radius: 4px;
        // box-shadow: 2px 4px 6px 0px black;
        span{
            color: white;
            &:nth-child(1){
                @media only screen and (max-width: 1050px) and (min-width: 574px){
                    margin-right: 8px;
                }
                @media only screen and (max-width: 1500px) and (min-width: 1050px){
                    margin-right: 10px;
                }
            }
            @media only screen and (max-width: 1500px) and (min-width: 1050px){
                font-size: 1.6em;
            }
        }
        .help-icon{
            cursor: pointer;
            color: rgba(71,187,230,1);
            transition: .4s all;
            &:hover{
                color: rgba(185, 236, 255, 1)
            }
        }
        &:nth-child(1){
            transition: .3s all;
            &:active{
                transform: scale(1.2)
            }
        }
        &:nth-child(2){
            flex-grow: 1.5;
            @media only screen and (max-width: 800px) and (min-width: 430px){
                flex-grow: 0.8;
            }
            @media only screen and (max-width: 1050px) and (min-width: 800px){
                flex-grow: 0.8;
            }
            @media only screen and (min-width: 1050px) and (max-width: 1500px){
                flex-grow: 0.6;
            }
            @media only screen and (min-width: 1500px) and (max-width: 2000px){
                flex-grow: 0.85;
            }
            @media only screen and (min-width: 2000px){
                flex-grow: 0.7;
            }
        }
        &:nth-child(3){
            transition: .3s all;
            &:active{
                transform: scale(1.2)
            }
        }
        @media only screen and (max-width: 1050px) and (min-width: 574px){
            font-size: 1.2em;
            padding: 20px 16px;
        }
        @media only screen and (max-width: 1500px) and (min-width: 1050px){
            padding: 25px 40px;

            font-size: 1.2em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            font-size: 1.8em;
            padding: 30px 50px;
        }
        @media only screen and (min-width: 2000px){
            font-size: 3em;
            padding: 50px 80px;
        }
    }
    .lifeline{
        position: relative;
        top: -3px;
    }
    @media only screen and (max-width: 800px) and (min-width: 574px){
        width: 80%;
    }
    @media only screen and (max-width: 1050px) and (min-width: 800px){
        margin-top: 60px;
        width: 100%;
    }
    @media only screen and (min-width: 1050px) and (max-width: 1500px){
        margin-top: 100px;
        width: 100%;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        width: 100%;
        margin-top: 120px;
    }
    @media only screen and (min-width: 2000px){
        width: 66%;
        margin-top: 160px;
    }
`
const H5 = styled.h5`
    font-size: 2em;
    margin-bottom: 20px;
    line-height: 1.35em;
    text-align: center;
    padding: 0 20px;
    transition: 1s all;
    color: white;
    margin-top: 20px;
    @media only screen and (max-width: 800px) and (min-width: 574px){
        font-size: 2.8em;
        margin-top: 30px;
    }
    @media only screen and (max-width: 1050px) and (min-width: 800px){
        font-size: 2.6em;
        margin-top: 20px;
    }
    @media only screen and (min-width: 1050px) and (max-width: 1500px){
        font-size: 3.4em;   
        margin-top: 20px;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        font-size: 4em;
        margin-top: 20px;
    }
    @media only screen and (min-width: 2000px){
        font-size: 6.4em;
        margin-top: 35px;
    }
`
const OptionsContainer = styled.div`
    display: inline-block;
    transition: 1s all;
    width: 85%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    margin: 0 auto;
    .option{
        background: rgba(71, 187, 230, 0.6);
        border: none;
        border-radius: 4px;
        display: inline-block;
        width: 90%;
        text-align: center;
        color: white;
        cursor: pointer;
        margin: 10px;
        padding: 10px;
        transition: .3s linear all;
        transition: .3s all;
        font-size: 1.4em;
        &:hover{
            background: rgba(71, 187, 230, 1);
        }
        @media only screen and (max-width: 1050px) and (min-width: 574px){
            padding: 10px;
            font-size: 1.4em;
        }
        @media only screen and (min-width: 1050px) and (max-width: 1500px){
            padding: 20px;
            font-size: 1.75em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            font-size: 2.1em;
            padding: 30px;
        }
        @media only screen and (min-width: 2000px){
            font-size: 4em;
            padding: 70px;
        }
    }
    @media only screen and (max-width: 574px){
        display: block;
        text-align: center;
    }
    @media only screen and (max-width: 800px) and (min-width: 574px){
        width: 100%;
    }
    @media only screen and (max-width: 1500px) and (min-width: 800px){
        width: 100%;
        grid-template-rows: repeat(2, 50%);
        grid-gap: 20px;
        margin-top: 40px;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        width: 80%;
        grid-gap: 20px;
        margin-top: 50px;
    }
    @media only screen and (min-width: 2000px){
        grid-gap: 60px;
        margin-top: 60px;
    }
`
const SuccessMessage = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 10vh;
    z-index: -100;
    h1{
        font-size: 3.2em;
        font-weight: 800;
        @media only screen and (max-width: 800px) and (min-width: 574px){
            font-size: 4.4em;
        }
        @media only screen and (max-width: 1500px) and (min-width: 800px){
            font-size: 5em;
        }
        @media only screen and (min-width: 1500px) and (max-width: 2000px){
            font-size: 6em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 10em;
        }
    }
    @media only screen and (max-width: 800px) and (min-width: 574px){
        bottom: 50px;
    }
    @media only screen and (max-width: 1500px) and (min-width: 800px){
        bottom: 60px;
    }
    @media only screen and (min-width: 1500px) and (max-width: 2000px){
        bottom: 80px;
    }
    @media only screen and (min-width: 2000px){
        bottom: 140px;
    }
`

const SummaryContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
`
export default Play;