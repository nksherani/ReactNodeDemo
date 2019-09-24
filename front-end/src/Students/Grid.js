import React from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5000';

var config = {
    headers: {
        'Authorization': 'bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5rc2hlcmFuaUBvdXRsb29rLmNvbSIsImVtYWlsIjoibmtzaGVyYW5pQG91dGxvb2suY29tIiwiaWF0IjoxNTY5MTY2MTEyfQ.NtESAZdyObKbHKfCyqaYTLgkNdQKC6Js4y2n_Ic2XVA'
}
};


class Grid extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            students: []
          }
    }
    componentDidMount() {
        const url = `${API_URL}/Students/`;
        axios.get(url,config).then(response => response.data)
        .then((data) => {
          this.setState({ students: data })
          console.log(this.state.students)
         })
      }
    render=()=>{
        return (

            <div >
                <ul>{this.state.students.map((x,i)=><li key={i}>{x}</li>)}</ul>
                
            </div>
        )
    }
}
export default Grid;