import React from 'react'

export default function Table({
  medias = [],
  borrarMediaPorId,
  cargarMedia // Pasamos la función para cargar la media a editar
}) {
  const borrarPorId = (e) => {
    e.preventDefault();
    borrarMediaPorId(e);
  }

  const editarMedia = (media) => {
    cargarMedia(media); // Llamamos a la función para cargar la media en el formulario
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Serial</th>
          <th scope="col">Titulo</th>
          <th scope="col">Sinopsis</th>
          <th scope="col">URL</th>
          <th scope="col">Imagen</th>
          <th scope="col">Fecha creacion</th>
          <th scope="col">Fecha modificacion</th>
          <th scope="col">Año estreno</th>
          <th scope="col">Genero</th>
          <th scope="col">Director</th>
          <th scope="col">Productora</th>
          <th scope="col">Tipo</th>
          <th scope="col">Opciones</th>
        </tr>
      </thead>
      <tbody>
        {
          medias.map(({ serial, titulo, sinopsis, url, imagen, fechaCreacion, fechaModificacion, añoEstreno, genero, director, productora, tipo, _id }, index) => {
            return (
              <tr key={_id}>
                <th scope="row">{ index + 1 }</th>
                <td>{serial}</td>
                <td>{titulo}</td>
                <td>{sinopsis}</td>
                <td>{url}</td>
                <td>{imagen}</td>
                <td>{fechaCreacion}</td>
                <td>{fechaModificacion}</td>
                <td>{añoEstreno}</td>
                <td>{genero?.nombre || 'N/A'}</td> 
                <td>{director?.nombre || 'N/A'}</td> 
                <td>{productora?.nombre || 'N/A'}</td> 
                <td>{tipo?.nombre || 'N/A'}</td> 
                <td>
                  <button 
                    type="button" 
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => editarMedia({ serial, titulo, sinopsis, url, imagen, añoEstreno, genero, director, productora, tipo, _id })}
                  >
                    Editar
                  </button>
                  <button 
                    data-id={_id}
                    type="button" 
                    className="btn btn-danger"
                    onClick={borrarPorId}
                  >
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
