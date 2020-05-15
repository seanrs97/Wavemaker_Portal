import React from 'react'
import styled, {keyframes} from "styled-components";

// Custom Confetti component. Bit buggy at the moment
// Works by generating a bunch of small divs and gives them random properties i.e. height, width, rotate, transform etc. and then animates them using keyframes

class Confetti extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      values: [],
      height: props.height
    }
  }
  randomNumberGenerator = (min, max) => {
    let range = max - min;
    let random = Math.random();
    random = random * (range + 1);
    random = random + min;

    return random;
  }
  randomColourGenerator = () => {
    let colour1 = this.randomNumberGenerator(30, 50);
    let colour2 = this.randomNumberGenerator(180, 210);
    let colour3 = this.randomNumberGenerator(220, 248);

    let colour4 = this.randomNumberGenerator(230, 248);
    let colour5 = this.randomNumberGenerator(57, 75);
    let colour6 = this.randomNumberGenerator(57, 75);

    let colour7 = this.randomNumberGenerator(236, 250);
    let colour8 = this.randomNumberGenerator(230, 250);
    let colour9 = this.randomNumberGenerator(240, 250);

    let finalColour = `rgb(${colour1}, ${colour2}, ${colour3})`;
    let finalColour2 = `rgb(${colour4}, ${colour5}, ${colour6})`;
    let finalColour3 = `rgb(${colour7}, ${colour7}, ${colour9})`;

    let colours = []
    colours.push(finalColour, finalColour2, finalColour3);

    let realFinalColour = colours[Math.floor(Math.random() * colours.length)];

    return realFinalColour;
  }
  randomWordGenerator = (word1, word2, word3, word4, word5) => {
    let arr = [word1, word2, word3, word4, word5]
    let random = arr[Math.floor(Math.random() * arr.length)];

    return random;
  }
  componentDidMount(){
    this.setState({
      width: window.innerWidth + "px"
    })
  }
  render(){
    let confettiItems = [];
    let confettiItemsTablet = [];

    let leftAtt1;
    let leftAtt2;
    let topAtt1;
    let topAtt2;
    let confettiNumber;

    if(this.state.width >= "0px" && this.state.width <= "1200px"){
      leftAtt1 = -500;
      leftAtt2 = 700;
      topAtt1 = -340;
      topAtt2 = -40;
      confettiNumber = 160;
    } else if (this.state.width >= "1200px") {
      leftAtt1 = -1900;
      leftAtt2 = 2200;
      topAtt1 = -340;
      topAtt2 = 1340;
      confettiNumber = 400;
    } else {
      leftAtt1 = 50;
      leftAtt2 = 500;
      topAtt1 = 0;
      topAtt2 = 50;
      confettiNumber = 400
    }
    // if(this.state.width >= "770px" && this.state.width <= "1399px") { 
    //   console.log("really nice job")
    //   leftAtt1 = -1400;
    //   leftAtt2 = 1600;
    //   topAtt1 = -340;
    //   topAtt2 = 840;
    //   confettiNumber = 360;
    //   console.log(leftAtt1)
    // }

    // let randomTiming = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];

    let randomTiming = Math.floor(this.randomNumberGenerator(0, 5));
    let randomTimingFunction = ""

    for(let i = 0; i < confettiNumber; i++){
      confettiItems.push(
        <FallingConfetti
          style = {{
            height: `${this.randomNumberGenerator(6, 10)}px`,
            width: `${this.randomNumberGenerator(8, 14)}px`,
            position: "absolute", 
            left: `${this.randomNumberGenerator(leftAtt1, leftAtt2)}px`,
            top: `${this.randomNumberGenerator(topAtt1, topAtt2)}px`,
            background: this.randomColourGenerator(),
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDuration: `${this.randomNumberGenerator(1.8, 7.5)}s`,
          }}
        />
      )
    }
    return (
      <div>
        <div>
          {confettiItems}
        </div>
        {/* <FallingConfetti transY1 = "100px"
        /> */}
      </div>
    )
  }
}
const FallingConfetti = styled.div`
  @keyframes falling {
    0%{
      transform: translateY(0) translateX(0) scaleX(0) scaleY(0) rotate(0);
    }
    25%{
      transform: translateY(130px) translateX(-50px) scaleX(-1) scaleY(-1) rotate(40deg);
    }
    50%{
      transform: translateY(260px) translateX(-100px) scaleX(0) scaleY(0) rotate(60deg);
    }
    75%{
      transform: translateY(390px) translateX(-150px) scaleX(1) scaleY(1) rotate(80deg)
    }
    100%{
      transform: translateY(520px) translateX(-200px) scaleX(-1) scaleY(-1) rotate(100deg);
    }
  }
  height: 4px;
  width: 12px;
  animation-name: falling;
`
export default Confetti;