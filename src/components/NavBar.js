import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

import BadgeBlue from "./images/BadgeBlue.svg";
import BadgeGreen from "./images/BadgeGreen.svg";
import BadgeRed from "./images/BadgeRed.svg";
import BadgeOrange from "./images/BadgeOrange.svg";

import logo from "./images/logo.svg";

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu: false,
            displayMenu: "-600px",
            hamburgerShow: "0px",
            crossShow: "translateX(-600px)"
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    showMenu = () => {
        this.setState({
            displayMenu: "88px",
            crossShow: "translateX(0)",
            hamburgerShow: "-600px"
        })
    }
    closeMenu = () => {
        this.setState({
            displayMenu: "-600px",
            hamburgerShow: "0px",
            crossShow: "translateX(-600px)"
        })
    }
    handleClickOutside = e => {
        
    }
    render(){
        return(
            <div>
                <MenuContainer onClick = {this.handleClickOutside} style = {{position: "fixed", zIndex: "1000000000000000000"}}>
                    <ContentContainer>
                        <NavImgContainer>
                            <Link to = "/"><NavImg src = {logo} /></Link>
                        </NavImgContainer>
                        <MenuList>
                            <Link to = "/core-topics/coding"><li> <img src = {BadgeBlue} alt = "coding"/></li></Link>
                            <Link to = "/core-topics/2d-design"><li> <img src = {BadgeRed} alt = "2D Design"/></li></Link>
                            <Link to = "/core-topics/3d-design"><li> <img src = {BadgeGreen} alt = "3D Design"/></li></Link>
                            <Link to = "/core-topics/animation"><li> <img src = {BadgeOrange} alt = "Animation"     /></li></Link>
                        </MenuList>
                        <Hamburger onClick = {this.showMenu} style = {{marginLeft: this.state.hamburgerShow}}>
                            <div className = "bar1"></div>
                            <div className = "bar2"></div>
                            <div className = "bar3"></div>
                        </Hamburger>
                        <Cross onClick = {this.closeMenu} style = {{transform: this.state.crossShow}}>
                            <h1> X </h1>
                        </Cross>
                        <MenuListText style = {{marginTop: this.state.displayMenu}}>
                            <Link onClick = {this.closeMenu} to = "/core-topics/coding"><li className = "listElementText"> Coding </li></Link>
                            <Link onClick = {this.closeMenu} to = "/core-topics/2d-design"><li className = "listElementText"> 2D Design </li></Link>
                            <Link onClick = {this.closeMenu} to = "/core-topics/3d-design"><li className = "listElementText"> 3D Design </li></Link>
                            <Link onClick = {this.closeMenu} to = "/core-topics/animation"><li className = "listElementText"> Animation </li></Link>
                        </MenuListText>
                        
                    </ContentContainer>
                </MenuContainer>
            </div>
        )
    }
}

const MenuContainer = styled.div`
    background: black;
    width: 100%;
`
const ContentContainer = styled.nav`
    margin: 0 auto;
    background: black;
    color: white;
    padding: 16px 0;
    width: 74%;
    display: grid;
    grid-template-areas: "grid-img grid-img grid-img grid-img grid-img grid-img grid-list grid-list";
    position: relative;
    @media only screen and (max-width: 700px){
        width: 100%;
        grid-template-areas: "nothing";
    }
    @media only screen and (max-width: 530px){
        width: 100%;
    }
`
const NavImgContainer = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    @media only screen and (max-width: 700px){
        text-align: center;
    }
`
const NavImg = styled.img`
    grid-area: grid-img;
    height: auto;
    width: 210px;
    margin-left: 6%;
    filter: invert(102%) sepia(103%) saturate(1352%) hue-rotate(87deg) brightness(11119%) contrast(119%);
    @media only screen and (min-width: 2450px){
        width: 320px;
    }
    @media only screen and (min-width: 1650px) and (max-width: 2200px){
        width: 240px;
    }
    @media only screen and (max-width: 530px){

    }
`
const MenuList = styled.ul`
    grid-area: grid-list;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    list-style: none;
    text-align: center;
    vertical-align: middle;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    transition: 1s all;
    a{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    li{
        display: flex;
    }
    li img{
        height: auto;
        width: 50px;
        @media only screen and (min-width: 2450px){
            width: 110px;
        }
        @media only screen and (min-width: 1650px) amd (max-width: 2200px){
            width: 70px;
        }
    }
    @media only screen and (max-width: 700px){
        display: none;
    }
`
const MenuListText = styled.ul`
    display: none;
    padding-left: 0;
    transition: 1s all;
    a{
        color: white;
        text-decoration: none;
        li{
            text-decoration: none;
            padding: 20px 0;
            border-bottom: 2px solid white;
            width: 90%;
            margin: 0 auto;
        }
        &:last-child{
            li{
                border-bottom: none;
            }
        }
    }
    @media only screen and (max-width: 700px){
        display: block;
        text-decoration: none;
        list-style: none;
        width: 100%;
        margin: 0 auto;
        position: absolute;
        background: black;
        left: 0;
        z-index: -10;
    }
`
const Hamburger = styled.div`
    display: none;
    cursor: pointer;
    transition: .8s all;
    @media only screen and (max-width: 700px){
        display: block;
    }
    position: absolute;
    top: 50%;
    left: 4%;
    transform: translateY(-50%);
    .bar1, .bar2, .bar3{
        width: 34px;
        height: 4px;
        background-color: white;
        margin: 8px 0;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .change .bar1{
        -webkit-transform: rotate(-45deg) translate(-9px, 6px);
        transform: rotate(-45deg) translate(-9px, 6px);
    }
    .change .bar2{
        opacity: 0;
    }
    .change .bar3{
        -webkit-transform: rotate(45deg) translate(-8px -8px);
        transform: rotate(45deg) translate(-8px, -8px);
    }
`
const Cross = styled.div`
    display: none;
    cursor: pointer;
    position: absolute;
    top: 0%;
    left: 4%;
    transition: .8s all;
    transform: translateY(-50%);
    h1{
        font-size: 3.4em;
    }
    @media only screen and (max-width: 700px){
        display: block;
    }
`
export default NavBar;