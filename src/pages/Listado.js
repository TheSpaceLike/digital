import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import styled from 'styled-components'
import "../css/Listado.css"

const columnas=[
    { title: 'Nombre', field: 'nombre' },
    { title: 'Descripción', field: 'descripcion' },
    { title: 'Nomenclatura', field: 'nomenclatura' }
];

const baseUrl="http://localhost:3001/listados"

const useStyles = makeStyles((theme) =>({
    modal:{
        position: 'absolute',
        width: 400,
        height: 'auto',
        borderRadius: 10,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    iconos:{
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    }
}));

function Listado() {
    const styles= useStyles();
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [elementoSeleccionado, setElementoSeleccionado] = useState({
        id:"",
        nombre: "",
        descripcion: "",
        nomenclatura: "",
    })

    const handleChange=e=>{
        const {name, value}=e.target;
        setElementoSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }));
      }
    

   const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
        setData(response.data);
        console.log(response.data)
    }).catch(error=>{
        console.log(error);
      })
   }

   const peticionPost=async()=>{
    await axios.post(baseUrl, elementoSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
        console.log(error);
      })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+elementoSeleccionado.id, elementoSeleccionado)
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(elemento=>{
        if(elemento.id===elementoSeleccionado.id){
          elemento.elemento=elementoSeleccionado.elemento;
          elemento.elemento=elementoSeleccionado.elemento;
          elemento.elemento=elementoSeleccionado.elemento;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+elementoSeleccionado.id)
    .then(response=>{
      setData(data.filter(elemento=>elemento.id!==elementoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

    const seleccionarElemento=(elemento, caso)=>{
        setElementoSeleccionado(elemento);
        (caso==="Editar")?abrirCerrarModalEditar()
        :
        abrirCerrarModalEliminar()
    }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }
   
    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
    }

   useEffect(()=>{
       peticionGet();
   },[])

   const bodyInsertar=(
    <div className={styles.modal}>
      <h3 className="subTitle">Agregar Nuevo Elemento</h3>
        <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} />   
        <br />       
        <TextField className={styles.inputMaterial} label="Descripción" name="descripcion" onChange={handleChange} />
        <br />
        <TextField className={styles.inputMaterial} label="Nomenclatura" name="nomenclatura" onChange={handleChange} />
            <br />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3 className="subTitle">Editar Elemento</h3>
        <TextField className={styles.inputMaterial} label="Nombre" name="nombre" onChange={handleChange} value={elementoSeleccionado&&elementoSeleccionado.nombre}/>     
        <br />   
        <TextField className={styles.inputMaterial} label="Descripción" name="descripcion" onChange={handleChange} value={elementoSeleccionado&&elementoSeleccionado.descripcion}/>
        <br />
        <TextField className={styles.inputMaterial} label="Nomenclatura" name="nomenclatura" onChange={handleChange} value={elementoSeleccionado&&elementoSeleccionado.nomenclatura}/>
            <br />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()} >Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el elemento <b>{elementoSeleccionado && elementoSeleccionado.nombre}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>SÍ</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>NO</Button>

      </div>

    </div>
  )

    return (
        <div className="Listado">
            
            <MaterialTable
                columns={columnas}
                data={data}
                title="Listados"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => seleccionarElemento(rowData, "Editar")
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => seleccionarElemento(rowData, "Eliminar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header:{
                        actions: 'Acciones'
                    }
                }}
            />
            <br />
                <button className="btn__insertar" onClick={()=> abrirCerrarModalInsertar()}>Insertar elemento</button>
            <br /><br />
        <Modal
            open={modalInsertar}
            onClose={abrirCerrarModalInsertar}>
            {bodyInsertar}
        </Modal>

        <Modal
            open={modalEditar}
            onClose={abrirCerrarModalEditar}>
            {bodyEditar}
        </Modal>

        <Modal
            open={modalEliminar}
            onClose={abrirCerrarModalEliminar}>
            {bodyEliminar}
        </Modal>

        </div>
    )
}

export default Listado;
