import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
import Edit from "./Edit";



export default class Index extends Component {
    render() {
        return (
            <div>

                <div>
                    <Link to='/mata_pelajaran' className="btn btn-default">Listing </Link>
                    <Link to='/mata_pelajaran/add' className="btn btn-default">Add</Link>
                    <Route exact path='/mata_pelajaran/edit/:id' component={Edit}/>
                    <Route exact path='/mata_pelajaran' component={Listing}/>
                    <Route exact path='/mata_pelajaran/add' component={Add}/>
                </div>

            </div>
        );
    }
}
