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
            showMenu: false
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    showMenu(event) {
        event.preventDefault();
        this.setState({showMenu: true}, () => {
            document.addEventListener("click", this.closeMenu);
        });
    }
    closeMenu(event){
        if(!this.dropdownMenu.contains(event.target)){
            this.setState({ showMenu: false},  () => {
                document.removeEventListener("click", this.closeMenu);
            });
        }
    }
    render(){
        return(
            <div>
                <MenuContainer>
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
                        <Hamburger onClick = {this.showMenu}>
                            <div className = "bar1"></div>
                            <div className = "bar2"></div>
                            <div className = "bar3"></div>
                        </Hamburger>
                        { 
                            this.state.showMenu 
                            ? (
                                <div
                                    className = "theMenu"
                                    ref = {(element) => {
                                        this.dropdownMenu = element;
                                    }}
                                >
                                <MenuListText>
                                    <Link to = "/core-topics/coding"><li className = "listElementText"> Coding </li></Link>
                                    <Link to = "/core-topics/2d-design"><li className = "listElementText"> 2D Design </li></Link>
                                    <Link to = "/core-topics/3d-design"><li className = "listElementText"> 3D Design </li></Link>
                                    <Link to = "/core-topics/animation"><li className = "listElementText"> Animation </li></Link>
                                </MenuListText>
                                </div>
                            ) 
                            : ( 
                                null 
                            )
                        }
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
        z-index:1000;
    }
`
const Hamburger = styled.div`
    display: none;
    cursor: pointer;
    @media only screen and (max-width: 700px){
        display: block;
    }
    position: absolute;
    top: 50%;
    left: 4%;
    transform: translateY(-50%);
    .bar1, .bar2, .bar3{
        width: 28px;
        height: 3px;
        background-color: white;
        margin: 6px 0;
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
export default NavBar;