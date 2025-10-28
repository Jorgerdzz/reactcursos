import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';

export default class Home extends Component {

    url = Global.apiEjemplos;

    state = {
        alumnos: []
    }

    loadAlumnos = () => {
        let request = "api/Alumnos";
        axios.get(this.url + request).then(response=>{
            this.setState({
                alumnos: response.data
            })
        })
    }

    componentDidMount = () =>{
        this.loadAlumnos();
    }

  render() {
    return (
      <table className='table table-primary table-striped table-hover'>
        <thead>
            <tr>
                <th>IMAGEN</th>
                <th>NOMBRE</th>
                <th>APELLIDOS</th>
            </tr>
        </thead>
        <tbody>
            {
                this.state.alumnos.map((alumno, index)=>{
                    return(
                        <tr key={index}>
                            <td><img src={alumno.imagen} style={{width: "100px"}}></img></td>
                            <td>{alumno.nombre}</td>
                            <td>{alumno.apellidos}</td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    )
  }
}
