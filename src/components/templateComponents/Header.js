import React  from "react";
import styled from "styled-components";

class HeaderComp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            animation: " ",
            animate: false
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.name !== this.props.name){
            clearTimeout(this.timeout);
            if(this.state.animation !== "slideIn 2.5s linear"){
                this.setState({
                    animation: "slideIn 2.5s linear"
                });
                this.timeout = setTimeout(() => {
                    this.setState({ animation: " "})
                }, 2500);
            } else {
                this.setState({
                    animation: " "
                })
            }
        }
    }
    render(){
        return (
            <HeaderImage
                headerImageDesk = {this.props.image}
                headerImageTab = {this.props.imageTab}
                headerImageMob = {this.props.imageMob}
            >
                <div></div>
                <ImageTextContainer style = {{animation: this.state.animation}}>
                    <H1> {this.props.name} </H1>
                    <Stripe stripeColour = {this.props.headerColour}/>
                    <p> {this.props.description} </p>
                </ImageTextContainer>
            </HeaderImage>
        )
    }
}

const HeaderImage = styled.div`
    overflow: hidden;
    color: white;
    position: relative;
    min-height: 70vh;
    max-height: 90vh;
    background: url(${props => props.headerImageDesk});
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    @media only screen and (max-width: 760px){
        background: url(${props => props.headerImageTab});
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    }
    @media only screen and (max-width: 500px){
        background: url(${props => props.headerImageMob});
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    }
`
const ImageTextContainer = styled.div`
    @keyframes slideIn{
        0%{
            margin-left: -1200px;
        }
        80%{
            margin-left: 20px;
        }
        100%{
            margin-left: 0;
        }
    }
    text-shadow: 5px 5px 5px #545454;
    color: white;
    width: 50%;
    position: absolute;
    left: 5%;
    bottom: 3%;
    h1{
        font-size: 3.4em;
        text-transform: uppercase;
        line-height: 1.3em;
        margin-left: -1px;
    }
    p {
        color: white;
        font-weight: 400;
        line-height: 1.3em;
    }
    @media only screen and (min-width: 2500px){
        h1{
            font-size: 9em !important;
        }
        p{
            font-size: 3em !important;
        }
    }
    @media only screen and (min-width: 1400px){
        h1{
            font-size: 6em;
        }
        p{
            font-size: 1.6em;
        }
    }
    @media only screen and (max-width: 760px){
        width: 65%;
    }
    @media only screen and (max-width: 500px){
        width: 80%;
        h1{
            font-size: 2.6em;
        }
        p{
            font-size: 1.05em;
        }
    }
`
const H1 = styled.h1`
    font-size: 4em;
`
const Stripe = styled.div`
    width: 115%;
    height: 6px;
    margin: 10px 0;
    margin-left: -15%;
    background: ${props => props.stripeColour};
`

export default HeaderComp;