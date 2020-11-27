import {MDBCard, MDBCardBody, MDBCardGroup, MDBCardTitle, MDBContainer} from "mdbreact";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import axios from 'axios';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fingerprints:[],
            search_finger_print:'',
            searched_finger_print:[],
        }
        this.onChangeSearchFingerPrint = this.onChangeSearchFingerPrint.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/fingerprint').then(response => {
            this.setState({fingerprints: response.data});
        });
    }

    onChangeSearchFingerPrint(e){
        this.setState({
            search_finger_print: e.target.value,
        })
    }

    onClickSearchFingerPrint(fingerprint){
        axios.get('http://127.0.0.1:8000/api/fingerprint/' + fingerprint + '/search').then(response =>{
            this.setState({
                searched_finger_print: response.data,
            })
            console.log(this.state.searched_finger_print)
        })
    }

render(){
        return(
            <div className="container" className="scrollbar scrollbar-primary" style={{ maxHeight:"800px", overflowX:"hidden"}} >

                <MDBContainer>
                    <div className={"row>"}>
                        <MDBCardGroup deck className={"col"}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Cari Finger Print</MDBCardTitle>
                                 <input type="text"
                                        value={this.state.search_finger_print}
                                        onChange={this.onChangeSearchFingerPrint}
                                        className="form-control"
                                        id="search_finger_print"/>
                                        <button onClick={this.onClickSearchFingerPrint.bind(this,this.state.search_finger_print)}> Search</button>
                                </MDBCardBody>
                            </MDBCard>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Data User</MDBCardTitle>
                                    {
                                        this.state.searched_finger_print.map(fingerprint =>{
                                            return(
                                                <ul key={fingerprint.id} style={{listStyleType:"none"}}>
                                                    <li>Nama : {fingerprint.name}</li>
                                                    <li>Role : {fingerprint.role}</li>
                                                    <li>NIP : {fingerprint.NIP}</li>
                                                </ul>

                                                )
                                        })
                                    }

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardGroup>
                    </div>
                </MDBContainer>
            </div>
        )
}

}
