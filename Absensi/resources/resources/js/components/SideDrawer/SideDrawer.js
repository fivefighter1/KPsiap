import React, {Component} from 'react';
import './SideDrawer.css';
import {Link,Route,Switch} from "react-router-dom";
import Role from "../Role";


export default class SideDrawer extends Component{
    constructor(props){
        super(props);
    }


    render(){
        let drawerClasses = 'side-drawer';
        if(this.props.show){
            drawerClasses = 'side-drawer open';
        }
        return(
            <nav className={drawerClasses}>
                <ul>
                    <li> <a href="/"> Products</a></li>
                    <li> <a href="/"> Users </a></li>
                    <li>
                        <Link  to="/role">Roles</Link>
                    </li>
                    <li>
                        <Link to="/mata_pelajaran"> Mata Pelajaran </Link>
                    </li>
                </ul>

            </nav>
        );

    }
}
