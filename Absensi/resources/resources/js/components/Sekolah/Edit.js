import React, { Component } from 'react';
import axios from 'axios';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenjangs:[],
            nama_sekolah: '',
            alamat: '',
            kota:'',
            provinsi:'',
            jenjang_sekolah_id:'',
            alert_message: '',
        }
        this.onChangeNamaSekolah = this.onChangeNamaSekolah.bind(this);
        this.onChangeAlamat = this.onChangeAlamat.bind(this);
        this.onChangeKota = this.onChangeKota.bind(this);
        this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
        this.onChangeJenjangSekolahID = this.onChangeJenjangSekolahID.bind(this);
        // this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/sekolah/' + this.props.match.params.id).then(response => {
            this.setState({nama_sekolah:response.data.nama_sekolah});
            this.setState({alamat:response.data.alamat});
            this.setState({kota:response.data.kota});
            this.setState({provinsi:response.data.provinsi});
            this.setState({jenjang_sekolah_id:response.data.jenjang_sekolah_id});
        });

        axios.get('http://127.0.0.1:8000/api/jenjang').then(response => {
            this.setState({
                jenjangs:response.data,
            });
        });
    }

    onChangeNamaSekolah(e){
        this.setState({
            nama_sekolah: e.target.value
        })
    }

    onChangeAlamat(e){
        this.setState({
            alamat: e.target.value
        })
    }

    onChangeKota(e){
        this.setState({
            kota: e.target.value
        })
    }

    onChangeProvinsi(e){
        this.setState({
            provinsi : e.target.value
        })
    }

    onChangeJenjangSekolahID(e){
        this.setState({
            jenjang_sekolah_id: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const sekolahChange = {
            nama_sekolah : this.state.nama_sekolah,
            alamat: this.state.alamat,
            kota : this.state.kota,
            provinsi : this.state.provinsi,
            jenjang_sekolah_id : this.state.jenjang_sekolah_id,
        }

        axios.patch('http://127.0.0.1:8000/api/sekolah/' + this.props.match.params.id, sekolahChange)
            .then(function (response) {
                console.log(response.data);
                this.setState({alert_message : "success"})
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.setState({alert_message : "error"})
            });

        this.setState({
            nama_sekolah : '',
            alamat: '',
            kota : '',
            provinsi : '',
            jenjang_sekolah_id: '',
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
                            <label htmlFor="nama_sekolah" className="col-lg-6 control-label">Nama Sekolah</label>
                            <div className="col-lg-12">
                                <input type="text"
                                       className="form-control"
                                       id="nama_sekolah"
                                       value={this.state.nama_sekolah}
                                       onChange={this.onChangeNamaSekolah}
                                       placeholder="Enter Nama Sekolah"
                                />
                                <label htmlFor="alamat" className="col-lg-6 control-label"> Alamat </label>
                                <input type="text"
                                       className="form-control"
                                       id="alamat"
                                       value={this.state.alamat}
                                       onChange={this.onChangeAlamat}
                                       placeholder="Enter Alamat"
                                />
                                <label htmlFor="kota" className="col-lg-6 control-label"> Kota </label>
                                <input type="text"
                                       className="form-control"
                                       id="kota"
                                       value={this.state.kota}
                                       onChange={this.onChangeKota}
                                       placeholder="Enter Kota"
                                />
                                <label htmlFor="provinsi" className="col-lg-6 control-label"> Provinsi </label>
                                <input type="text"
                                       className="form-control"
                                       id="provinsi"
                                       value={this.state.provinsi}
                                       onChange={this.onChangeProvinsi}
                                       placeholder="Enter Provinsi"
                                />
                                <label htmlFor="jenjang_sekolah_id" className="col-lg-6 control-label"> Jenjang Sekolah </label>
                                <select className="form-control" value={this.state.jenjang_sekolah_id} onChange={this.onChangeJenjangSekolahID}>
                                    {
                                        this.state.jenjangs.map(jenjang=> {
                                            return (
                                                <option key={jenjang.id} value={jenjang.id}>{jenjang.nama_jenjang}</option>
                                            )
                                        })
                                    }
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
