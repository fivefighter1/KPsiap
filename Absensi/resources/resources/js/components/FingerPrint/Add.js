import React, { Component } from 'react';
import axios from 'axios';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            strength: '',
            alert_message: '',
            listSiswa:[],
            listGuru:[],
            siswa: '',
            guru:'',
            finger_print_siswa:'',
            keterangan_siswa:'',
            finger_print_guru:'',
            keterangan_guru:'',
            addSiswaIsActive:false,
            addGuruIsActive:false,
            addSelected:'',
        }

        this.onChangeSiswa = this.onChangeSiswa.bind(this);
        this.onChangeGuru = this.onChangeGuru.bind(this);
        this.onChangeFingerPrintSiswa = this.onChangeFingerPrintSiswa.bind(this);
        this.onChangeKeteranganSiswa = this.onChangeKeteranganSiswa.bind(this);
        this.onChangeFingerPrintGuru = this.onChangeFingerPrintGuru.bind(this);
        this.onChangeKeteranganGuru = this.onChangeKeteranganGuru.bind(this);
        this.onSubmitAddFingerPrintSiswa = this.onSubmitAddFingerPrintSiswa.bind(this);
        this.onChangeAddSelected = this.onChangeAddSelected.bind(this);
        this.onSubmitAddFingerPrintGuru = this.onSubmitAddFingerPrintGuru.bind(this);
    }

    handleAddSiswaIsActive(){
        this.setState({
            addSiswaIsActive: true,
        })
    }

    handleAddGuruIsActive(){
        this.setState({
            addGuruIsActive:true,
        })
    }

    onChangeSiswa(e){
        this.setState({
            siswa:e.target.value,
        })
    }

    onChangeGuru(e){
        this.setState({
            guru:e.target.value,
        })
    }

    onChangeFingerPrintSiswa(e){
        this.setState({
            finger_print_siswa: e.target.value
        });
    }

    onChangeKeteranganSiswa(e){
        this.setState({
            keterangan_siswa: e.target.value
        });
    }
    onChangeFingerPrintGuru(e){
        this.setState({
            finger_print_guru: e.target.value
        });
    }

    onChangeKeteranganGuru(e){
        this.setState({
            keterangan_guru: e.target.value
        });
    }

    onSubmitAddFingerPrintSiswa(e) {
        e.preventDefault();
        const add_finger_print_siswa = {
            user_id: this.state.siswa,
            fingerprint: this.state.finger_print_siswa,
            keterangan: this.state.keterangan_siswa,
        }

        axios.post('http://127.0.0.1:8000/api/fingerprint', add_finger_print_siswa)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            }.bind(this))
            .catch(function (error) {
                // console.log(error);
                // this.setState({alert_message : "error"})
            });

        this.setState({
            user_id: '',
            fingerprint:'',
            keterangan:'',
        });
    }

    onSubmitAddFingerPrintGuru(e) {
        e.preventDefault();
        const add_finger_print_guru = {
            user_id: this.state.guru,
            fingerprint: this.state.finger_print_guru,
            keterangan: this.state.keterangan_guru,
        }

        axios.post('http://127.0.0.1:8000/api/fingerprint', add_finger_print_guru)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            }.bind(this))
            .catch(function (error) {
                // console.log(error);
                // this.setState({alert_message : "error"})
            });

        this.setState({
            user_id: '',
            fingerprint:'',
            keterangan:'',
        });
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/siswa').then(response => {
            this.setState({listSiswa: response.data});
        });

        axios.get('http://127.0.0.1:8000/api/guru').then(response => {
            this.setState({listGuru: response.data});
        });

    }

    onChangeAddSelected(e)
    {
        this.setState({
            addSelected:e.target.value,
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Tambah Finger Print</h3>
                <select value={this.state.addSelected} onChange={this.onChangeAddSelected} className="form-control">
                    <option value={null}> Pilih Role </option>
                    <option value="Guru">Guru</option>
                    <option value="Siswa"> Siswa</option>
                </select>

                <div className="row">
                    {/*<hr/>*/}
                    {/*{this.state.alert_message==="success"?<SuccessAlert message={"Role updated successfully"} />:null}*/}
                    {/*{this.state.alert_message==="error"?<ErrorAlert message={"Error occured while adding role.."}/>:null}*/}
                    {
                        this.state.addSelected == "Siswa" ? (
                            <form className="form-horizontal" onSubmit={this.onSubmitAddFingerPrintSiswa}
                                  style={{width: '100%'}}>
                                <div className="form-group">
                                    <label htmlFor="siswa" className="col-lg-6 control-label"> Siswa </label>
                                    <div className="col-lg-12">

                                    <select value={this.state.siswa} onChange={this.onChangeSiswa}
                                            className="form-control">
                                        <option> Pilih Siswa</option>
                                        {
                                            this.state.listSiswa.map(siswa => {
                                                return (
                                                    <option key={siswa.user_id}
                                                            value={siswa.user_id}>{siswa.nama_siswa}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    </div>
                                    <label htmlFor="finger_print_siswa" className="col-lg-6 control-label">Finger
                                        Print </label>
                                    <div className="col-lg-12">
                                        <input type="text"
                                               className="form-control"
                                               id="finger_print_siswa"
                                               value={this.state.finger_print_siswa}
                                               onChange={this.onChangeFingerPrintSiswa}
                                               placeholder="Enter Finger Print"
                                        />
                                        <label htmlFor="keterangan"
                                               className="col-lg-6 control-label"> Keterangan </label>
                                        <select value={this.state.keterangan_siswa}
                                                onChange={this.onChangeKeteranganSiswa} className="form-control">
                                            <option value={null}> Pilih Keterangan</option>
                                            <option value="Jempol Kanan"> Jempol Kanan</option>
                                            <option value="Telunjuk Kanan"> Telunjuk Kanan</option>
                                            <option value="Jari Tengah Kanan"> Jari Tengah Kanan</option>
                                            <option value="Jari Manis Kanan"> Jari Manis Kanan</option>
                                            <option value="Kelingking Kanan"> Kelingking Kanan</option>
                                            <option value="Jempol Kiri"> Jempol Kiri</option>
                                            <option value="Telunjuk Kiri"> Telunjuk Kiri</option>
                                            <option value="Jari Tengah Kiri"> Jari Tengah Kiri</option>
                                            <option value="Jari Manis Kiri"> Jari Manis Kiri</option>
                                            <option value="Kelingking Kiri"> Kelingking Kiri</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-primary pull-right">Submit</button>
                                </div>
                            </form>
                        ) : this.state.addSelected == "Guru" ? (
                            <form className="form-horizontal" onSubmit={this.onSubmitAddFingerPrintGuru} style={{width: '100%'}}>
                                <div className="form-group">

                                    <label htmlFor="guru" className="col-lg-6 control-label"> Guru </label>
                                    <div className="col-lg-12">

                                    <select value={this.state.guru} onChange={this.onChangeGuru}
                                            className="form-control">
                                        <option> Pilih Guru</option>
                                        {
                                            this.state.listGuru.map(guru => {
                                                return (
                                                    <option key={guru.user_id} value={guru.user_id}>{guru.nama_guru}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    </div>
                                    <label htmlFor="finger_print_guru" className="col-lg-6 control-label">Finger Print </label>
                                    <div className="col-lg-12">
                                        <input type="text"
                                               className="form-control"
                                               id="finger_print_guru"
                                               value={this.state.finger_print_guru}
                                               onChange={this.onChangeFingerPrintGuru}
                                               placeholder="Enter Finger Print"
                                        />
                                        <label htmlFor="keterangan"
                                               className="col-lg-6 control-label"> Keterangan </label>
                                        <select value={this.state.keterangan_guru} onChange={this.onChangeKeteranganGuru} className="form-control">
                                            <option value={null}> Pilih Keterangan</option>
                                            <option value="Jempol Kanan"> Jempol Kanan</option>
                                            <option value="Telunjuk Kanan"> Telunjuk Kanan</option>
                                            <option value="Jari Tengah Kanan"> Jari Tengah Kanan</option>
                                            <option value="Jari Manis Kanan"> Jari Manis Kanan</option>
                                            <option value="Kelingking Kanan"> Kelingking Kanan</option>
                                            <option value="Jempol Kiri"> Jempol Kiri</option>
                                            <option value="Telunjuk Kiri"> Telunjuk Kiri</option>
                                            <option value="Jari Tengah Kiri"> Jari Tengah Kiri</option>
                                            <option value="Jari Manis Kiri"> Jari Manis Kiri</option>
                                            <option value="Kelingking Kiri"> Kelingking Kiri</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-primary pull-right">Submit</button>
                                </div>
                            </form>

                        ):null
                    }
                </div>
            </div>
        );
    }
}
