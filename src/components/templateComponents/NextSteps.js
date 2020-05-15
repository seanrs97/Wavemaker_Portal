import React  from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

class NextSteps extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <NextStepsContainer navImage = {this.props.image}>
                {!!this.props.navigation && this.props.navigation.map((nav) =>
                    <div className = "main-container" key = {nav.id}>
                        <Link to = {nav.id}>
                            <ButtonText>
                                {nav.text}
                            </ButtonText>
                        </Link>
                    </div>
                )}
            </NextStepsContainer>
        )
    }
}

const NextStepsContainer = styled.div`
    .main-container{
        width: 100%;
        background: url(${props => props.navImage});
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        height: 350px;
        position: relative;
        @media only screen and (min-width: 2000px){
            height: 450px;
        }
    }
`
const ButtonText = styled.div`
    background: rgba(100, 100, 100, 0.6);
    border: 8px solid black;
    text-align: center;
    padding: 20px;
    font-weight: 600;
    font-size: 1.5em;
    color: white;
    border: 2px solid white;
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 12px;
    transform: translate(-50%, -50%);
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    :hover{
        background: rgba(100, 100, 100, 0.9);
    }
    @media only screen and (min-width: 2400px){
        font-size: 2em;
        width: 25%;
        padding: 50px;
    }
    @media only screen and (min-width: 2000px) and (max-width: 2400px){
        padding: 40px;
        font-size: 1.8em;
        width: 30%;
    }
    @media only screen and (max-width: 500px){
        font-size: 1.2em;
    }
`

export default NextSteps;