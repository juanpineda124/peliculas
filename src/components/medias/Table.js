import React, { useState } from 'react';

export default function Table({ medias = [], borrarMediaPorId, cargarMedia }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const tableStyles = {
    overflowX: 'auto', // Permite desplazamiento horizontal
  };

  const thTdStyles = {
    maxWidth: '300px', // Establece un ancho máximo para las celdas
    overflow: 'hidden', // Oculta el desbordamiento
    textOverflow: 'ellipsis', // Añade '...' al final del texto que se corta
    whiteSpace: 'nowrap', // Evita que el texto se rompa en varias líneas
  };

  const borrarPorId = (e) => {
    e.preventDefault();
    borrarMediaPorId(e);
  };

  const editarMedia = (media) => {
    cargarMedia(media); // Llamamos a la función para cargar la media en el formulario
  };

  const sinopsisLimit = 100; // Límite de caracteres para mostrar el botón "Ver más"
  

  return (
    <div style={tableStyles}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={thTdStyles}>#</th>
            <th scope="col" style={thTdStyles}>Serial</th>
            <th scope="col" style={thTdStyles}>Título</th>
            <th scope="col" style={thTdStyles}>Sinopsis</th>
            <th scope="col" style={thTdStyles}>URL</th>
            <th scope="col" style={thTdStyles}>Imagen</th>
            <th scope="col" style={thTdStyles}>Fecha creación</th>
            <th scope="col" style={thTdStyles}>Fecha modificación</th>
            <th scope="col" style={thTdStyles}>Año estreno</th>
            <th scope="col" style={thTdStyles}>Género</th>
            <th scope="col" style={thTdStyles}>Director</th>
            <th scope="col" style={thTdStyles}>Productora</th>
            <th scope="col" style={thTdStyles}>Tipo</th>
            <th scope="col" style={thTdStyles}>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            medias.map(({ serial, titulo, sinopsis, url, imagen, fechaCreacion, fechaModificacion, añoEstreno, genero, director, productora, tipo, _id }, index) => (
              <tr key={_id}>
                <th scope="row">{index + 1}</th>
                <td style={thTdStyles}>{serial}</td>
                <td style={{ ...thTdStyles, whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden' }}>
                  {titulo}
                </td>
                <td style={{ ...thTdStyles, overflow: 'visible', whiteSpace: 'normal' }}>
                  <div style={{ maxHeight: expandedRows[_id] ? 'none' : '50px', overflow: 'hidden' }}>
                    {sinopsis}
                  </div>
                  {sinopsis.length > sinopsisLimit && (
                    <button
                      onClick={() => toggleExpand(_id)}
                      style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
                    >
                      {expandedRows[_id] ? 'Ver menos' : 'Ver más'}
                    </button>
                  )}
                </td>
                <td style={thTdStyles}>
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'red', textDecoration: 'underline' }}>
                    {url}
                  </a>
                </td>
                <td style={thTdStyles}>
                  {imagen ? (
                    <img src={imagen} alt={titulo} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                  ) : (
                    'No imagen'
                  )}
                </td>
                <td style={thTdStyles}>{fechaCreacion}</td>
                <td style={thTdStyles}>{fechaModificacion}</td>
                <td style={thTdStyles}>{añoEstreno}</td>
                <td style={thTdStyles}>{genero?.nombre || 'N/A'}</td>
                <td style={thTdStyles}>{director?.nombre || 'N/A'}</td>
                <td style={thTdStyles}>{productora?.nombre || 'N/A'}</td>
                <td style={thTdStyles}>{tipo?.nombre || 'N/A'}</td>
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
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

