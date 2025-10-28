import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';
import axios from 'axios';

export default class Menu extends Component {

    url = Global.apiEjemplos;

    state = {
        cursos: []
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

  render() {
    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <NavLink className="navbar-brand" href="#">Navbar</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to={"/"}>Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="#">Link</NavLink>
                </li>
                <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Cursos
                    </NavLink>
                    <ul className="dropdown-menu">
                        {
                            this.state.cursos.map((curso, index)=>{
                                return(
                                    <li><NavLink className="dropdown-item" to={"/alumnos/" + curso}>{curso}</NavLink></li>
                                )
                            })
                        }
                    </ul>
                </li>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
    </nav>
    )
  }
}
