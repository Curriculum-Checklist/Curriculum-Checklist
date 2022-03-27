import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    height: 40px;
    width: 50px;

    font-size: 11px;
    cursor: pointer;
    color: white;

    background-color: transparent;
    border-style: solid;
    border-color: red;
    border-radius: 10px;

    &:hover {
        background-color: gray;
        color: white;
    }
    `

export default class StatusButton extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            buttonText: "Not Taken",
        }
    }

    handleClick = () => {

            let buttonText = this.state.buttonText; 

            if (buttonText === "Not Taken") buttonText = "Taking";
            else if (buttonText === "Taking") buttonText = "Taken";
            else if (buttonText === "Taken") buttonText = "Not Taken";

            this.setState({buttonText: buttonText})
    }
    render(){
    return (
        <Button onClick={this.handleClick}>{this.state.buttonText}</Button>
    )
    }
  }