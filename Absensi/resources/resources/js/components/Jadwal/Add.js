import React, { Component } from 'react';
import axios from 'axios';
// import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { TimePicker } from 'antd';


// import TimePicker from 'rc-time-picker';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

import TimeField from 'react-simple-timefield';
export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kelas:[],
            mata_pelajaran:[],
            mata_pelajaran_id: '',
            kelas_id:'',
            hari:'',
            waktu_mulai:'',
            waktu_selesai:'',
        }
        this.onChangeMataPelajaranID = this.onChangeMataPelajaranID.bind(this);
        this.onChangeKelasID = this.onChangeKelasID.bind(this);
        this.onChangeHari = this.onChangeHari.bind(this);
        this.onChangeWaktuMulai = this.onChangeWaktuMulai.bind(this);
        this.onChangeWaktuSelesai = this.onChangeWaktuSelesai.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onChange = this.onChange.bind(this);
    }


    onChangeMataPelajaranID(e){
        this.setState({
            mata_pelajaran_id: e.target.value,
        })
    }

    onChangeKelasID(e){
        this.setState({
            kelas_id: e.target.value,
        })
    }

    onChangeHari(e){
        this.setState({
            hari:e.target.value,
        })
    }

    onChangeWaktuMulai(e){
        this.setState({
            waktu_mulai:e.target.value,
        })
    }

    onChangeWaktuSelesai(e){
        this.setState({
            waktu_selesai:e.target.value,
        })
    }

    componentDidMount() {
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
    }

    //  onChange(value) {
    //     console.log(value && value.format(str));
    // }

    onSubmit(e) {
        e.preventDefault();
        const jadwal = {
            kelas_id: this.state.kelas_id,
            mata_pelajaran_id : this.state.mata_pelajaran_id,
            hari: this.state.hari,
            waktu_mulai: this.state.waktu_mulai,
            waktu_selesai: this.state.waktu_selesai
        }

        axios.post('http://127.0.0.1:8000/api/jadwal', jadwal)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message : "error"})
            });

        this.setState({
            mata_pelajaran_id:'',
            kelas_id:'',
            hari:'',
            waktu_mulai:'',
            waktu_selesai:'',
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="kelas_id" className="col-lg-6 control-label">Kelas </label>
                            <select id="kelas_id" className="form-control"  value={this.state.kelas_id} onChange={this.onChangeKelasID}>
                                <option> Pilih Kelas </option>
                                {
                                    this.state.kelas.map(kelas=>
                                    {
                                        return (
                                            <option key={kelas.id} value={kelas.id}>{kelas.nama_tingkat}{kelas.nama_kelas}</option>
                                        )
                                    })
                                }
                            </select>
                                <label htmlFor="mata_pelajaran_id" className="col-lg-6 control-label"> Mata Pelajaran </label>
                                <select id="mata_pelajaran_id" className="form-control"  value={this.state.mata_pelajaran_id} onChange={this.onChangeMataPelajaranID}>
                                    <option value={null}> Pilih Mata Pelajaran </option>
                                    {
                                        this.state.mata_pelajaran.map(mata_pelajaran =>
                                        {
                                            return (
                                                <option key={mata_pelajaran.id} value={mata_pelajaran.id}>{mata_pelajaran.nama_mata_pelajaran}</option>
                                            )
                                        })
                                    }
                                </select>
                            <label htmlFor="hari" className="col-lg-6 control-label"> Hari </label>
                            <select id="hari" className="form-control" value={this.state.hari} onChange={this.onChangeHari}>
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
                                <TimeField  className="form-control" value={this.state.waktu_mulai} onChange={this.onChangeWaktuMulai} />
                            </div>
                            <label htmlFor="waktu_selesai" className="col-lg-6 control-label"> Waktu Selesai </label>
                            <div className="form-group">
                                <TimeField  className="form-control" value={this.state.waktu_selesai} onChange={this.onChangeWaktuSelesai} />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <button type="submit" className="btn btn-primary pull-right">Submit</button>
                        </div>
                        {/*<TimePicker*/}
                        {/*    style={{ width: 100 }}*/}
                        {/*    showSecond={showSecond}*/}
                        {/*    defaultValue={moment()}*/}
                        {/*    className="form-control"*/}
                        {/*    onChange={this.onChange}*/}
                        {/*/>,*/}
                    </form>
                </div>
            </div>
        );
    }
}
