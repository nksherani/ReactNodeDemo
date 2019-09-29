import React from 'react';
import {Form,FormFragment} from 'react-forms-processor';
import {renderer,FormButton} from 'react-forms-processor-atlaskit';
const fields=[
    {
        id:'username',
        name:'username',
        type:'text',
        label:'Username',
        placeholder:'username',
        description:'Enter username . . .',
        defaultValue:''
        
    }
];
class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={};
    };
    
    render=()=>{
        return(<div>
            <Form renderer={renderer} defaultFields={fields} >
               
            </Form>
        </div>)
    };

}
export default Login;