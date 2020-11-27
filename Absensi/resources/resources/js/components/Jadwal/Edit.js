import React, { Component } from 'react';
import axios from 'axios';
import TimeField from 'react-simple-timefield';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon} from "mdbreact";

// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mata_pelajaran_id:'',
            kelas_id:'',
            hari:'',
            waktu_mulai:'',
            waktu_selesai:'',
            alert_message: '',
            mata_pelajaran:[],
            kelas:[],
            modalTambahGuru:false,
            guru:[],
            add_guru_id:'',
            jadwal_id: this.props.match.params.id,
        }
        this.onChangeMataPelajaranID = this.onChangeMataPelajaranID.bind(this);
        this.onChangeKelasID = this. onChangeKelasID.bind(this);
        this.onChangeHari = this.onChangeHari.bind(this);
        this.onChangeWaktuMulai = this.onChangeWaktuMulai.bind(this);
        this.onChangeWaktuSelesai = this.onChangeWaktuSelesai.bind(this);
        this.toggleModalTambahGuru = this.toggleModalTambahGuru.bind(this);
        this.onChangeAddGuru = this.onChangeAddGuru.bind(this);
        this.tambahGuru = this.tambahGuru.bind(this);
        this.changeGuruID = this.changeGuruID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/jadwal/' + this.props.match.params.id).then(response => {
            this.setState({mata_pelajaran_id:response.data.mata_pelajaran_id});
            this.setState({kelas_id:response.data.kelas_id});
            this.setState({hari:response.data.hari});
            this.setState({waktu_mulai:response.data.waktu_mulai});
            this.setState({waktu_selesai:response.data.waktu_selesai});
            console.log(response.data)
        });

        axios.get('http://127.0.0.1:8000/api/kelas').then(response => {
            this.setState({
                kelas:response.data,
            });
        });

        axios.get('http://127.0.0.1:8000/api/mata_pelajaran').then(response => {
            this.setState({
                mata_pelajaran:response.data,
            });
        });

        axios.get('http://127.0.0.1:8000/api/guru').then(response => {
            this.setState({
                guru:response.data,
            })
        })
    }

    onChangeAddGuru(e){
        this.setState({
            add_guru : e.target.value,
        })
    }

    onChangeMataPelajaranID(e){
        this.setState({
            mata_pelajaran_id: e.target.value
        });
    }

    toggleModalTambahGuru(){
        this.setState({
            modalTambahGuru: !this.state.modalTambahGuru,
        })
    }

    onChangeKelasID(e){
        this.setState({
            kelas_id: e.target.value
        });
    }

    onChangeHari(e){
        this.setState({
            hari: e.target.value
        });
    }

    onChangeWaktuMulai(e){
        this.setState({
            waktu_mulai: e.target.value
        });
    }

    onChangeWaktuSelesai(e){
        this.setState({
            waktu_selesai: e.target.value
        });
    }

    changeGuruID(id){
        this.setState({
            add_guru_id: id,
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const jadwalChange = {
            mata_pelajaran_id : this.state.mata_pelajaran_id,
            kelas_id : this.state.kelas_id,
            hari: this.state.hari,
            waktu_mulai:this.state.waktu_mulai,
            waktu_selesai: this.state.waktu_selesai,
        }

        axios.patch('http://127.0.0.1:8000/api/jadwal/' + this.props.match.params.id, jadwalChange)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            })

            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message: "error"})
            });


        this.setState({
            mata_pelajaran_id:'',
            kelas_id:'',
            hari:'',
            waktu_mulai:'',
            waktu_selesai:'',
        });
    }

    tambahGuru(e){
        e.preventDefault();
        const guru_jadwal = {
            user_id: this.state.add_guru_id,
            jadwal_id: this.state.jadwal_id,
            keterangan: 'Kelas Biasa',
        }
        axios.post('http://127.0.0.1:8000/api/guru_jadwal', guru_jadwal)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message: "success"})
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message: "error"})
            });

        this.setState({
            user_id: '',
            jadwal_id: '',
            keterangan: '',
        });
    }

    tambahGuruJadwal(user_id,jadwal_id,keterangan){
        const guru_jadwal = {
            user_id: user_id,
            jadwal_id: jadwal_id,
            keterangan: keterangan,
        }
        axios.post('http://127.0.0.1:8000/api/guru_jadwal', guru_jadwal)
            .then(function (response) {
                // console.log(response.data);
                // this.setState({alert_message: "success"})
            }.bind(this))
            .catch(function (error) {
                // console.log(error);
                // this.setState({alert_message: "error"})
            });

        this.setState({
            user_id: '',
            jadwal_id: '',
            keterangan: '',
        });
    }





    render() {
        return (
            <div className="container">
                <div className="row">
                    {/*<hr/>*/}
                    {/*{this.state.alert_message==="success"?<SuccessAlert message={"Role updated successfully"} />:null}*/}
                    {/*{this.state.alert_message==="error"?<ErrorAlert message={"Error occured while updating role."}/>:null}*/}

                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="kelas_id" className="col-lg-6 control-label">Kelas </label>
                            <select id="kelas_id" className="form-control" selected={this.state.kelas_id} value={this.state.kelas_id} onChange={this.onChangeKelasID}>
                                <option value={null}> Pilih Kelas </option>
                                {
                                    this.state.kelas.map(kelas=>
                                    {
                                        return (
                                            <option key={kelas.id} value={kelas.id} selected={this.state.kelas_id}>{kelas.nama_tingkat}{kelas.nama_kelas}</option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor="mata_pelajaran_id" className="col-lg-6 control-label">Nama Mata Pelajaran</label>
                            <select id="mata_pelajaran_id" className="form-control"  value={this.state.mata_pelajaran_id} onChange={this.onChangeMataPelajaranID}>
                                <option value={null}> Pilih Mata Pelajaran </option>
                                {
                                    this.state.mata_pelajaran.map(mata_pelajaran =>
                                    {
                                        return (
                                            <option key={mata_pelajaran.id} value={mata_pelajaran.id} selected={this.state.mata_pelajaran_id}>{mata_pelajaran.nama_mata_pelajaran}</option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor="hari" className="col-lg-6 control-label"> Hari </label>
                            <select id="hari" className="form-control" value={this.state.hari} onChange={this.onChangeHari} selected={this.state.hari}>
                                <option value="Senin">Senin</option>
                                <option value="Selasa">Selasa</option>
                                <option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option>
                                <option value="Jumat">Jumat</option>
                                <option value="Sabtu">Sabtu</option>
                                <option value="Minggu">Minggu</option>
                            </select>
                            <label htmlFor="waktu_mulai" className="col-lg-6 control-label"> Waktu Mulai </label>
                            <div className="form-group">
                                <TimeField  className="form-control" default={this.state.waktu_mulai}value={this.state.waktu_mulai} onChange={this.onChangeWaktuMulai} />
                            </div>
                            <label htmlFor="waktu_selesai" className="col-lg-6 control-label"> Waktu Selesai </label>
                            <div className="form-group">
                                <TimeField  className="form-control" default={this.state.waktu_selesai} value={this.state.waktu_selesai} onChange={this.onChangeWaktuSelesai} />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <button onClick={this.toggleModalTambahGuru}> Tambah Guru </button>
                        </div>
                        <div className="col-lg-12">
                            <button type="submit" className="btn btn-primary pull-right">Submit</button>
                        </div>
                    </form>
                    {/*MODALITY*/}
                    <MDBContainer>
                        <MDBModal isOpen={this.state.modalTambahGuru} toggle={this.toggleModalTambahGuru}>
                            <MDBModalHeader toggle={this.toggleModalTambahGuru}>Daftar Guru</MDBModalHeader>
                            {/*<form className="form-horizontal" onSubmit={this.tambahGuru} style={{width:'100%'}}>*/}

                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">NIP</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>

                                <tbody>
                            <MDBModalBody>
                                {
                                    this.state.guru.map(guru =>{
                                        return(
                                            <tr key={guru.id}>
                                                <td scope="row"> {guru.nama_guru}</td>
                                                <td scope="row"> {guru.NIP}</td>
                                                {/*<td scope="row"><button type="submit" onClick={this.changeGuruID(guru.id)}>Tambahkan</button></td>*/}
                                                <td scope="row"><button onClick={this.tambahGuruJadwal.bind(this,guru.user_id,this.state.jadwal_id,"Kelas Biasa")}>Tambahkan</button></td>
                                            </tr>
                                        )
                                    })


                                }
                            </MDBModalBody>
                                </tbody>
                            </table>
                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={this.toggleModalTambahGuru}>Close</MDBBtn>
                                <MDBBtn color="primary">Save changes</MDBBtn>
                            </MDBModalFooter>
                            {/*</form>*/}
                        </MDBModal>
                    </MDBContainer>

                </div>
            </div>
        );
    }
}
