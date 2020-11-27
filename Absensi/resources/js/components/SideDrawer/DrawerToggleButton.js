import React, {Component} from 'react';
import './DrawerToggleButton.css';


export default class DrawerToggleButton extends Component{
    constructor(props) {
        super(props);

    }
        render()
        {
            return (
                <button className="toggle-button" onClick={this.props.click}>
                    <div className="toggle-button_line"/>
                    <div className="toggle-button_line"/>
                    <div className="toggle-button_line"/>
                </button>
            );

        }

}
