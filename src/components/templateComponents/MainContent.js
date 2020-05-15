import React  from "react";
import styled from "styled-components";

class MainContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <ContentContainer>
                {!!this.props.content && this.props.content.map((cont) =>
                    <div className = "contentContainer contentContainerComplex" key = {cont.id}>
                        <p className = "content-text">{cont.text}</p>
                        <img 
                            src = {cont.image} alt = {cont.id}
                            data-sal = "zoom-in"
                            data-sal-easing = "ease-out-back"
                            data-sal-duration = "1300"
                            data-sal-delay = "200"
                        />
                    </div>
                )}
                {!!this.props.content2 && this.props.content2.map((cont) =>
                    <div className = "contentContainer contentContainerComplex" key = {cont.id}>
                        <p className = "content-text">{cont.text}</p>
                        <img
                            src = {cont.image} alt = {cont.id}
                            data-sal = "zoom-in"
                            data-sal-easing = "ease-out-back"
                            data-sal-duration = "1300"
                            data-sal-delay = "200"
                        />
                    </div>
                )}
                {!!this.props.content3 && this.props.content3.map((cont) =>
                    <div className = "contentContainer contentContainerComplex" key = {cont.id}>
                        <img 
                            src = {cont.image} alt = {cont.id}
                            data-sal = "zoom-in"
                            data-sal-easing = "ease-out-back"
                            data-sal-duration = "1300"
                            data-sal-delay = "200"
                        />
                        <ContentContainer className = "content-text">
                            <div className = "wrapper">
                                <h3>{cont.mainHeader}</h3>
                                <div className = "firstTextContainer">
                                    <h5> {cont.headingText1}</h5>
                                    <p> {cont.text1} </p>
                                </div>
                                <div className = "secondTextContainer">
                                    <h5> {cont.headingText2}</h5>
                                    <p> {cont.text2} </p>
                                </div>
                                <div className = "thirdTextContainer">
                                    <h5> {cont.headingText3}</h5>
                                    <ul> {!!cont.text3 && cont.text3.map((data) =>
                                        <li> {data.text} </li>
                                    )}
                                    </ul>
                                </div>
                            </div>
                        </ContentContainer>
                    </div>
                )}
            </ContentContainer>
        )
    }
}

const ContentContainer = styled.div`
    .contentContainer{
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        padding: 25px 0;
        min-height: 30vh;
        padding: 50px 0;
        &:nth-of-type(even){
            min-height: 30vh;
            flex-direction: row-reverse;
            @media only screen and (max-width: 770px){
                min-height: 30vh;
                padding: 50px 0;
            }
            img{
                @media only screen and(max-width: 770px){
                    left: 0;
                }
            }
        }
        h3{
            font-size: 1.8em;
            font-weight: 200;
        }
        h5{
            display: inline-block;
            font-size: 1em;
            font-weight: 800;
            margin-right: 8px;
            @media only screen and (max-width: 480px){
                margin-right: 0;
            }
        }
        ul{
            font-size: 0.85em;
            margin-left: 20px;
            line-height: 1.5em;
            @media only screen and (max-width: 480px){
                margin-left: 0;
                list-style: none;
            }
        }
        .wrapper{
            p{
                display: inline-block;
                font-size: 0.85em;
                @media only screen and (max-width: 480px){
                    display: block;
                }
            }
        }
        .content-text{
            position: initial !important;
            display: flex;
            max-width: 45%;
            font-size: 1.2em;
            width: 100%;
            align-items: center;
            justify-content: center;
            @media only screen and (min-width: 1900px){
                font-size: 1.8em;
            }
            @media only screen and (max-width: 480px){
                padding-bottom: 20px;
                position: initial;
                max-width: 100%;
            }
        }
        img{
            height: 100%;
            max-width: 45%;
            position: initial;
            width: 70%;
            margin-left: auto;
            margin-right: auto;
            @media only screen and (max-width: 480px){
                padding-bottom: 50px;
            }    
        }
        @media only screen and (max-width: 770px){
            padding: 50px 0;
        }
        @media only screen and (max-width: 480px){
            width: 95%;
            display: block !important;
            text-align: center;
        }
    }
`
export default MainContent;