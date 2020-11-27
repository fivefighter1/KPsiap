import {MDBCard, MDBCardBody, MDBCardGroup, MDBCardTitle, MDBContainer} from "mdbreact";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import axios from 'axios';
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";

export default class Absen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert_message:'',
            jadwal:[],
            finger_print:'',
            searched_finger_print:[],
            keterangan:'',
            jadwal_id :this.props.match.params.id,
            name:'',
            user_id:'',
            role:'',

        }
        this.onChangeFingerPrint = this.onChangeFingerPrint.bind(this);
        this.onChangeKeterangan = this.onChangeKeterangan.bind(this);
    }

    onChangeFingerPrint(e){
        this.setState({
            finger_print: e.target.value,
        })
    }

    getFingerPrint(fingerprint){
        axios.get('http://127.0.0.1:8000/api/fingerprint/' + fingerprint + '/search').then(response =>{
            this.setState({searched_finger_print:response.data});
            console.log(this.state.searched_finger_print)
        });
    }

    // onClickAbsen(fingerprint){
    // }

    // getFingerPrint(fingerprint){
    //     axios.get('http://127.0.0.1:8000/api/fingerprint/' + fingerprint + '/search').then(response =>{
    //         this.setState({name:response.data.name});
    //         this.setState({user_id:response.data.user_id});
    //         this.setState({role:response.data.role});
    //         console.log(this.state.role)
    //         // console.log(this.state.searched_finger_print)
    //     });
    // }

    onClickAddFingerPrint(){
            const absensi = {
                jadwal_id : this.props.match.params.id,
                user_id : this.state.user_id,
                keterangan :this.state.keterangan,
            }
            axios.post('http://127.0.0.1:8000/api/absensi', absensi)
                .then(function (response) {
                    this.setState({alert_message: "success"})
                }.bind(this))
                .catch(function (error) {
                    // this.setState({alert_message: "error"})
                });
            this.setState({
                jadwal_id:'',
                user_id:'',
                keterangan:'',
            })

    }

    onChangeKeterangan(e){
        this.setState({
            keterangan:e.target.value,
        })
    }

    onChangeName(e){
        this.setState({
            name:e.target.value
        })
    }

    onChangeUserID(user_id){
        this.setState({
            user_id: user_id,
        })
    }

    onChangeRole(e){
        this.setState({
            role:e.target.value
        })
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/jadwal/'+ this.props.match.params.id).then(response => {
            this.setState({jadwal: response.data});
        });
    }


    render(){
        return(
            <div className="container" className="scrollbar scrollbar-primary" style={{ maxHeight:"800px", overflowX:"hidden"}} >

                <MDBContainer>
                    {this.state.alert_message==="success"?<SuccessAlert className="form-control" message={"User updated successfully"} />:null}
                    {this.state.alert_message==="error"?<ErrorAlert className="form-control" message={"Error occured while adding user.."}/>:null}

                    <div className={"row>"}>
                        <MDBCardGroup deck className={"col"}>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Input Finger Print</MDBCardTitle>
                                    <input type="text"
                                           value={this.state.finger_print}
                                           onChange={this.onChangeFingerPrint}
                                           className="form-control"
                                           id="finger_print"
                                    />
                                    <select value={this.state.keterangan} onChange={this.onChangeKeterangan}>
                                        <option value={null}>Pilih Keterangan</option>
                                        <option value="Hadir"> Hadir</option>
                                        <option value="Sakit"> Sakit</option>
                                        <option value="Izin"> Izin</option>
                                    </select>

                                    <button onClick={ this.getFingerPrint.bind(this,this.state.finger_print) }> Cari </button>
                                    <button onClick={ this.onClickAddFingerPrint.bind(this) }> Ok </button>
                                </MDBCardBody>
                            </MDBCard>
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Data User</MDBCardTitle>
                                    {
                                        this.state.searched_finger_print.map(fingerprint =>{
                                            return(
                                                <ul key={fingerprint.finger_print_id} style={{listStyleType:"none"}}>
                                                    <li>Nama : {fingerprint.name}</li>
                                                    <li>Role : {fingerprint.role}</li>
                                                    <li>NIS : {fingerprint.NIS}</li>
                                                    <li>User ID : {fingerprint.user_id}</li>

                                                    {/*<li> Kehadiran : {this.state.keterangan}</li>*/}
                                                </ul>

                                            )
                                        })
                                    }
                                    {/*<ul>*/}
                                    {/*    <li> Nama:<label value={this.state.name} onChange={this.onChangeName}/> </li>*/}
                                    {/*    <li> Role:<label value={this.state.role} onChange={this.onChangeRole} /> </li>*/}
                                    {/*    <li> User ID <label value={this.state.user_id} onChange={this.onChangeUserID}/> </li>*/}
                                    {/*</ul>*/}

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCardGroup>
                    </div>
                </MDBContainer>
            </div>
        )
    }

}
