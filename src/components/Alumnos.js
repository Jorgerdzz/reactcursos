import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';

export default class Alumnos extends Component {

  url = Global.apiEjemplos;
  botonalumnos = React.createRef();

  state = {
    alumnos: [],
    alumno: null
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

  render() {
    return (
      <div>
        <ul>
          {
            this.state.alumnos.map((alumno, index)=>{
              return(
                <li key={index}>
                  {alumno.nombre} {alumno.apellidos}
                  <button onClick={ () => {
                    this.props.loadDetalleAlumno(alumno.idAlumno)}}>
                    Detalles
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
