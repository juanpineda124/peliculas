import React from 'react'

export default function Table({
  generos = [],
  borrarGeneroPorId,
  seleccionarGenero
}) {

  const borrarPorId = (id) => borrarGeneroPorId(id)

  const editarPorId = (genero) => seleccionarGenero(genero)

  return (

    <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Estado</th>
        <th scope="col">Fecha creacion</th>
        <th scope="col">Fecha modificacion</th>
        <th scope="col">Descripcion</th>
        <th scope="col">Opciones</th>
      </tr>
    </thead>
    <tbody>
      {
        generos.map(({nombre, estado, fechaCreacion, fechaModificacion, descripcion, _id }, index) => {
          return (
            <tr key={index}>
              <th scope="row">{ index + 1 }</th>
              <td>{_id}</td>
              <td>{nombre}</td>
              <td>{estado ? 'Activo': 'Inactivo'}</td>
              <td>{fechaCreacion}</td>
              <td>{fechaModificacion}</td>
              <td>{descripcion}</td>
              <td> 
              <button type="button" 
              className="btn btn-info" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal" 
              onClick={() => editarPorId({ nombre, descripcion, _id })}>
                Editar
              </button>
              
              <button 
              id={_id}
              type="button" 
              className="btn btn-danger"
              onClick={borrarPorId}>
                Eliminar
                </button>
              </td>
            </tr>
          )
        }) 
      }
    </tbody>
  </table>
  )
}
