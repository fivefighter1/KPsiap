import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import Add from './Add';
import Listing from './Listing';
// import Edit from "./Edit";



export default class Index extends Component {
    render() {
        return (
            <div>

                <div>
                    <Link to='/tahun_ajaran' className="btn btn-default">Listing </Link>
                    <Link to='/tahun_ajaran/add' className="btn btn-default">Add</Link>
                    {/*<Route exact path='/tahun_ajaran/edit/:id' component={Edit}/>*/}
                    <Route exact path='/tahun_ajaran' component={Listing}/>
                    <Route exact path='/tahun_ajaran/add' component={Add}/>
                </div>

            </div>
        );
    }
}
