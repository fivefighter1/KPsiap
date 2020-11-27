import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar/Toolbar'
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from './Backdrop/Backdrop'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import './css/scrollbar.css'

export default class Index extends Component{
    constructor(props){
        super(props);
        this.state ={
            sideDrawerOpen : false,
        }
        this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
        this.backdropClickHandler = this.backdropClickHandler.bind(this);
    }


    drawerToggleClickHandler(){
        this.setState((prevState) =>{
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    }

    backdropClickHandler(){
        this.setState({sideDrawerOpen:false});
    };

    render(){
        let sideDrawer;
        let backdrop;

        if(this.state.sideDrawerOpen){
            backdrop = <Backdrop click={this.backdropClickHandler}/>;
        }
        return (
                <div className="container" className="scrollbar scrollbar-primary" style={{ maxHeight:"800px", overflowX:"hidden"}} >

                <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backdrop}
                {/*<main style={{marginTop : '64px'}}> <p> This is a page content</p> </main>*/}
                </div>
        );
    }
}


if (document.getElementById('index')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('index'));
}
