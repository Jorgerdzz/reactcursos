import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Alumnos extends Component {

  url = Global.apiEjemplos;
  botoneliminar = React.createRef();

  state = {
    alumnos: [],
  }

  loadAlumnos = () => {
    let request = "api/Alumnos/FiltrarCurso/" + this.props.idcurso;
    axios.get(this.url + request).then(response=>{
      this.setState({
        alumnos: response.data
      })
    })
  }

  componentDidMount = () => {
    this.loadAlumnos();
  }

  componentDidUpdate = (oldProps) => {
    if(oldProps.idcurso != this.props.idcurso){
      this.loadAlumnos();
    }
  }

  deleteAlumno = (id) => {
    let request = "api/Alumnos/DeleteAlumno/" + id;
    axios.delete(this.url+request).then(response=>{
      console.log("Eliminado")
      this.loadAlumnos();
    })
  }

  render() {
    return (
      <div>
        <table className='table table-primary table-striped table-hover'>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>NOMBRE</th>
              <th>Apellidos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {
                this.state.alumnos.map((alumno, index)=>{
                  return(
                    <tr>
                      <td><img src={alumno.imagen} style={{width: "100px"}}></img></td>
                      <td>{alumno.nombre}</td>
                      <td>{alumno.apellidos}</td>
                      <td>
                        <NavLink to={"/updatealumno/" + alumno.idAlumno} className="btn btn-warning me-2">UPDATE</NavLink>
                        <button onClick={ () => {
                          this.deleteAlumno(alumno.idAlumno)}} className='btn btn-danger'>DELETE</button>
                      </td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
      </div>
    )
  }
}
