import React, { Component } from 'react';
import axios from 'axios';
import MultiSelect from "@khanacademy/react-multi-select";
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";

const jenjang = [
    {label: "Taman Kanak-Kanak", value: "Taman Kanak-Kanak"},
    {label: "Sekolah Dasar", value: "Sekolah Dasar"},
    {label: "Sekolah Menengah Pertama", value: "Sekolah Menengah Pertama"},
    {label: "Sekolah Menengah Atas", value: "Sekolah Menengah Atas"},
    {label: "Penyetaraan", value: "Penyetaraan"},
];
export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenjangs:[],
            nama_sekolah: '',
            alamat: '',
            kota:'',
            provinsi:'',
            jenjang_sekolah:[],
            // jenjang_sekolah_grup:[],
            alert_message: '',
            value:[],
            selected:[],
            jenjang:["Taman Kanak-Kanak","Sekolah Dasar","Sekolah Menengah Pertama","Sekolah Menengah Atas","Penyetaraan"],
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeNamaSekolah = this.onChangeNamaSekolah.bind(this);
        this.onChangeAlamat = this.onChangeAlamat.bind(this);
        this.onChangeKota = this.onChangeKota.bind(this);
        this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeValue(e){
        this.setState({
            value: e.target.value
        })
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

        // this.setState({jenjang_sekolah: e.target.value});
        // const jenjang_sekolah_grup = this.state.jenjang_sekolah_grup;
        // jenjang_sekolah_grup[i] = e.target.value;
        // this.setState({jenjang_sekolah_grup});


    onSubmit(e) {
        e.preventDefault();
        const sekolah = {
            nama_sekolah : this.state.nama_sekolah,
            alamat: this.state.alamat,
            kota : this.state.kota,
            provinsi : this.state.provinsi,
            jenjang_sekolah : this.state.jenjang_sekolah,
        }
        axios.post('http://127.0.0.1:8000/api/sekolah', sekolah)
            .then(function (response) {
                console.log(response);
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message : "error"})
            });

        this.setState({
            nama_sekolah : '',
            alamat: '',
            kota : '',
            provinsi : '',
            jenjang_sekolah : '',
        });
    }

    // renderJenjangSekolah =(jenjang_sekolah, i) => {
    //     return(
    //         <div>
    //             <input
    //                 onBlur={ this.saveModule }
    //                 value={ jenjang_sekolah.value}
    //                 onChange={ this.onChangeJenjangSekolah }
    //             />
    //         </div>
    //     )
    // }

    render() {
        return (

        <div className="container">
                <div className="row">
                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="nama_sekolah" className="col-lg-6 control-label">Nama Sekolah </label>
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

                                {/*<label className="col-lg-6 control-label"> Jenjang </label>*/}
                                {/*<MultiSelect*/}
                                {/*    className="form-control"*/}
                                {/*items={this.state.jenjang}/>*/}

                                {/*<label htmlFor="jenjang" className="col-lg-6 control-label"> Jenjang </label>*/}


                                {/*<label htmlFor="jenjang" className="col-lg-6 control-label"> Jenjang </label>*/}
                                {/*<select id="jenjang_sekolah_id" className="form-control" multiple value={this.state.jenjang_sekolah_grup} onChange={(e) => this.onChangeJenjangSekolah(e, i)}>*/}
                                {/*<select id="jenjang_sekolah_id" className="form-control" multiple  onChange={this.onChangeJenjangSekolah}>*/}
                                {/*        <option value={"Taman Kanak-Kanak"}>Taman Kanak-Kanak</option>*/}
                                {/*        <option value={"Sekolah Dasar"}>Sekolah Dasar</option>*/}
                                {/*        <option value={"Sekolah Menengah Pertama"}>Sekolah Menengah Pertama</option>*/}
                                {/*        <option value={"Sekolah Menengah Atas"}>Sekolah Menengah Atas</option>*/}
                                {/*        <option value={"Penyetaraan"}>Penyetaraan</option>*/}
                                {/*</select>*/}

                                {/*<label htmlFor="jenjang_sekolah_id" className="col-lg-6 control-label"> Jenjang </label>*/}
                                {/*<select id="jenjang_sekolah_id" className="form-control selectpicker" multiple value={this.state.jenjang_sekolah_id} onChange={this.onChangeJenjangSekolahID}>*/}
                                {/*    {*/}
                                {/*        this.state.jenjangs.map(jenjang=> {*/}
                                {/*            return (*/}
                                {/*                <option key={jenjang.id} value={jenjang.id}>{jenjang.nama_jenjang}</option>*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</select>*/}
                                {/*<label htmlFor="jenjang_sekolah_id" className="col-lg-6 control-label"> Jenjang </label>*/}
                                {/*<select className="col-lg-6 form-control" multiple data={sizes} onChange={this.onChangeJenjangSekolahID}>*/}
                                {/*</select>*/}

                                <label className="col-lg-6 control-label"> Jenjang </label>
                                <MultiSelect
                                    selectSomeItems={"Jenjang"}
                                    options={jenjang}
                                    selected={this.state.jenjang_sekolah}
                                    onSelectedChanged={jenjang_sekolah => this.setState({jenjang_sekolah})}
                                />
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
