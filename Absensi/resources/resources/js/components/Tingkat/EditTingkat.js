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
            kelas_tingkat:[],
            tingkat:'',
            tahun_ajarans:[],
            addKelasIsActive : false,
            nama_kelas:'',
            tahun_ajaran:'',
            tingkat_id : this.props.match.params.id,
            editKelasIsActive: false,
            edit_nama_kelas:'',
            edit_tahun_ajaran_id:'',
            edit_tingkat_id:'',
            change_kelas_id:'',

        }
        this.handleAddKelas = this.handleAddKelas.bind(this);
        this.onChangeNamaKelas = this.onChangeNamaKelas.bind(this);
        this.onChangeTahunAjaran = this.onChangeTahunAjaran.bind(this);
        this.onSubmitTambahKelas = this.onSubmitTambahKelas.bind(this);
        this.onChangeEditNamaKelas = this.onChangeEditNamaKelas.bind(this);
        this.onChangeEditTahunAjaran = this.onChangeEditTahunAjaran.bind(this);
        this.handleEditKelasActive = this.handleEditKelasActive.bind(this);
        this.getKelas = this.getKelas.bind(this);
        this.changeKelasID = this.changeKelasID.bind(this);

    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/kelas/' + this.props.match.params.id + '/kelas_tingkat').then(response => {
            this.setState({kelas_tingkat : response.data})
        })

        axios.get('http://127.0.0.1:8000/api/tingkat/' + this.props.match.params.id).then(response => {
            this.setState({tingkat : response.data})

        })

        axios.get('http://127.0.0.1:8000/api/tahun_ajaran').then(response =>{
            this.setState({tahun_ajarans:response.data})
        })

    }

    handleAddKelas(e){
        this.setState({
            addKelasIsActive : true
        })
    }

    onChangeNamaKelas(e){
        this.setState({
            nama_kelas : e.target.value
        })
    }

    onChangeTahunAjaran(e){
        this.setState({
            tahun_ajaran: e.target.value
        })
    }

    onSubmitTambahKelas(e){
        e.preventDefault();
        const kelas = {
            nama_kelas : this.state.nama_kelas,
            tahun_ajaran_id: this.state.tahun_ajaran,
            tingkat_id : this.state.tingkat_id,
        }

        axios.post('http://127.0.0.1:8000/api/kelas', kelas)
            .then(function (response) {
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                // this.setState({alert_message : "error"})
            });

        this.setState({
            nama_kelas:'',
            tahun_ajaran:'',
        });
    }

    handleEditKelasActive(e){
        this.setState({
            editKelasIsActive: true,
        })
    }

    onChangeEditNamaKelas(e){
        this.setState({
            edit_nama_kelas: e.target.value,
        })
    }

    onChangeEditTahunAjaran(e){
        this.setState({
            edit_tahun_ajaran_id: e.target.value,
        })
    }

    changeKelasID(id){
        this.setState({
            change_kelas_id : id
        })

    }

    getKelas(id){
        axios.get('http://127.0.0.1:8000/api/kelas/'+ id ).then(response => {
            this.setState({edit_nama_kelas :response.data.nama_kelas});
            this.setState({edit_tahun_ajaran_id : response.data.tahun_ajaran_id});
            this.setState({edit_tingkat_id: response.data.tingkat_id});
        })
    }

    onClickEditKelas(){
        const edit_kelas = {
            nama_kelas: this.state.edit_nama_kelas,
            tahun_ajaran_id: this.state.edit_tahun_ajaran_id,
            tingkat_id : this.state.edit_tingkat_id,
        }

        axios.patch('http://127.0.0.1:8000/api/kelas/'+ this.state.change_kelas_id, edit_kelas)
            .then(function (response) {
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                // this.setState({alert_message : "error"})
            });

        this.setState({
            nama_kelas:'',
            tahun_ajaran:'',
        });
    }



    render(){
        return(
            <MDBContainer>
                <MDBCardGroup deck>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Detail Tingkat : {this.state.tingkat.nama_tingkat}</MDBCardTitle>
                            <MDBCardText>
                                {
                                    this.state.kelas_tingkat.map(kelas =>{
                                            return(
                                                <ul key={kelas.id} style={{listStyleType:"none"}}>
                                                    <li >
                                                        <label onClick={() => { this.handleEditKelasActive();  this.getKelas(kelas.id); this.changeKelasID(kelas.id)}} >{kelas.nama_kelas}</label>
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    )
                                }
                                <button onClick={this.handleAddKelas}> Tambah Kelas </button>
                            </MDBCardText>
                        </MDBCardBody>

                    </MDBCard>

                    {
                        this.state.addKelasIsActive == true ?(
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Tambah Kelas</MDBCardTitle>
                                    <MDBCardText>
                                        <div className="container">
                                            <div className="row">
                                                <form className="form-horizontal" onSubmit={this.onSubmitTambahKelas} style={{width:'100%'}}>
                                                    <div className="form-group">
                                                        <label htmlFor="nama_kelas" className="col-lg-6 control-label">Nama Kelas </label>
                                                        <div className="col-lg-12">
                                                            <input type="string"
                                                                   className="form-control"
                                                                   id="nama_kelas"
                                                                   value={this.state.nama_kelas}
                                                                   onChange={this.onChangeNamaKelas}
                                                                   placeholder="Enter Nama Kelas"
                                                            />
                                                        </div>
                                                        <label htmlFor="sequence" className="col-lg-6 control-label">Tahun Ajaran </label>
                                                        <div className="col-lg-12">
                                                        <select className="form-control" value={this.state.tahun_ajaran} onChange={this.onChangeTahunAjaran}>
                                                            <option value={null}> Pilih Tahun Ajaran </option>
                                                            {
                                                                this.state.tahun_ajarans.map(tahun_ajaran=> {
                                                                    return (
                                                                        <option key={tahun_ajaran.id} value={tahun_ajaran.id}>{tahun_ajaran.tahun_ajaran}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
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
                { this.state.editKelasIsActive == true ?(
                    <MDBCardGroup>
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle tag="h5">Edit Kelas</MDBCardTitle>
                                <MDBCardText>
                                    <div className="container">
                                        <div className="row">
                                            <form className="form-horizontal" style={{width: '100%'}}>
                                                <div className="form-group">
                                                    <label htmlFor="edit_nama_kelas" className="col-lg-6 control-label">Nama Kelas </label>
                                                    <div className="col-lg-12">
                                                        <input type="string"
                                                               className="form-control"
                                                               id="edit_nama_kelas"
                                                               value={this.state.edit_nama_kelas}
                                                               onChange={this.onChangeEditNamaKelas}
                                                               placeholder="Enter Nama Kelas"
                                                        />
                                                    </div>
                                                    <label htmlFor="edit_tahun_ajaran" className="col-lg-6 control-label">Tahun Ajaran </label>
                                                    <div className="col-lg-12">
                                                        <select className="form-control" value={this.state.edit_tahun_ajaran_id} onChange={this.onChangeEditTahunAjaran}>
                                                            <option value={null}> Pilih Tahun Ajaran </option>
                                                            {
                                                                this.state.tahun_ajarans.map(tahun_ajaran=> {
                                                                    return (
                                                                        <option key={tahun_ajaran.id} value={tahun_ajaran.id} selected={this.state.edit_tahun_ajaran}>{tahun_ajaran.tahun_ajaran}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>



                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    {/*<button type="submit" className="btn btn-primary pull-right"> Simpan*/}
                                                    {/*</button>*/}
                                                    <button type="submit" className="btn btn-primary pull-right" onClick={this.onClickEditKelas.bind(this)}> Simpan
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
