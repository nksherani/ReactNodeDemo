//custommenu.js
import React from 'react';

// import { TabStrip, TabStripTab, PanelBar, PanelBarItem, PanelBarUtils, Menu, MenuItem, MenuItemModel, MenuItemLink, MenuItemArrow, Splitter } from '@progress/kendo-react-layout'
import { Menu, MenuItem } from '@progress/kendo-react-layout'
//import '@progress/kendo-react-intl'
import 'react-router-dom'


class CustomMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render = () => {
        return (<div className="row">
        <div className="col-md-6">
            <Menu onSelect={this.handleSelect}>
                <MenuItem text="First item">
                    <MenuItem text="Child item"/>
                </MenuItem>
                <MenuItem text="Second item"/>
            </Menu>
        </div>
        
    </div>);
    }
    handleSelect = (e) => {
        console.log(e);
    }
}

export default CustomMenu;