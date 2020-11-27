import React, { Component } from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';

// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer } from "mdbreact";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenjang_sekolah:[],
            nama_jenjang: '',
            alert_message: '',
        }
        this.onChangeNamaJenjang = this.onChangeNamaJenjang.bind(this);

        // this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/jenjang/' + this.props.match.params.id ).then(response => {
            this.setState({nama_jenjang:response.data});

        });
    }

    onChangeNamaJenjang(e){
        this.setState({
            nama_jenjang: e.target.value
        })
    }

    render() {
        return (
            <MDBContainer>
                <MDBCardGroup deck>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Detail Jenjang</MDBCardTitle>
                            <MDBCardText>

                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCardGroup>
            </MDBContainer>
        );
    }
}

