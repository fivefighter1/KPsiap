import React, { Component } from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon} from "mdbreact";
import MultiSelect from "@khanacademy/react-multi-select";
import '../css/scrollbar.css'

export default class EditJenjang extends Component {
    constructor(props){
        super(props);
            this.state={
                tingkat_jenjang:[],
                sekolah:[],
                addTingkatIsActive: false,
                nama_tingkat: '',
                jenjang:'',
                sequence: '',
                jenjang_id:this.props.match.params.id,
                modalEditTingkat: false,
                edit_nama_tingkat:'',
                edit_sequence: '',
                edit_jenjang_id:'',
                change_tingkat_id:'',


            }
            this.onSubmitTambahTingkat = this.onSubmitTambahTingkat.bind(this);
            this.handleAddTingkat = this.handleAddTingkat.bind(this);
            this.onChangeNamaTingkat = this.onChangeNamaTingkat.bind(this);
            this.onChangeSequence = this.onChangeSequence.bind(this);
            this.toggleEditTingkat = this.toggleEditTingkat.bind(this);
            this.changeTingkatID = this.changeTingkatID.bind(this);
            this.onChangeEditNamaTingkat = this.onChangeEditNamaTingkat.bind(this);
            this.onChangeEditSequence = this.onChangeEditSequence.bind(this);


    }

    onChangeNamaTingkat(e){
        this.setState({
            nama_tingkat: e.target.value
        })
    }

    onChangeSequence(e){
        this.setState({
            sequence: e.target.value
        })
    }

    onChangeJenjang(e){
        this.setState({
            jenjang: e.target.value
        })
    }

    onSubmitTambahTingkat(e){
        e.preventDefault();
        const tingkat = {
            nama_tingkat : this.state.nama_tingkat,
            sequence: this.state.sequence,
            jenjang_id : this.state.jenjang_id,
        }

        axios.post('http://127.0.0.1:8000/api/tingkat', tingkat)
            .then(function (response) {
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                // this.setState({alert_message : "error"})
            });

        this.setState({
            nama_tingkat:'',
            sequence:'',
        });
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/tingkat/' + this.props.match.params.id + '/tingkat_jenjang').then(response => {
            this.setState({tingkat_jenjang : response.data})
        })

        axios.get('http://127.0.0.1:8000/api/jenjang/' + this.props.match.params.id).then(response => {
            this.setState({jenjang : response.data})

        })

    }

    handleAddTingkat(e){
        this.setState({
            addTingkatIsActive : true
        })
    }

    toggleEditTingkat(){
        this.setState({
            modalEditTingkat: true,
        })
    }

    getTingkat(id){
        axios.get('http://127.0.0.1:8000/api/tingkat/'+ id ).then(response => {
            this.setState({edit_nama_tingkat :response.data.nama_tingkat});
            this.setState({edit_sequence : response.data.sequence});
            this.setState({edit_jenjang_id: response.data.jenjang_id});
        })
    }

    onSubmitEditTingkat(e){
        e.preventDefault();
        const edit_tingkat = {
            nama_tingkat: this.state.edit_nama_tingkat,
            sequence: this.state.edit_sequence,
            jenjang_id : this.state.edit_jenjang_id,
        }

        axios.patch('http://127.0.0.1:8000/api/tingkat/'+ 1, edit_tingkat)
            .then(function (response) {
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                // this.setState({alert_message : "error"})
            });

        this.setState({
            nama_tingkat:'',
            sequence:'',
        });
    }

    onClickEditTingkat(nama_tingkat,sequence,jenjang_id){
        const edit_tingkat = {
            nama_tingkat: this.state.edit_nama_tingkat,
            sequence: this.state.edit_sequence,
            jenjang_id : this.state.edit_jenjang_id,
        }

        axios.patch('http://127.0.0.1:8000/api/tingkat/'+ this.state.change_tingkat_id, edit_tingkat)
            .then(function (response) {
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                // this.setState({alert_message : "error"})
            });

        this.setState({
            nama_tingkat:'',
            sequence:'',
            change_tingkat_id: '',
        });
    }

    changeTingkatID(id){
        this.setState({
            change_tingkat_id : id
        })

    }

    onChangeEditNamaTingkat(e){
        this.setState({
            edit_nama_tingkat : e.target.value
        })
    }

    onChangeEditSequence(e){
        this.setState({
            edit_sequence: e.target.value
        })
    }


    render(){
        return(
            <MDBContainer>
                <MDBCardGroup deck>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Detail Jenjang : {this.state.tingkat_jenjang.nama_jenjang}</MDBCardTitle>
                            <MDBCardText>

                                {

                                    this.state.tingkat_jenjang.map(tingkat =>{
                                        return(
                                            <ul key={tingkat.id} style={{listStyleType:"none"}}>
                                                <li key={tingkat.id}>
                                                    <label onClick={() => { this.toggleEditTingkat();  this.getTingkat(tingkat.id); this.changeTingkatID(tingkat.id)}}>{tingkat.nama_tingkat}</label>
                                                </li>
                                            </ul>
                                        )
                                    }
                                    )
                                }
                                    <button onClick={this.handleAddTingkat}> Tambah Tingkat </button>
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>
                    {
                        this.state.addTingkatIsActive == true ?(

                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Tambah Tingkat</MDBCardTitle>
                                <MDBCardText>
                                    <div className="container">
                                        <div className="row">
                                            <form className="form-horizontal" onSubmit={this.onSubmitTambahTingkat} style={{width:'100%'}}>
                                                <div className="form-group">
                                                    <label htmlFor="nama_tingkat" className="col-lg-6 control-label">Nama Tingkat </label>
                                                        <div className="col-lg-12">
                                                            <input type="string"
                                                               className="form-control"
                                                               id="nama_tingkat"
                                                               value={this.state.nama_tingkat}
                                                               onChange={this.onChangeNamaTingkat}
                                                               placeholder="Enter Nama Tingkat"
                                                            />
                                    </div>
                                    <label htmlFor="sequence" className="col-lg-6 control-label">Sequence </label>
                                    <div className="col-lg-12">
                                        <input type="text"
                                               className="form-control"
                                               id="sequence"
                                               value={this.state.sequence}
                                               onChange={this.onChangeSequence}
                                               placeholder="Enter Sequence"
                                        />


                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-primary pull-right">Tambah</button>
                                </div>
                            </form>
                            </div>
                            </div>
                        </MDBCardText>
                        </MDBCardBody>

                        </MDBCard>

                        ): null
                    }



                </MDBCardGroup>
                { this.state.modalEditTingkat == true ?(
                    <MDBCardGroup>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle tag="h5">Edit Kelas</MDBCardTitle>
                                <MDBCardText>
                                    <div className="container">
                                        <div className="row">
                                            <form className="form-horizontal" onSubmit={this.onSubmitEditTingkat} style={{width: '100%'}}>
                                                <div className="form-group">
                                                    <label htmlFor="edit_nama_tingkat" className="col-lg-6 control-label">Nama Tingkat </label>
                                                    <div className="col-lg-12">
                                                        <input type="string"
                                                               className="form-control"
                                                               id="edit_nama_tingkat"
                                                               value={this.state.edit_nama_tingkat}
                                                               onChange={this.onChangeEditNamaTingkat}
                                                               placeholder="Enter Nama Tingkat"
                                                        />
                                                    </div>
                                                    <label htmlFor="edit_sequence"
                                                           className="col-lg-6 control-label">Sequence </label>
                                                    <div className="col-lg-12">
                                                        <input type="text"
                                                               className="form-control"
                                                               id="edit_sequence"
                                                               value={this.state.edit_sequence}
                                                               onChange={this.onChangeEditSequence}
                                                               placeholder="Enter Sequence"
                                                        />


                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    {/*<button type="submit" className="btn btn-primary pull-right"> Simpan*/}
                                                    {/*</button> */}
                                                    <button type="submit" className="btn btn-primary pull-right" onClick={this.onClickEditTingkat.bind(this,this.state.edit_nama_tingkat,this.state.edit_sequence,this.state.change_tingkat_id)}> Simpan
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </MDBCardText>
                            </MDBCardBody>

                        </MDBCard>
                    </MDBCardGroup>
                        ):null
                }
            </MDBContainer>
            );
    }
}
