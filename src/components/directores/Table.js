import React from 'react'

export default function Table({
  directores = [],
  borrarDirectorPorId,
  seleccionarDirector
}) {
  const borrarPorId = (id) => borrarDirectorPorId(id)

  const editarPorId = (director) => seleccionarDirector(director)

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Fecha creación</th>
          <th scope="col">Fecha modificación</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {directores.map(({ nombre, estado, fechaCreacion, fechaModificacion, _id }, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{_id}</td>
            <td>{nombre}</td>
            <td>{estado ? 'Activo' : 'Inactivo'}</td>
            <td>{fechaCreacion}</td>
            <td>{fechaModificacion}</td>
            <td>
              <button type="button" 
              className="btn btn-info" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal" 
              onClick={() => editarPorId({ nombre, _id })}>
                Editar
              </button>
              
              <button type="button" 
              className="btn btn-danger" 
              onClick={() => borrarPorId(_id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}