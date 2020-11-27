import React, { Component } from 'react';
import axios from 'axios';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenjangs:[],
            NIS:'',
            nama_siswa:'',
            jenis_kelamin:'',
            tempat_lahir:'',
            tanggal_lahir:'',
            alamat:'',
            no_telp:'',
            agama:'',
            alert_message: '',
        }
        this.onChangeNamaSiswa = this.onChangeNamaSiswa.bind(this);
        this.onChangeNIS = this.onChangeNIS.bind(this);
        this.onChangeAlamat = this.onChangeAlamat.bind(this);
        this.onChangeTempatLahir = this.onChangeTempatLahir.bind(this);
        this.onChangeTanggalLahir = this.onChangeTanggalLahir.bind(this);
        this.onChangeNoTelp = this.onChangeNoTelp.bind(this);
        this.onChangeJenisKelamin = this.onChangeJenisKelamin.bind(this);
        this.onChangeAgama = this.onChangeAgama.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/siswa/' + this.props.match.params.id).then(response => {
            this.setState({nama_siswa:response.data.nama_siswa});
            this.setState({NIS:response.data.NIS});
            this.setState({nama_siswa:response.data.nama_siswa});
            this.setState({jenis_kelamin:response.data.jenis_kelamin});
            this.setState({tempat_lahir:response.data.tempat_lahir});
            this.setState({tanggal_lahir:response.data.tanggal_lahir});
            this.setState({alamat:response.data.alamat});
            this.setState({no_telp:response.data.no_telp});
            this.setState({agama:response.data.agama});
        });

    }

    onChangeNamaSiswa(e){
        this.setState({
            nama_siswa: e.target.value,
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

    onSubmit(e) {
        e.preventDefault();
        const siswaChange = {
            nama_siswa: this.state.nama_siswa,
            NIS : this.state.NIS,
            jenis_kelamin: this.state.jenis_kelamin,
            tempat_lahir : this.state.tempat_lahir,
            tanggal_lahir : this.state.tanggal_lahir,
            alamat : this.state.alamat,
            no_telp : this.state.no_telp,
            agama : this.state.agama,
        }

        axios.patch('http://127.0.0.1:8000/api/siswa/' + this.props.match.params.id, siswaChange)
            .then(function (response) {
                console.log(response.data);
                this.setState({alert_message : "success"})
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.setState({alert_message : "error"})
            });

        this.setState({
            nama_siswa:'',
            NIS : '',
            jenis_kelamin: '',
            tempat_lahir : '',
            tanggal_lahir : '',
            alamat: '',
            no_telp:'',
            agama:'',
        });
    }


    render() {
        return (
            <div className="container">

                <div className="row">
                    {/*<hr/>*/}
                    {/*{this.state.alert_message === "success"?<SuccessAlert className="form-control" message={"User updated successfully"} />:null}*/}
                    {/*{this.state.alert_message === "error"?<ErrorAlert className="form-control" message={"Error occured while adding user.."}/>:null}*/}

                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="nama_siswa" className="col-lg-6 control-label">NIS</label>
                                <input type="text"
                                       className="form-control"
                                       id="nama_siswa"
                                       value={this.state.nama_siswa}
                                       onChange={this.onChangeNamaSiswa}
                                       placeholder="Enter Nama Siswa"
                                />
                            <label htmlFor="NIS" className="col-lg-6 control-label">NIS</label>
                            <div className="col-lg-12">
                                <input type="text"
                                       className="form-control"
                                       id="NIS"
                                       value={this.state.NIS}
                                       onChange={this.onChangeNIS}
                                       placeholder="Enter NIS"
                                />
                                <label htmlFor="jenis_kelamin" className="col-lg-6 control-label"> Alamat </label>
                                <input type="text"
                                       className="form-control"
                                       id="jenis_kelamin"
                                       value={this.state.jenis_kelamin}
                                       onChange={this.onChangeJenisKelamin}
                                       placeholder="Enter Jenis Kelamin"
                                />
                                <label htmlFor="tempat_lahir" className="col-lg-6 control-label"> Tempat Lahir </label>
                                <input type="text"
                                       className="form-control"
                                       id="tempat_lahir"
                                       value={this.state.tempat_lahir}
                                       onChange={this.onChangeTempatLahir}
                                       placeholder="Enter Tempat Lahir"
                                />
                                <label htmlFor="tanggal_lahir" className="col-lg-6 control-label"> Tanggal Lahir </label>
                                <input type="date"
                                       className="form-control"
                                       id="tanggal_lahir"
                                       value={this.state.tanggal_lahir}
                                       onChange={this.onChangeTanggalLahir}
                                       placeholder="Enter Tanggal Lahir"
                                />
                                <label htmlFor="alamat" className="col-lg-6 control-label"> Alamat </label>
                                <input type="text"
                                       className="form-control"
                                       id="alamat"
                                       value={this.state.alamat}
                                       onChange={this.onChangeAlamat}
                                       placeholder="Enter Alamat"
                                />
                                <label htmlFor="no_telp" className="col-lg-6 control-label"> Nomor Telepon </label>
                                <input type="text"
                                       className="form-control"
                                       id="no_telp"
                                       value={this.state.no_telp}
                                       onChange={this.onChangeNoTelp}
                                       placeholder="Enter Nomor Telepon"
                                />
                                <label htmlFor="agama" className="col-lg-6 control-label"> Agama </label>
                                <select className="form-control" value={this.state.agama}  onChange={this.onChangeAgama}>
                                        <option value={"Islam"}>Islam</option>
                                        <option value={"Kristen"}>Kristen</option>
                                        <option value={"Katolik"}>Katolik</option>
                                        <option value={"Buddha"}>Buddha</option>
                                        <option value={"Hindu"}>Hindu</option>
                                        <option value={"Konghucu"}>Konghucu</option>
                                </select>

                            </div>
                        </div>

                        <div className="col-lg-12">
                            <button type="submit" className="btn btn-primary pull-right">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
