import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import 'mdbreact/dist/css/mdb.css';
import '../fontawesome/css/all.css'
const API_URL = 'http://localhost:5000';

function mySubmitHandler(e){
    e.preventDefault();
    var email = document.querySelector("#email");
    var password = document.querySelector("#password");
    var bodyFormData = {
        'email': email.value,
        'password': password.value
    }
    const url_ = `${API_URL}/auth/login/`;
    axios({
        method: 'post',
        url: url_,
        data: bodyFormData,
        config: { headers: {'Content-Type': 'application/json' }}
        })
        .then(function (response) {
            //handle success
            var auth_token = response.data["token"];
            localStorage.setItem("AUTH_TOKEN",auth_token);
            console.log(response);
            this.props.history.push('/')
            //window.location.href='localhost:3000';
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}
const FormPage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form  onSubmit={mySubmitHandler}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                id="email"
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                id="password"
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit">Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;