import React, { Component } from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';
import JenjangDetail from './JenjangDetail'
import MultiSelect from "@khanacademy/react-multi-select";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon} from "mdbreact";
import EditJenjang from "../Jenjang/EditJenjang";
import '../css/scrollbar.css'


const jenjang = [
    {label: "Taman Kanak-Kanak", value: "Taman Kanak-Kanak"},
    {label: "Sekolah Dasar", value: "Sekolah Dasar"},
    {label: "Sekolah Menengah Pertama", value: "Sekolah Menengah Pertama"},
    {label: "Sekolah Menengah Atas", value: "Sekolah Menengah Atas"},
    {label: "Penyetaraan", value: "Penyetaraan"},
];

export default class SekolahDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jenjang_sekolah: [],
            nama_sekolah: '',
            alamat: '',
            kota: '',
            provinsi: '',
            nama_jenjang: '',
            alert_message: '',
            tingkatIsActive: false,
            kelasIsActive: false,
            tingkat_jenjang: [],
            kelas_tingkat: [],
            tahun_ajaran: '',
            tahun_ajarans: [],
            listSiswas: [],
            modalSiswa: false,
            siswaKelasIsActive: false,
            siswa_kelas: [],
            tabIsActive: false,
            jadwal_kelas: [],
            modalEditJenjang: false,
            kelas_id: '',
            nama_jenjangg:'',
            current_tingkat:'',
            kelass:'',
            guru_sekolahs:'',
            modalGuru:false,
            listGurus:[],
            sekolah_id: this.props.match.params.id,
            gurus:[],
            t:[],
        }

        this.onChangeNamaSekolah = this.onChangeNamaSekolah.bind(this);
        this.onChangeAlamat = this.onChangeAlamat.bind(this);
        this.onChangeKota = this.onChangeKota.bind(this);
        this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
        this.onChangeJenjangSekolah = this.onChangeJenjangSekolah.bind(this);
        this.changeJenjangID = this.changeJenjangID.bind(this);
        this.getTingkat = this.getTingkat.bind(this);
        this.handleHideTingkat = this.handleHideTingkat.bind(this);
        this.handleShowTingkat = this.handleShowTingkat.bind(this);
        this.getKelas = this.getKelas.bind(this);
        this.handleShowKelas = this.handleShowKelas.bind(this);
        this.handleHideKelas = this.handleHideKelas.bind(this);
        this.onChangeTahunAjaran = this.onChangeTahunAjaran.bind(this);
        this.toggleModalSiswa = this.toggleModalSiswa.bind(this);
        this.handleShowSiswaKelas = this.handleShowSiswaKelas.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.getSiswaKelas = this.getSiswaKelas.bind(this);
        this.getJadwalKelas = this.getJadwalKelas.bind(this);
        this.toggleModalEditJenjang = this.toggleModalEditJenjang.bind(this);
        this.onChangeListSiswa = this.onChangeListSiswa.bind(this);
        this.toggleModalGuru = this.toggleModalGuru.bind(this);

        // this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/sekolah/' + this.props.match.params.id).then(response => {
            this.setState({nama_sekolah: response.data.nama_sekolah});
            this.setState({alamat: response.data.alamat});
            this.setState({kota: response.data.kota});
            this.setState({provinsi: response.data.provinsi});
        });

        axios.get('http://127.0.0.1:8000/api/guru_sekolah/' + this.props.match.params.id + '/guru_sekolah').then(response => {
            this.setState({guru_sekolahs : response.data})
        })

        axios.get('http://127.0.0.1:8000/api/jenjang/' + this.props.match.params.id + '/jenjang_sekolah').then(response => {
            this.setState({jenjang_sekolah: response.data});
        });

        axios.get('http://127.0.0.1:8000/api/listSiswa ').then(response => {
            this.setState({listSiswas: response.data});
        });

        axios.get('http://127.0.0.1:8000/api/guru ').then(response => {
            this.setState({gurus: response.data});
            console.log(this.state.gurus.nama_guru)
        });

        axios.get('http://127.0.0.1:8000/api/tahun_ajaran').then(response => {
            this.setState({tahun_ajarans: response.data});
        });

        axios.get('http://127.0.0.1:8000/api/listGuru ').then(response => {
            this.setState({listGurus: response.data});
        });

    }

    onChangeNamaSekolah(e) {
        this.setState({
            nama_sekolah: e.target.value
        })
    }

    onChangeAlamat(e) {
        this.setState({
            alamat: e.target.value
        })
    }

    onChangeKota(e) {
        this.setState({
            kota: e.target.value
        })
    }

    onChangeProvinsi(e) {
        this.setState({
            provinsi: e.target.value
        })
    }

    onChangeJenjangSekolah(e) {
        this.setState({
            jenjang_sekolah: e.target.value
        })
    }

    changeJenjangID(id) {
        this.setState({
            jenjang_id: id,
        })
    }

    handleShowTingkat() {
        this.setState({
            tingkatIsActive: true
        })
    }

    handleHideTingkat() {
        this.setState({tingkatIsActive: false})
    }

    getTingkat(id,nama_jenjang) {
        axios.get('http://127.0.0.1:8000/api/tingkat/' + id + '/tingkat_jenjang').then(response => {
            this.setState({tingkat_jenjang: response.data});
        });
        this.setState({nama_jenjangg: nama_jenjang
        })
    }

    handleShowKelas() {
        this.setState({
            kelasIsActive: true,
        })

    }

    handleHideKelas() {
        this.setState({
            kelasIsActive: false,
        })
    }

    getKelas(id,tingkat) {
        axios.get('http://127.0.0.1:8000/api/kelas/' + id + '/kelas_tingkat').then(response => {
            this.setState({kelas_tingkat: response.data});
        })
        this.setState({
            current_tingkat: tingkat,
        })
    }

    onChangeTahunAjaran(e) {
        this.setState({
            tahun_ajaran: e.target.value,
        })
    }

    toggleModalSiswa() {
        this.setState({
            modalSiswa: !this.state.modalSiswa,
        })
    }

    handleShowSiswaKelas() {
        this.setState({
            siswaKelasIsActive: true,
        })
    }

    getSiswaKelas(id,kelas) {
        axios.get('http://127.0.0.1:8000/api/siswa_kelas/' + id + '/siswa_kelas').then(response => {
            this.setState({siswa_kelas: response.data});
        })
        const siswa_kelas = this.state.siswa_kelas
        this.setState({
            kelass:kelas,
            kelas_id: id,
            siswa_kelas : siswa_kelas,
        })
    }

    toggleTab() {
        this.setState({
            tabIsActive: true,
        })
    }

    getJadwalKelas(id) {
        axios.get('http://127.0.0.1:8000/api/jadwal/' + id + '/jadwal_kelas').then(response => {
            this.setState({jadwal_kelas: response.data});
        })
    }

    toggleModalEditJenjang() {
        this.setState({
            modalEditJenjang: !this.state.modalEditJenjang
        })
    }

    tambahSiswaKelas(user_id, kelas_id,keterangan) {
            const add_siswa_kelas = {
                user_id: user_id,
                kelas_id: kelas_id,
                keterangan:keterangan,
            }
        axios.post('http://127.0.0.1:8000/api/siswa_kelas', add_siswa_kelas)
            .then(function (response) {
                var siswa_kelas = this.state.siswa_kelas;
                siswa_kelas.push(add_siswa_kelas)
                axios.get('http://127.0.0.1:8000/api/listSiswa ').then(response => {
                    this.setState({listSiswas: response.data});
                });
                this.setState({
                    siswa_kelas : siswa_kelas,
                    alert_message: "success"
                })
                console.log(response.data);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.setState({alert_message: "error"})
            });

    }

    deleteSiswaKelas(id){
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/siswa_kelas/' + id)
                .then(response => {
                    var siswa_kelas = this.state.siswa_kelas;
                    for (var i = 0; i < siswa_kelas.length; i++) {
                        if (siswa_kelas[i].id === id) {
                            siswa_kelas.splice(i,1);
                            this.setState({siswa_kelas: siswa_kelas});
                        }
                        this.setState({alert_message : "success"})
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    this.setState({alert_message : "error"})
                });
        }
    }

    onChangeListSiswa(e){
        this.setState({listSiswa : e.target.value})
    }

    toggleModalGuru() {
        this.setState({
            modalGuru: !this.state.modalGuru,
        })
    }

    tambahGuruSekolah(user_id, sekolah_id,status) {
        const add_guru_sekolah = {
            user_id: user_id,
            sekolah_id: sekolah_id,
            status : status,
        }
        axios.post('http://127.0.0.1:8000/api/guru_sekolah', add_guru_sekolah)
            .then(function (response) {
                var guru_sekolah = this.state.guru_sekolahs;
                guru_sekolahs.push(add_guru_sekolah)
                axios.get('http://127.0.0.1:8000/api/listGuru ').then(response => {
                    this.setState({listGurus: response.data});
                });
                this.setState({
                    guru_sekolah : guru_sekolah,
                    alert_message: "success"
                })
                console.log(response.data);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
                this.setState({alert_message: "error"})
            });

    }

    deleteGuruSekolah(id){
        if(confirm("Do you really want to delete?")){
            axios.delete('http://127.0.0.1:8000/api/guru_sekolah/' + id)
                .then(response => {
                    var guru_sekolah = this.state.guru_sekolahs;
                    for (var i = 0; i < guru_sekolah.length; i++) {
                        if (guru_sekolah[i].id === id) {
                            guru_sekolah.splice(i,1);
                            this.setState({guru_sekolah: guru_sekolah});
                        }
                        this.setState({alert_message : "success"})
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    this.setState({alert_message : "error"})
                });
        }
    }

    render() {
        return (
            <div className="container" className="scrollbar scrollbar-primary" style={{ maxHeight:"800px", overflowX:"hidden"}} >

            <MDBContainer>
                <div className={"row>"}>
                <MDBCardGroup deck className={"col"}>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Detail Sekolah : {this.state.nama_sekolah}</MDBCardTitle>
                                <ul style={{listStyleType:"none"}}>
                                <li>Nama Sekolah : {this.state.nama_sekolah}</li>
                                <li>Alamat : {this.state.alamat}</li>
                                <li>Kota : {this.state.kota}</li>
                                <li>Provinsi : {this.state.provinsi}</li>

                                </ul>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5">Jenjang : {this.state.nama_jenjangg}</MDBCardTitle>
                                {
                                    this.state.jenjang_sekolah.map(jenjang =>{
                                        return(

                                            <ul key={jenjang.id} style={{listStyleType:"none"}}>
                                                    <li >
                                                        <label onClick={() => {this.handleShowTingkat(); this.getTingkat(jenjang.id,jenjang.nama_jenjang)}}>{jenjang.nama_jenjang}</label>
                                                            <Link to={`/jenjang/edit/${jenjang.id}/tingkat_jenjang`}>Edit </Link>
                                                    </li>
                                                </ul>
                                    )
                                    })

                                }
                            <i onClick={this.toggleModalEditJenjang} className="fas fa-plus"></i>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCardGroup>
                </div>
                <MDBCardGroup className="col">
                    {
                        this.state.tingkatIsActive == true ?(
                            <MDBCard style={{ width: '18rem' }}>
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Tingkat: {this.state.current_tingkat}</MDBCardTitle>
                                    {
                                        this.state.tingkat_jenjang.map(tingkat =>{
                                            return(
                                                <ul key={tingkat.id} style={{listStyleType:"none"}}>
                                                    <li >
                                                        <label onClick={() => { this.handleShowKelas();  this.getKelas(tingkat.id,tingkat.nama_tingkat)}}>{tingkat.nama_tingkat}</label>
                                                        <Link to={`/tingkat/edit/${tingkat.id}/kelas_tingkat`}>Edit </Link>

                                                    </li>
                                                </ul>
                                            )
                                        })
                                    }
                                    <button onClick={this.handleHideTingkat}>Hide</button>
                                </MDBCardBody>
                            </MDBCard>
                        ): null
                    }
                    {
                        this.state.kelasIsActive == true ? (
                            <MDBCard sm="6">
                                <MDBCardBody>
                                    <MDBCardTitle tag="h5">Kelas : {this.state.kelass}</MDBCardTitle>
                                    <h3>Tahun Ajaran</h3>

                                    <select value={this.state.tahun_ajaran} onChange={this.onChangeTahunAjaran}>
                                        <option> Pilih Tahun Ajaran </option>
                                    {
                                            this.state.tahun_ajarans.map(tahun_ajaran=> {
                                                return (
                                                    <option key={tahun_ajaran.id} value={tahun_ajaran.tahun_ajaran}>{tahun_ajaran.tahun_ajaran}</option>
                                                )
                                            })
                                    }
                                    </select>
                                    {
                                        this.state.kelas_tingkat.map(kelas =>{
                                            return(
                                                    this.state.tahun_ajaran == kelas.tahun_ajaran ? (
                                                    <ul key={kelas.id} style={{listStyleType: "none"}}>
                                                        <li>
                                                            <label onClick={() => { this.toggleTab();  this.getSiswaKelas(kelas.id,kelas.nama_kelas); this.getJadwalKelas(kelas.id) }}>Kelas : {kelas.nama_kelas}</label>
                                                        </li>
                                                    </ul>
                                                    ): null
                                            )
                                        })
                                    }
                                    <button onClick={this.handleHideKelas}>Hide</button>
                                </MDBCardBody>
                            </MDBCard>
                        ): null
                    }
                    </MDBCardGroup>
                {/*TAB*/}
                {/*TAB*/}
                {/*TAB*/}
                    {
                        this.state.tabIsActive == true ? (
                            <MDBCardGroup className={"col"}>
                                <MDBCard>
                                    <ul className="nav nav-tabs md-tabs" id="myTabMD" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="siswa-tab-md" data-toggle="tab"
                                               href="#siswa-md" role="tab" aria-controls="siswa-md"
                                               aria-selected="true">Siswa</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="jadwal-tab-md" data-toggle="tab"
                                               href="#jadwal-md" role="tab" aria-controls="jadwal-md"
                                               aria-selected="false">Jadwal</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="guru-tab-md" data-toggle="tab"
                                               href="#guru-md" role="tab" aria-controls="guru-md"
                                               aria-selected="false">Guru</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content card pt-5" id="myTabContentMD">
                                        <div className="tab-pane fade show active" id="siswa-md" role="tabpanel" aria-labelledby="siswa-tab-md">
                                            <h5>Daftar Siswa : Tingkat {this.state.current_tingkat} {this.state.kelass}</h5>
                                            {
                                                this.state.siswa_kelas.map(siswa =>{
                                                    return(
                                                        <div key={siswa.id}>
                                                             <p>{siswa.nama_siswa} : {siswa.keterangan}
                                                                 <MDBIcon icon="times mdb-gallery-view-icon" onClick={this.deleteSiswaKelas.bind(this,siswa.id)} />
                                                             </p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <i onClick={this.toggleModalSiswa} className="fas fa-plus"></i>
                                        </div>
                                        <div className="tab-pane fade" id="jadwal-md" role="tabpanel" aria-labelledby="jadwal-tab-md">
                                            <h5> Daftar Jadwal : Kelas {this.state.kelass}</h5>
                                            {
                                                this.state.jadwal_kelas.map(jadwal =>{
                                                    return(

                                                        <p key={jadwal.id}> Mata Pelajaran : {jadwal.nama_mata_pelajaran} <br/>
                                                            Hari : {jadwal.hari} <br/>
                                                            Waktu : {jadwal.waktu_mulai} - {jadwal.waktu_selesai}
                                                        </p>

                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="tab-pane fade" id="guru-md" role="tabpanel" aria-labelledby="guru-tab-md">
                                            <h5> Daftar Guru : {this.state.nama_sekolah}</h5>
                                            {
                                                this.state.guru_sekolahs.map(guru =>{
                                                    return(
                                                        <p key={guru.id}> Guru : {guru.nama_guru}<br/>
                                                        <MDBIcon icon="times mdb-gallery-view-icon" onClick={this.deleteGuruSekolah.bind(this,guru.id)} />
                                                        </p>
                                                    )
                                                })
                                            }
                                            <i onClick={this.toggleModalGuru} className="fas fa-plus"></i>

                                        </div>
                                    </div>
                                </MDBCard>
                            </MDBCardGroup>
                        ): null
                    }
                    {/*MODALITY*/}
                    {/*MODALITY*/}
                    {/*MODALITY*/}
                <MDBContainer>
                <MDBModal isOpen={this.state.modalSiswa} toggle={this.toggleModalSiswa}>
                    <MDBModalHeader toggle={this.toggleModalSiswa}>Daftar Siswa</MDBModalHeader>
                    <MDBModalBody>
                        {
                            this.state.listSiswas.map(siswa =>{
                                return(
                                    <div key={siswa.id}>
                                    <p onChange={this.onChangeListSiswa}>{siswa.user_id} : {siswa.nama_siswa} {siswa.NIS}
                                    {/*<select className="form-control">*/}
                                    {/*    <option value="Siswa">Siswa</option>*/}
                                    {/*    <option value="Wakil Ketua Kelas">Wakil Ketua Kelas</option>*/}
                                    {/*    <option value="Ketua Kelas"> Ketua Kelas</option>*/}
                                    {/*</select>*/}
                                        <button onClick={this.tambahSiswaKelas.bind(this,siswa.user_id,this.state.kelas_id,"Siswa")}>Tambahkan</button>
                                    </p>
                                    </div>
                                )
                            })
                        }
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggleModalSiswa}>Close</MDBBtn>
                        <MDBBtn color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>

                <MDBContainer>
                <MDBModal isOpen={this.state.modalEditJenjang} toggle={this.toggleModalEditJenjang}>
                    <MDBModalHeader toggle={this.toggleModalEditJenjang}>Daftar Siswa</MDBModalHeader>
                    <MDBModalBody>
                        <label className="col-lg-6 control-label"> Jenjang </label>
                        <MultiSelect
                            selectSomeItems={"Jenjang"}
                            options={jenjang}
                            selected={this.state.jenjang_sekolah}
                            onSelectedChanged={jenjang_sekolah => this.setState({jenjang_sekolah})}
                        />                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggleModalEditJenjang}>Close</MDBBtn>
                        <MDBBtn color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>

                <MDBContainer>
                    <MDBModal isOpen={this.state.modalGuru} toggle={this.toggleModalGuru}>
                        <MDBModalHeader toggle={this.toggleModalGuru}>Daftar Guru</MDBModalHeader>
                        <MDBModalBody>
                            {
                                this.state.gurus.map(guruu =>{
                                    return(
                                        <div key={guruu.id}>
                                            <p >{guruu.user_id} : {guruu.nama_guru} {guruu.NIP}
                                                {/*<select className="form-control">*/}
                                                {/*    <option value="Siswa">Siswa</option>*/}
                                                {/*    <option value="Wakil Ketua Kelas">Wakil Ketua Kelas</option>*/}
                                                {/*    <option value="Ketua Kelas"> Ketua Kelas</option>*/}
                                                {/*</select>*/}
                                                <button onClick={this.tambahGuruSekolah.bind(this,guruu.user_id,this.state.sekolah_id,"Honorer")}>Tambahkan</button>
                                            </p>
                                        </div>
                                    )
                                })
                            }                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggleModalGuru}>Close</MDBBtn>
                            <MDBBtn color="primary">Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>

            </MDBContainer>
            </div>
    );
    }
}
