import React, {Component} from 'react';
import {BrowserRouter as Router, Link,Route,Switch} from 'react-router-dom';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import Role from '../Role/Index';
import MataPelajaran from '../MataPelajaran/Index';
import Sekolah from '../Sekolah/Index';
import User from '../User/Index'
import TahunAjaran from '../TahunAjaran/Index'
import Siswa from '../Siswa/Index'
import Guru from '../Guru/Index'
import Jenjang from '../Jenjang/Index'
import Coba from '../Sekolah/JenjangDetail'
import FingerPrint from '../FingerPrint/Index'
import Jadwal from '../Jadwal/Index'
import Absensi from '../Absensi/Index'
export default class Toolbar extends Component {
    constructor(props) {
        super(props);

    }
        render()
        {
            return (

                <header className="toolbar">
                    <nav className="toolbar_navigation">
                        <div className="toolbar_toggle-button">
                            <DrawerToggleButton click={this.props.drawerClickHandler}/>
                        </div>
                        <div className="toolbar_logo"><a href="/">THE LOGO</a></div>
                        <div className="spacer"/>
                        <div className="toolbar_navigation-items">
                            <ul>
                                <li><a href="/"> Products</a></li>
                                <li>
                                    <Link  to="/role">Roles</Link>
                                </li>
                                <li>
                                    <Link to="/mata_pelajaran"> Mata Pelajaran </Link>
                                </li>
                                <li>
                                <Link to="/user"> Users </Link>
                                </li>
                                <li>
                                    <Link to="/sekolah"> Sekolah </Link>
                                </li>
                                <li>
                                    <Link to="/tahun_ajaran"> Tahun Ajaran </Link>
                                </li>
                                <li>
                                    <Link to="/siswa"> Siswa </Link>
                                </li>
                                <li>
                                    <Link to="/guru"> Guru </Link>
                                </li>
                                <li>
                                    <Link to="/jenjang"> Jenjang </Link>
                                </li>
                                <li>
                                    <Link to="/fingerprint"> Finger Print </Link>
                                </li>
                                <li>
                                    <Link to="/jadwal"> Jadwal </Link>
                                </li>
                                <li>
                                    <Link to="/absensi"> Absensi </Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <div className='row'>
                        <div className='col-md-12'>
                            <Switch>

                                {/* Role */}
                                <Route exact path='/role' component={Role} />
                                <Route exact path='/role/add' component={Role}/>
                                <Route exact path='/role/edit/:id' component={Role}/>

                                {/*Mata Pelajaran*/}
                                <Route exact path='/mata_pelajaran' component={MataPelajaran} />
                                <Route exact path='/mata_pelajaran/add' component={MataPelajaran} />
                                <Route exact path='/mata_pelajaran/edit/:id' component={MataPelajaran} />

                                {/*User*/}
                                <Route exact path='/user' component={User} />
                                <Route exact path='/user/add' component={User}/>
                                <Route exact path='/user/edit/:id' component={User}/>

                                {/*Sekolah*/}
                                <Route exact path='/sekolah' component={Sekolah} />
                                <Route exact path='/sekolah/add' component={Sekolah}/>
                                <Route exact path='/sekolah/show/:id' component={Sekolah}/>
                                <Route exact path='/jenjang/edit/:id/tingkat_jenjang' component={Sekolah}/>
                                <Route exact path='/tingkat/edit/:id/kelas_tingkat' component={Sekolah}/>

                                {/*Tahun Ajaran*/}
                                <Route exact path='/tahun_ajaran' component={TahunAjaran}/>
                                <Route exact path='/tahun_ajaran/add' component={TahunAjaran}/>

                                {/*Siswa*/}
                                <Route exact path='/siswa' component={Siswa}/>
                                <Route exact path='/siswa/add' component={Siswa}/>
                                <Route exact path='/siswa/edit/:id' component={Siswa}/>

                                {/*Guru*/}
                                <Route exact path='/guru' component={Guru}/>
                                {/*<Route exact path='/guru' component={Guru}/>*/}
                                {/*<Route exact path='/guru' component={Guru}/>*/}

                                {/*Jenjang*/}
                                <Route exact path='/jenjang' component={Jenjang}/>
                                <Route exact path='/jenjang/add' component={Jenjang}/>
                                {/*<Route exact path='/jenjang/edit/:id' component={Jenjang}/>*/}
                                <Route exact path='/jenjang/show/:id' component={Jenjang}/>

                                {/*FingerPrint*/}
                                <Route exact path='/fingerprint' component={FingerPrint}/>
                                <Route exact path='/fingerprint/add' component={FingerPrint}/>
                                <Route exact path='/fingerprint/edit/:id' component={FingerPrint}/>
                                <Route exact path='/fingerprint/search' component={FingerPrint}/>

                                {/*Jadwal*/}
                                <Route exact path='/jadwal' component={Jadwal}/>
                                <Route exact path='/jadwal/add' component={Jadwal}/>
                                <Route exact path='/jadwal/edit/:id' component={Jadwal}/>

                                {/*Absensi*/}
                                <Route exact path='/absensi' component={Absensi}/>
                                {/*<Route exact path='/absensi/add' component={Absensi}/>*/}
                                <Route exact path='/absensi/absen/:id' component={Absensi}/>

                            </Switch>

                        </div>
                    </div>
                </header>
            );
        }
}


