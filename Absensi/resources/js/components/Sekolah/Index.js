import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Edit from "./Edit";
import SekolahDetail from "./SekolahDetail";
import JenjangDetail from "../Jenjang/JenjangDetail";
import EditJenjang from "../Jenjang/EditJenjang.js";
import EditTingkat from "../Tingkat/EditTingkat";


export default class Index extends Component {
    render() {
        return (
            <div>

                <div>
                    <Link to='/sekolah' className="btn btn-default">Listing </Link>
                    <Link to='/sekolah/add' className="btn btn-default">Add</Link>
                    <Route exact path='/sekolah/edit/:id' component={Edit}/>
                    <Route exact path='/sekolah' component={Listing}/>
                    <Route exact path='/sekolah/add' component={Add}/>
                    <Route exact path='/sekolah/show/:id' component={SekolahDetail}/>
                    <Route exact path='/jenjang/show/:id' component={JenjangDetail}/>
                    <Route exact path='/jenjang/edit/:id/tingkat_jenjang' component={EditJenjang}/>
                    <Route exact path='/tingkat/edit/:id/kelas_tingkat' component={EditTingkat}/>
                </div>

            </div>
        );
    }
}
