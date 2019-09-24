import React from 'react';


class Header extends React.Component
{
    constructor(props){
        super(props);
        this.state = {};
    }

    render=()=>{
        return (

            <div className="jumbotron text-center">
                <h1>School Management System</h1>
                <p>Resize this responsive page to see the effect!</p> 
            </div>
        )
    }
}
export default Header;