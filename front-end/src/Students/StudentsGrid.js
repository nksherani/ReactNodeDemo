import React from 'react';
import axios from 'axios';
import { process, filterBy, orderBy } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
// import { DropDownList } from '@progress/kendo-react-dropdowns';
// import { GridPDFExport } from '@progress/kendo-react-pdf';
// import { ExcelExport } from '@progress/kendo-react-excel-export';
// import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
// import Stud from '../Students/Stud'
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
            take: 20
        };
       
        this.state = {
            completeData:[],
            students: [],
            dataState: dataState,
            filter: {},
            sort: [
                { field: 'GRNo', dir: 'asc' }
            ]
        };
    }
    componentDidMount() {
        const url = `${API_URL}/Students/`;
        axios.get(url,config).then(response => response.data)
        .then((data) => {
            //console.log(process( data, this.state.dataState) );
            data = data.map((x)=>this.ProcessData(x));
            this.setState({ completeData: data })
            this.setState({ students: process( orderBy(data,this.state.sort), this.state.dataState) })
            //console.log(this.state.students)
         });
      }
      dataStateChange = (event) => {
          console.log(event.data);
        this.setState({
            students: process(this.state.completeData, event.data),
            dataState: event.data
        });
    }
    ProcessData = (data)=>{
        var newdata = {
            "GRNo":parseInt(data.GRNo),
            "StudentName": data.StudentName,
            "FatherName":data.FatherName,
            "MotherName":data.MotherName,
            "ClassName":data.ClassName,
            "Section":data.Section,
            "RollNo":parseInt(data.RollNo),
            "MonthlyFee":parseInt(data.MonthlyFee),
            "AnnualFee":parseInt(data.AnnualFee),
            "AdmissionFee":parseInt(data.AdmissionFee)
        }
        return newdata;
    }
    filterChange=(e)=>{
        console.log(e);
        this.setState({
            students : process(filterBy(this.state.completeData, e.filter),this.state.dataState),
            filter: e.filter
        });
    }
    sortChange=(e)=>{
        console.log(e);
        this.setState({
            students : process(orderBy(this.state.completeData, e.sort),this.state.dataState),
            sort: e.sort
        });
    }
    render=()=>{
        return (
            <div >
                <Grid           style={{ height: '700px' }}
                                sortable
                                sort={this.state.sort}
                                onSortChange = {this.sortChange}
                                filterable
                                filter = {this.state.filter}
                                groupable
                                reorderable
                                pageable={{ buttonCount: 4, pageSizes: true }}
                                 data={this.state.students}
                                {...this.state.dataState}
                                onDataStateChange={this.dataStateChange}
                                onFilterChange={this.filterChange}
                            >
                                
                                <GridColumn field="GRNo" width="200px" filter="numeric" />
                                <GridColumn field="StudentName" filter="text" width="300px" />
                                <GridColumn field="FatherName" width="280px" />
                                <GridColumn field="ClassName" width="300px" />
                                <GridColumn field="Section" width="200px" />
                                <GridColumn field="RollNo"  width="90px" />
                            </Grid>
            </div>
        )
    }
}
export default StudentsGrid;