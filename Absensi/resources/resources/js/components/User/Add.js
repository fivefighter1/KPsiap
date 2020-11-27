import React, { Component } from 'react';
import axios from 'axios';
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer } from "mdbreact";
import '../css/scrollbar.css';


export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles:[],
            name: '',
            email: '',
            username:'',
            password:'',
            role_id:'',
            alert_message: '',
            selected:'',
            // Siswa
            NIS:'',
            nama_siswa:'',
            jenis_kelamin:'',
            tempat_lahir:'',
            tanggal_lahir:'',
            alamat:'',
            no_telp:'',
            agama:'',
            // Guru
            NIP:'',
            nama_guru:'',
            jabatan:'',
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRoleID = this.onChangeRoleID.bind(this);
        this.onChangeNIS = this.onChangeNIS.bind(this);
        this.onChangeJenisKelamin = this.onChangeJenisKelamin.bind(this);
        this.onChangeTempatLahir = this.onChangeTempatLahir.bind(this);
        this.onChangeTanggalLahir = this.onChangeTanggalLahir.bind(this);
        this.onChangeAlamat = this.onChangeAlamat.bind(this);
        this.onChangeNoTelp = this.onChangeNoTelp.bind(this);
        this.onChangeAgama = this.onChangeAgama.bind(this);
        this.onChangeNIP = this.onChangeNIP.bind(this);
        this.onChangeJabatan = this.onChangeJabatan.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    onChangeRoleID(e){
        this.setState({
            role_id: e.target.value,
            selected : e.target.value,
        })
    }

    onChangeNIS(e){
        this.setState({
            NIS: e.target.value,
        })
    }

    onChangeJenisKelamin(e){
        this.setState({
            jenis_kelamin: e.target.value,
        })
    }

    onChangeTempatLahir(e){
        this.setState({
            tempat_lahir: e.target.value,
        })
    }

    onChangeTanggalLahir(e){
        this.setState({
            tanggal_lahir : e.target.value,
        })
    }

    onChangeAlamat(e){
        this.setState({
            alamat: e.target.value,
        })
    }

    onChangeNoTelp(e){
        this.setState({
            no_telp : e.target.value,
        })
    }

    onChangeAgama(e){
        this.setState({
            agama: e.target.value,
        })
    }

    onChangeNIP(e){
        this.setState({
            NIP: e.target.value,
        })
    }

    onChangeJabatan(e){
        this.setState({
            jabatan: e.target.value,
        })
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/role').then(response => {
            this.setState({
                roles:response.data,
            });
        });
    }


    onSubmit(e) {
        if(this.state.selected == 4){
            e.preventDefault();
            const siswa = {
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                role_id: this.state.role_id,
                nama_siswa: this.state.name,
                NIS: this.state.NIS,
                jenis_kelamin: this.state.jenis_kelamin,
                tempat_lahir: this.state.tempat_lahir,
                tanggal_lahir: this.state.tanggal_lahir,
                alamat: this.state.alamat,
                no_telp: this.state.no_telp,
                agama: this.state.agama,
            }
                axios.post('http://127.0.0.1:8000/api/siswa', siswa)
                    .then(function (response) {
                        console.log(response.data);
                        this.setState({alert_message: "success"})
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                        this.setState({alert_message: "error"})
                    });

            this.setState({
                name: '',
                email: '',
                username: '',
                password: '',
                role_id: '',
                selected: '',
                NIS: '',
                jenis_kelamin:'',
                tempat_lahir:'',
                tanggal_lahir:'',
                alamat:'',
                no_telp:'',
                agama:'',
            });
        }
        else if(this.state.selected == 3){
            e.preventDefault();
            const guru = {
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                role_id: this.state.role_id,
                nama_guru: this.state.name,
                NIP: this.state.NIP,
                jenis_kelamin: this.state.jenis_kelamin,
                tempat_lahir: this.state.tempat_lahir,
                tanggal_lahir: this.state.tanggal_lahir,
                no_telp: this.state.no_telp,
                alamat: this.state.alamat,
                jabatan: this.state.jabatan,
                agama: this.state.agama,
            }
            axios.post('http://127.0.0.1:8000/api/guru', guru)
                .then(function (response) {
                    console.log(response.data);
                    this.setState({alert_message: "success"})
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    this.setState({alert_message: "error"})
                });

            this.setState({
                name: '',
                email: '',
                username: '',
                password: '',
                role_id: '',
                selected: '',
                NIS: '',
                jenis_kelamin:'',
                tempat_lahir:'',
                tanggal_lahir:'',
                alamat:'',
                no_telp:'',
                agama:'',
                NIP:'',
                jabatan:'',
            });
        }

        else{
            e.preventDefault();
            const user = {
                name: this.state.name,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                role_id: this.state.role_id,
            }
            axios.post('http://127.0.0.1:8000/api/user', user)
                .then(function (response) {
                    console.log(response.data);
                    this.setState({alert_message: "success"})
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    this.setState({alert_message: "error"})
                });

            this.setState({
                name: '',
                email: '',
                username: '',
                password: '',
                role_id: '',
                selected: '',
            });

        }

    }

    render() {
        return (
            <div className="container" className="scrollbar scrollbar-primary" style={{ maxHeight:"800px", overflowX:"hidden"}} >
    <MDBContainer>
                <div className="row" >
                    {/*<hr/>*/}
                    {this.state.alert_message==="success"?<SuccessAlert className="form-control" message={"User updated successfully"} />:null}
                    {this.state.alert_message==="error"?<ErrorAlert className="form-control" message={"Error occured while adding user.."}/>:null}

                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'90%'}}>
                        <div className="form-group" >
                            <div className="col-lg-8 offset-lg-2" >
                                <div style={{border:"1px solid", marginBottom:"15px", padding:"10px"}}>
                                    <h3> Data Diri </h3>
                            <label htmlFor="name" className="col-lg-6 control-label">Nama </label>
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       value={this.state.name}
                                       onChange={this.onChangeName}
                                       placeholder="Enter Name"
                                />
                                <label htmlFor="email" className="col-lg-6 control-label"> Email </label>
                                <input type="text"
                                       className="form-control"
                                       id="email"
                                       value={this.state.email}
                                       onChange={this.onChangeEmail}
                                       placeholder="Enter Email"
                                />
                                <label htmlFor="username" className="col-lg-6 control-label"> Username </label>
                                <input type="text"
                                       className="form-control"
                                       id="username"
                                       value={this.state.username}
                                       onChange={this.onChangeUsername}
                                       placeholder="Enter Username"
                                />
                                <label htmlFor="password" className="col-lg-6 control-label"> Password </label>
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       value={this.state.password}
                                       onChange={this.onChangePassword}
                                       placeholder="Enter Password"
                                />

                                <label htmlFor="role_id" className="col-lg-6 control-label"> Role </label>
                                <select selected="selected" className="form-control" value={this.state.role_id} onChange={this.onChangeRoleID}>
                                    <option value={null}> Pilih Role</option>
                                {
                                    this.state.roles.map(role=> {
                                        return (
                                                <option key={role.id} value={role.id}>{role.role}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                            </div>
                            {
                                this.state.selected == 4 ? (
                                    <div className="col-lg-8 offset-lg-2" >

                                    <div style={{border:"1px solid", marginBottom:"15px", padding:"10px"}}>
                                        <h3> Data Siswa </h3>

                                    <div className="container" >
                                <div className="row" >
                                    <div className="col-lg-12" >
                                        <label htmlFor="NIS" className="col-lg-6 control-label">NIS </label>
                                        <input type="text"
                                               className="form-control"
                                               id="NIS"
                                               value={this.state.NIS}
                                               onChange={this.onChangeNIS}
                                               placeholder="Enter NIS"
                                        />
                                        <label htmlFor="jenis_kelamin" className="col-lg-6 control-label">Jenis Kelamin </label>
                                        <input type="text"
                                               className="form-control"
                                               id="jenis_kelamin"
                                               value={this.state.jenis_kelamin}
                                               onChange={this.onChangeJenisKelamin}
                                               placeholder="Enter Jenis Kelamin"
                                        />
                                        <label htmlFor="tempat_lahir" className="col-lg-6 control-label">Tempat Lahir </label>
                                        <input type="text"
                                               className="form-control"
                                               id="tempat_lahir"
                                               value={this.state.tempat_lahir}
                                               onChange={this.onChangeTempatLahir}
                                               placeholder="Enter Tempat Lahir"
                                        />
                                        <label htmlFor="tanggal_lahir" className="col-lg-6 control-label">Tanggal Lahir </label>
                                        <input type="date"
                                               className="form-control"
                                               id="tanggal_lahir"
                                               value={this.state.tanggal_lahir}
                                               onChange={this.onChangeTanggalLahir}
                                               placeholder="Enter Tanggal Lahir"
                                        />
                                        <label htmlFor="alamat" className="col-lg-6 control-label">Alamat </label>
                                        <input type="text"
                                               className="form-control"
                                               id="alamat"
                                               value={this.state.alamat}
                                               onChange={this.onChangeAlamat}
                                               placeholder="Enter Alamat"
                                        />
                                        <label htmlFor="no_telp" className="col-lg-6 control-label">Nomor Telepon </label>
                                        <input type="text"
                                               className="form-control"
                                               id="no_telp"
                                               value={this.state.no_telp}
                                               onChange={this.onChangeNoTelp}
                                               placeholder="Enter No Telepon"
                                        />
                                        <label htmlFor="agama" className="col-lg-6 control-label"> Agama </label>
                                        <select className="form-control" value={this.state.agama}  onChange={this.onChangeAgama}>
                                            <option value={null} disabled>Pilih Agama</option>
                                            <option value={"Islam"}>Islam</option>
                                            <option value={"Kristen"}>Kristen</option>
                                            <option value={"Katolik"}>Katolik</option>
                                            <option value={"Buddha"}>Buddha</option>
                                            <option value={"Hindu"}>Hindu</option>
                                            <option value={"Konghucu"}>Konghucu</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                                ): this.state.selected == 3 ?(
                                    <div className="col-lg-8 offset-lg-2" >
                                        <div style={{border:"1px solid", marginBottom:"15px", padding:"10px"}}>
                                            <h3> Data Guru </h3>
                                            <div className="container" >
                                        <div className="row"  >
                                            <div className="col-lg-12"  >

                                                <label htmlFor="NIP" className="col-lg-6 control-label">NIP </label>
                                                <input type="text"
                                                       className="form-control"
                                                       id="NIP"
                                                       value={this.state.NIP}
                                                       onChange={this.onChangeNIP}
                                                       placeholder="Enter NIP"
                                                />
                                                <label htmlFor="jenis_kelamin" className="col-lg-6 control-label">Jenis Kelamin </label>
                                                <input type="text"
                                                       className="form-control"
                                                       id="jenis_kelamin"
                                                       value={this.state.jenis_kelamin}
                                                       onChange={this.onChangeJenisKelamin}
                                                       placeholder="Enter Jenis Kelamin"
                                                />
                                                <label htmlFor="tempat_lahir" className="col-lg-6 control-label">Tempat Lahir </label>
                                                <input type="text"
                                                       className="form-control"
                                                       id="tempat_lahir"
                                                       value={this.state.tempat_lahir}
                                                       onChange={this.onChangeTempatLahir}
                                                       placeholder="Enter Tempat Lahir"
                                                />
                                                <label htmlFor="tanggal_lahir" className="col-lg-6 control-label">Tanggal Lahir </label>
                                                <input type="date"
                                                       className="form-control"
                                                       id="tanggal_lahir"
                                                       value={this.state.tanggal_lahir}
                                                       onChange={this.onChangeTanggalLahir}
                                                       placeholder="Enter Tanggal Lahir"
                                                />
                                                <label htmlFor="no_telp" className="col-lg-6 control-label">Nomor Telepon </label>
                                                <input type="text"
                                                       className="form-control"
                                                       id="no_telp"
                                                       value={this.state.no_telp}
                                                       onChange={this.onChangeNoTelp}
                                                       placeholder="Enter No Telepon"
                                                />
                                                <label htmlFor="alamat" className="col-lg-6 control-label">Alamat </label>
                                                <input type="text"
                                                       className="form-control"
                                                       id="alamat"
                                                       value={this.state.alamat}
                                                       onChange={this.onChangeAlamat}
                                                       placeholder="Enter Alamat"
                                                />
                                                <label htmlFor="jabatan" className="col-lg-6 control-label">Jabatan </label>
                                                <input type="text"
                                                       className="form-control"
                                                       id="jabatan"
                                                       value={this.state.jabatan}
                                                       onChange={this.onChangeJabatan}
                                                       placeholder="Enter Jabatan"
                                                />
                                                <label htmlFor="agama" className="col-lg-6 control-label"> Agama </label>
                                                <select className="form-control" value={this.state.agama} onChange={this.onChangeAgama}>
                                                    <option value={null} disabled>Pilih Agama</option>
                                                    <option value={"Islam"}>Islam</option>
                                                    <option value={"Kristen"}>Kristen</option>
                                                    <option value={"Katolik"}>Katolik</option>
                                                    <option value={"Buddha"}>Buddha</option>
                                                    <option value={"Hindu"}>Hindu</option>
                                                    <option value={"Konghucu"}>Konghucu</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>

                                ) : null
                            }
                        </div>
                        <div className="col-lg-8 offset-lg-2">
                            <button  type="submit" className="btn btn-primary pull-right">Submit</button>
                        </div>
                    </form>
                </div>
    </MDBContainer>
            </div>
        );
    }
}
