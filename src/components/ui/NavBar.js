import React from 'react'
import { Link, NavLink } from 'react-router-dom'


export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link
      to='/'
      tabIndex={0}
      className= "nav-brand"
      aria-label='Ir a inicio'     
    >
    PELICULAS
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <NavLink
          to='/'
          tabIndex={1}
          className='nav-link'
        >
          Genero
        </NavLink>
        <NavLink
          to='/directores'
          tabIndex={2}
          className='nav-link'
        >
          Directores
        </NavLink>
        <NavLink
          to='/productoras'
          tabIndex={3}
          className='nav-link'
        >
          Productoras
        </NavLink>
        <NavLink
          to='/medias'
          tabIndex={4}
          className='nav-link'
        >
          Peliculas y series
        </NavLink>
        <NavLink
          to='/tipos'
          tabIndex={5}
          className='nav-link'
        >
          tipos
        </NavLink>
      </div>
    </div>
  </div>
</nav>
  )
}
