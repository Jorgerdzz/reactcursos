import axios from 'axios';
import React, { Component } from 'react'
import Global from '../Global';
import { Navigate } from 'react-router-dom';

export default class UpdateAlumno extends Component {

    url = Global.apiEjemplos;

    cajanombre = React.createRef();
    cajaapellidos = React.createRef();
    cajaimagen = React.createRef();
    cajaactivo = React.createRef();
    cajacurso = React.createRef();

    state = {
        alumno: [],
        status: false
    }

    loadAlumno = () => {
        let request = "api/Alumnos/FindAlumno/" + this.props.idalumno;
        axios.get(this.url + request).then(response=>{
            this.setState({
                alumno: response.data
            })
        })
    }


    componentDidMount = () => {
        this.loadAlumno();
    }

    updateAlumno = (e) => {
        e.preventDefault();
        let alumno = {
            idAlumno: parseInt(this.props.idalumno),
            nombre: this.cajanombre.current.value,
            apellidos: this.cajaapellidos.current.value,
            imagen: this.cajaimagen.current.value,
            activo: parseInt(this.cajaactivo.current.value),
            idCurso: parseInt(this.cajacurso.current.value)
        }
        let request = "api/Alumnos/UpdateAlumno";
        axios.put(this.url+request, alumno).then(response=>{
            console.log("Actualizado")
            this.setState({
                status: true
            })
        })
    }

  render() {
    return (
      <div>
        <form onSubmit={this.updateAlumno}>
            <label>Nombre:</label>
            <input type='text' className='form-control' ref={this.cajanombre} defaultValue={this.state.alumno.nombre}></input>
            <label>Apellidos:</label>
            <input type='text' className='form-control' ref={this.cajaapellidos} defaultValue={this.state.alumno.apellidos}></input>
            <label>Imagen:</label>
            <input type='text' className='form-control' ref={this.cajaimagen} defaultValue={this.state.alumno.imagen}></input>
            <label>Activo:</label>
            <input type='number' className='form-control' ref={this.cajaactivo} defaultValue={this.state.alumno.activo}></input>
            <label>Curso:</label>
            <input type='number' className='form-control' ref={this.cajacurso} defaultValue={this.state.alumno.idCurso}></input>
            <button className='btn btn-primary'>Modificar</button>
        </form>
        {
            this.state.status &&
            <Navigate to={"/alumnos/" + this.state.alumno.idCurso}/>
        }
      </div>
    )
  }
}
