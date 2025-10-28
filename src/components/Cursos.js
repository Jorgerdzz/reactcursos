import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';
import Alumnos from './Alumnos';

export default class Cursos extends Component {

  url = Global.apiEjemplos;

  selectcursos = React.createRef();

  state = {
    cursos: [],
    idCurso: 0,
    alumno: null
  }

  loadCursos = () => {
    let request = "api/Alumnos/Cursos";
    axios.get(this.url + request).then(response=>{
      this.setState({
        cursos: response.data
      })
    })
  }

  componentDidMount = () => {
    this.loadCursos();
  }

  mostrarAlumnos = () => {
    let idcurso = this.selectcursos.current.value;
    this.setState({
      idCurso: idcurso
    })
  }

  loadDetalleAlumno = (idAlumno) => {
    let request = "api/Alumnos/FindAlumno/" + idAlumno;
    axios.get(this.url + request).then(response=>{
      this.setState({
        alumno: response.data
      })
    })
  }

  render() {
    return (
      <div>
        <h1>PRÁCTICA REACT CURSOS</h1>
        <select onChange={this.mostrarAlumnos} ref={this.selectcursos}>
            {
              this.state.cursos.map((curso, index)=>{
                return(
                  <option key={index} value={curso}>{curso}</option>
                )
              })
            }
        </select>
        {
          this.state.alumno &&
          <div>
            <h1>{this.state.alumno.nombre}{this.state.alumno.apellidos}</h1>
            <h1>ID Alumno: {this.state.alumno.idAlumno}</h1>
            <img src={this.state.alumno.imagen}/>
          </div>
        }
        {
          this.state.idCurso != 0 &&
          <Alumnos idcurso={this.state.idCurso} loadDetalleAlumno={this.loadDetalleAlumno}/>
        }
      </div>
    )
  }
}
