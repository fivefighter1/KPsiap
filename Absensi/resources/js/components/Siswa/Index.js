import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
// import Add from './Add';
import Listing from './Listing';
import Edit from "./Edit";



export default class Index extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to='/siswa' className="btn btn-default">Listing </Link>
                    {/*<Link to='/siswa/add' className="btn btn-default">Add</Link>*/}
                    <Route exact path='/siswa/edit/:id' component={Edit}/>
                    <Route exact path='/siswa' component={Listing}/>
                    {/*<Route exact path='/siswa/add' component={Add}/>*/}
                </div>
            </div>
        );
    }
}
