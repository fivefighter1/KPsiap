import React, { Component } from 'react';
import axios from 'axios';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
// import SuccessAlert from "./SuccessAlert";
// import ErrorAlert from "./ErrorAlert";
const sizes = [ "X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large" ];
export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sekolahs:[],
            nama_jenjang: '',
            sekolah_id: '',
        }
        this.onChangeNamaJenjang = this.onChangeNamaJenjang.bind(this);
        this.onChangeSekolahID = this.onChangeSekolahID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChangeNamaJenjang(e){
        this.setState({
            nama_jenjang: e.target.value
        })
    }

    onChangeSekolahID(e){
        this.setState({
            sekolah_id: e.target.value
        })
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/sekolah').then(response => {
            this.setState({
                sekolahs:response.data,
            });
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const jenjang = {
            nama_jenjang : this.state.nama_jenjang,
            sekolah_id: this.state.sekolah_id,
        }

        axios.post('http://127.0.0.1:8000/api/jenjang', jenjang)
            .then(function (response) {
                console.log(response.data);
                // this.setState({alert_message : "success"})
            })
            .catch(function (error) {
                console.log(error);
                // this.setState({alert_message : "error"})
            });

        this.setState({
            nama_jenjang:'',
            sekolah_id:'',
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="form-horizontal" onSubmit={this.onSubmit} style={{width:'100%'}}>
                        <div className="form-group">
                            <label htmlFor="nama_jenjang" className="col-lg-6 control-label">Nama Jenjang </label>
                            <div className="col-lg-12">
                                <input type="text"
                                       className="form-control"
                                       id="nama_jenjang"
                                       value={this.state.nama_jenjang}
                                       onChange={this.onChangeNamaJenjang}
                                       placeholder="Enter Nama Sekolah"
                                />
                                <label htmlFor="sekolah_id" className="col-lg-6 control-label"> Sekolah </label>
                                <select id="sekolah_id" className="form-control"  value={this.state.sekolah_id} onChange={this.onChangeSekolahID}>
                                    {
                                        this.state.sekolahs.map(sekolah=>
                                        {
                                            return (
                                                <option key={sekolah.id} value={sekolah.id}>{sekolah.nama_sekolah}</option>
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
