import React from "react";
import styled from "styled-components";
import QuizImage1 from "../../images/SVG/quiz-wave-1.svg";
import QuizImage2 from "../../images/SVG/quiz-wave-2.svg";

import Confetti from "./Confetti";

// This is where the User will find their results. This is mainly just a template page.
// Data is being returned back to the Play component which populates the .props. e.g. this.props.playAgain utilises a method in Play.js to Restart the quiz

class Summary extends React.Component {
    constructor(){
        super();
        this.state = {
            showConfetti: "none"
        }
    }
    render(){
        return (
            <Container>
                <div className = "content-container">
                    <div style = {{display: this.props.showConfetti}}>
                        <Confetti/>
                    </div>
                    <h1> Summary </h1>
                    <h2> You scored {this.props.score} out of {this.props.numOfQuestions} </h2>

                    <SuccessContainer>
                        <p> You have {this.props.success} </p>
                        <p> {this.props.successMessage} </p>
                    </SuccessContainer>
                </div>
                <ButtonContainer>
                    <button onClick = {this.props.playAgain}> Play again </button>
                    <button onClick = {this.props.homeReturn}> Return </button>
                </ButtonContainer>
                <img src = {QuizImage1} className = "top-quiz-wave" />
                <img src = {QuizImage2} className = "bottom-quiz-wave"/>
            </Container> 
        )
    }
}

const Container = styled.div`
    background: #23758b;
    height: 100vh;
    padding: 14px;
    text-align: center;
    position: relative;
    overflow: hidden;
    .content-container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @media only screen and (min-width: 1300px) and (max-width: 1500px){
            top: 25%
        }
        @media only screen and (min-width: 768px) and (max-width: 1100px){
            top: 25%;
        }
        @media only screen and (max-width: 768px) and (min-width: 350px){
            top: 30%;
        }
        @media only screen and (max-width: 350px){
            top: 30%;
        }
    }
    h1{
        font-size: 5em;
        color: white;
        @media only screen and (max-width: 350px){
            font-size: 4em;
        }
        @media only screen and (max-width: 800px) and (min-width: 430px){
            font-size: 5.6em;
        }
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            font-size: 8.5em;
        }
        @media only screen and (min-width: 1400px) and (max-width: 2000px){
            font-size: 10em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 15em;
        }
    }
    h2{
        font-size: 2.2em;
        color: white;
        font-weight: 400;
        @media only screen and (max-width: 350px){
            font-size: 2em;
        }
        @media only screen and (max-width: 800px) and (min-width: 430px){
            font-size: 2.6em;
        }
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            font-size: 2.3em;
        }
        @media only screen and (min-width: 1400px) and (max-width: 2000px){
            font-size: 2.8em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 3.8em;
        }
    }
    p{
        color: white;
        @media only screen and (max-width: 350px){
            font-size: 1.4em;
        }
        @media only screen and (max-width: 800px) and (min-width: 430px){
            font-size: 1.6em;
        }
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            font-size: 1.5em;
        }
        @media only screen and (min-width: 1400px) and (max-width: 2000px){
            font-size: 1.8em;
        }
        @media only screen and (min-width: 2000px){
            font-size: 2.2em;
        }
    }
    .top-quiz-wave{
        position: absolute;
        top: 0;
        right: 0;
        width: 350px;
        @media only screen and (max-width: 800px) and (min-width: 430px){
            width: 900px
        }
        @media only screen and (max-width: 1050px) and (min-width: 800px){
            width: 500px;
        }
        @media only screen and (min-width: 1050px) and (max-width: 1400px){
            width: 1250px;
        }
        @media only screen and (min-width: 2000px){
            width: 1800px;
        }
    }
    .bottom-quiz-wave{
        width: 200px;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 1;
        @media only screen and (max-width: 800px) and (min-width: 430px){
            width: 380px;
        }
        @media only screen and (max-width: 1050px) and (min-width: 800px){
            width: 300px;
        }
        @media only screen and (min-width: 1050px) and (max-width: 1400px){
            width: 600px;   
        }
        @media only screen and (min-width: 2000px){
            width: 800px;
        }
    }
`
const ButtonContainer = styled.div`
    position: absolute;
    bottom: 20px;
    width: 92.5%;
    text-align: center;
    button{
        text-align: center;
        margin: auto;
        padding: 20px;
        border: none;
        background: #8bb7f6;
        color: white;
        border-radius: 10px;
        font-size: 2em;
        width: 30%;
        margin-top: 40px;
        transition: .5s all;
        width: 100%;
        &:nth-child(1){
            background: #43f443;
            &:hover{
                background: #3be23b;
            }
        }
        &:nth-child(2){
            border: 4px solid white;
            background: rgba(121, 161, 219, 0.3);;
            border-radius: 8px;
            font-size: 2.2em;
            padding: 20px 50px;
            z-index: 2;
            position: relative;
            &:hover{
                background: rgba(121, 161, 219, 0.4);
            }
            @media only screen and (min-width: 2000px){
                font-size: 3.2em;
            }
        }
        @media only screen and (max-width: 1400px) and (min-width: 800px){
            font-size: 2.6em;
            padding: 20px;
        }
        @media only screen and (min-width: 2000px){
            font-size: 4em;
            padding: 50px;
        }
    }
    @media only screen and (max-width: 2000px) and (min-width: 430px){
        left: 50%;
        width: 44%;
        transform: translateX(-50%);
        margin-bottom: 34px;
        z-index: 30000000000;
    }
    @media only screen and (min-width: 2000px){
        width: 40%;
        z-index: 3000000;
        margin-bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
    }
`
const SuccessContainer = styled.div`
    text-align: center;
`
export default Summary;