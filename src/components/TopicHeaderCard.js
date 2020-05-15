import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import sal from "sal.js";

import '../../node_modules/sal.js/dist/sal.css';

import DefaultBanner from "./images/headerImages/Banner3.png";

import Header from "./templateComponents/Header";
import Buttons from "./templateComponents/Buttons";
import MainContent from "./templateComponents/MainContent";
import Banner from "./templateComponents/Banner";
import NextSteps from "./templateComponents/NextSteps";

import Play from "./templateComponents/quizComponents/Play";


// Utilises all of the template components and populates them with the JSON data to dynamicaly create multiple pages.

class CoreTopicsCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }
    componentDidUpdate(prevProps, prevState){
        sal({
            once: false,
        });
        if(this.props.questions !== prevProps.questions){
            this.checkQuestions();
        }
    }
    checkQuestions = () => {
        console.log(this.props.questions)
    }
    render(){
        return(
            <div style = {{transition: "5s all"}}>
                <Header 
                    image = {this.props.image}
                    imageTab = {this.props.imageTab}
                    imageMob = {this.props.imageMob}
                    headerColour = {this.props.headerColour}
                    name = {this.props.name}
                    description = {this.props.description}
                />
                <Buttons buttons = {this.props.buttons}/>
                <MainContent content = {this.props.content}/>
                <Banner bannerOne = {this.props.bannerOne}/>
                <MainContent content2 = {this.props.content2}/>
                <Banner bannerTwo = {this.props.bannerTwo}/>
                <MainContent content3 = {this.props.content3}/>

                <React.Fragment>
                    <Container style = {{display: this.state.active}}>
                        <Play 
                            questions = {this.props.questions}
                            id = {this.props.id}
                        />
                    </Container>
                </React.Fragment>
                <NextSteps 
                    image = {this.props.image}
                    navigation = {this.props.navigation}
                />
            </div>
        )
    }
}
/* PROP TYPES*/
CoreTopicsCard.propTypes = {
    image: PropTypes.string,
    imageTab: PropTypes.string,
    imageMob: PropTypes.string,
    name: PropTypes.string,
    headerColour: PropTypes.string,
    description: PropTypes.string,
    buttons: PropTypes.array,
    navigation: PropTypes.array
}
CoreTopicsCard.defaultProps = {
    image: `${DefaultBanner}`,
    imageTab: `${DefaultBanner}`,
    imageMob: `${DefaultBanner}`,
    name: "Topic Name",
    headerColour: "white",
    description: "A description of the topic belongs here, I wonder where it went...",
}
/* STYLESHEET */
const Container = styled.div`
    width: 100%;
`
export default CoreTopicsCard;
