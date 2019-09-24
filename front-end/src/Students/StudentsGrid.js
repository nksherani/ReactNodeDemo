import React from 'react';
import axios from 'axios';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import Stud from '../Students/Stud'
const API_URL = 'http://localhost:5000';

var config = {
    headers: {
        'Authorization': 'bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5rc2hlcmFuaUBvdXRsb29rLmNvbSIsImVtYWlsIjoibmtzaGVyYW5pQG91dGxvb2suY29tIiwiaWF0IjoxNTY5MTY2MTEyfQ.NtESAZdyObKbHKfCyqaYTLgkNdQKC6Js4y2n_Ic2XVA'
}
};

class StudentsGrid extends React.Component
{
    constructor(props){
        super(props);
        const dataState = {
            skip: 0,
            take: 20,
            sort: [
                { field: 'StudentId', dir: 'desc' }
            ]
            
        };
        this.state = {
            students: [],
            dataState: dataState,
        };
    }
    componentWillMount() {
        const url = `${API_URL}/Students/`;
        axios.get(url,config).then(response => response.data)
        .then((data) => {
            console.log(process( data, this.state.dataState) );
          this.setState({ students: process( data, this.state.dataState).data })
          //console.log(this.state.students)
         });
      }
      dataStateChange = (event) => {
        this.setState({
            dataResult: process(this.state.students, event.data),
            dataState: event.data
        });
    }
    render=()=>{
        return (
            <div >
                <Grid           style={{ height: '700px' }}
                                sortable
                                reorderable
                                pageable={{ buttonCount: 4, pageSizes: true }}

                                 data={this.state.students}
                                //data={Stud}
                            >
                                
                                <GridColumn field="StudentId" title="ID" width="200px" />
                                <GridColumn field="StudentName" width="300px" />
                                <GridColumn field="FatherName" width="280px" />
                                <GridColumn field="MotherName" width="200px" />
                                <GridColumn field="ClassName" width="300px" />
                                <GridColumn field="Section" width="200px" />
                                <GridColumn field="GRNo"  width="90px" />
                            </Grid>
            </div>
        )
    }
}
export default StudentsGrid;