import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import styled from 'styled-components'

const baseUrl="http://localhost:3001/user";
const cookies = new Cookies();

const Iniciar = styled.button`
  background-color: #0287E6;
  border-radius: 3px;
  color: white;
  font-size: 1rem;
  margin: 0 1em;
  padding: 0.25em 1em;
  width: 150px;
  :hover{
      background-color: white;
      border: 2px solid #0287E6;
      color: #0287E6;
  }
`

const Recovery = styled.button`
  /* background-color: #0287E6;
  border-radius: 3px; */
  color: #0287E6;
  font-size: 1rem;
  margin: 0 1em;
  padding: 0.25em 1em;
  width: 150px;
  :hover{
      background-color: white;
      border: 2px solid #0287E6;
      color: #0287E6;
  }
`


const Container = styled.div`
  position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 0.5px solid gray;
    padding: 100px;
    background-color: white;
`
const Title = styled.h1`
    font-size: 1.8rem;
    font-weight: 700;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -50%);
`

class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: "/"});
                cookies.set('apellido_materno', respuesta.apellido_materno, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                alert(`Welcome ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./home";
            }else{
                alert('The username or password is not correct');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./home";
        }
    }

    render() {
        return (
            <Container>
                <Title>
                    Sign In
                </Title>
                <div className="secun__container">
                    <div className="form-group">
                        <label className="user__title">Username: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                            />
                        <br/>
                    <label className="pass__title">Password: </label>
                    <input 
                        type="password" 
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                        />
                    <div className="separator__login"></div>
                    <Iniciar className="btn" onClick={()=> this.iniciarSesion()} >Login</Iniciar>
                    </div>
                    <div className="separator__login"></div>
                    <Recovery className="btn">Recovery</Recovery>
                </div>
            </Container>
        );
    }
}

export default Login;




    