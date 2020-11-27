import React, { Component } from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';

import MultiSelect from "@khanacademy/react-multi-select";
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer } from "mdbreact";

export default class JenjangDetail extends Component {
    constructor(props){
    super(props)
    this.state = {
        isActive: false,
    }
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    }

    handleShow(e){
        this.setState({isActive: true})
    }

    handleHide(e){
        this.setState({
            isActive: false})
    }

    render() {

        if (this.state.isActive) {
            return (
                <div>
                    <h1>Hello react</h1>
                    <button onClick={this.handleHide}>Hide</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.handleShow}>Show</button>
                </div>
            );
        }


    }
}

