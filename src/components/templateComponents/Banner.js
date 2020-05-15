import React from "react";
import styled from "styled-components"; 

class Banner extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <HalfwayBanner>
                {!!this.props.bannerOne && this.props.bannerOne.map((banner) =>
                    <div style = {{backgroundImage: `url(${banner.image})`}} key = {banner.id}>
                        <p> {banner.text} </p>
                    </div>
                )}
                {!!this.props.bannerTwo && this.props.bannerTwo.map((banner) =>
                    <div style = {{backgroundImage: `url(${banner.image})`}}key = {banner.id}>
                        <p> {banner.text} </p>
                    </div>
                )}
            </HalfwayBanner>
        )
    }
}
const HalfwayBanner = styled.div`
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    div{
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }
    p{
        padding: 130px 0;
        width: 100%;
        text-align: center;
        font-size: 2.4em;
        text-shadow: 4px 4px 4px #545454;
        color: white;
        font-weight: 600;
        @media (min-width: 2000px){
            font-size: 3.2em;
            padding: 180px 0;
        }
        @media (max-width: 500px){
            font-size: 1.8em;
            padding: 100px 0;
            width: 90%;
            margin: 0 auto;
        }
    }
`
export default Banner;