import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import Alumnos from './Alumnos';
import UpdateAlumno from './UpdateAlumno';

export default class Router extends Component {
  render() {

    function AlumnosCursoElement(){
        let {idcurso} = useParams();
        return(<Alumnos idcurso={idcurso}/>)
    }

    function UpdateAlumnoElement(){
        let {idalumno} = useParams();
        return(<UpdateAlumno idalumno={idalumno}/>)
    }

    return (
      <BrowserRouter>
        <Menu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/alumnos/:idcurso' element={<AlumnosCursoElement/>}/>
            <Route path='/updatealumno/:idalumno' element={<UpdateAlumnoElement/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
