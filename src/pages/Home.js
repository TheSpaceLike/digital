import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import styled from 'styled-components'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css'
import { Container, Row, Col } from 'react-bootstrap';

const Title = styled.h1`
    /* font-size: 4rem; */
    font-weight: 500;
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%, -50%);
    margin-bottom: 10rem;
`

const cookies = new Cookies();
class Home extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('apellido_paterno: '+cookies.get('apellido_paterno'));
        console.log('apellido_materno: '+cookies.get('apellido_materno'));
        console.log('nombre: '+cookies.get('nombre'));
        console.log('username: '+cookies.get('username'));
        return (
            <div className="App">
                <Title>Dashboard</Title>
                <div className="separator"></div>
                <Container>
                <Row className="rows">
                    <Col className="columns" onClick={()=> window.location.href="./listado"}>
                       <h3 className="subtitle">Tipos de metas</h3>
                    </Col>
                    <Col className="columns" onClick={()=> window.location.href="./listado"}>
                        <h3 className="subtitle">Secciones de Metas</h3>
                    </Col>

                </Row>
                <Row className="rows">
                    <Col className="columns" onClick={()=> window.location.href="./listado"}>
                        <h3 className="subtitle">Metas Globales</h3>
                    </Col>
                    <Col className="columns" onClick={()=> window.location.href="./listado"}>
                        <h3 className="subtitle">Metas por publicación</h3>
                    </Col>
    
                </Row>
                </Container>

                <button onClick={()=>this.cerrarSesion()}>Logout</button>
            </div>
        );
    }
}

export default Home;
