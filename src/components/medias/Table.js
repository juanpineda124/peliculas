import React, { useState } from 'react';

export default function Table({ medias = [], borrarMediaPorId, cargarMedia }) {
  const [expandedRows, setExpandedRows] = useState({});
  const [vista, setVista] = useState('tabla'); // Estado para alternar entre tabla y cuadricula

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleVista = () => {
    setVista((prevVista) => (prevVista === 'tabla' ? 'cuadricula' : 'tabla'));
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    height: '100%', // Asegura que todas las tarjetas tengan la misma altura
  };

  const cardContentStyles = {
    flex: '1', // Hace que el contenido de la tarjeta ocupe el espacio restante
  };

  const buttonsContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px', // Asegura que los botones estén separados del contenido superior
  };

  const tableStyles = {
    overflowX: 'auto',
  };

  const thTdStyles = {
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const imageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const sinopsisLimit = 100;

  
  const borrarPorId = (e) => {
    e.preventDefault();
    borrarMediaPorId(e);
  };

  const editarMedia = (media) => {
    cargarMedia(media);
  };

  return (
    <div>
      {/* Botón para alternar entre tabla y cuadrícula */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={toggleVista} className="btn btn-primary">
          Cambiar a {vista === 'tabla' ? 'Cuadrícula' : 'Tabla'}
        </button>
      </div>

      {/* Mostrar Tabla o Cuadrícula según el estado */}
      {vista === 'tabla' ? (
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
              {medias.map(
                (
                  {
                    serial,
                    titulo,
                    sinopsis,
                    url,
                    imagen,
                    fechaCreacion,
                    fechaModificacion,
                    añoEstreno,
                    genero,
                    director,
                    productora,
                    tipo,
                    _id,
                  },
                  index
                ) => (
                  <tr key={_id}>
                    <th scope="row">{index + 1}</th>
                    <td style={thTdStyles}>{serial}</td>
                    <td
                      style={{
                        ...thTdStyles,
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        overflow: 'hidden',
                      }}
                    >
                      {titulo}
                    </td>
                    <td
                      style={{
                        ...thTdStyles,
                        overflow: 'visible',
                        whiteSpace: 'normal',
                      }}
                    >
                      <div
                        style={{
                          maxHeight: expandedRows[_id] ? 'none' : '50px',
                          overflow: 'hidden',
                        }}
                      >
                        {sinopsis}
                      </div>
                      {sinopsis.length > sinopsisLimit && (
                        <button
                          onClick={() => toggleExpand(_id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'blue',
                            cursor: 'pointer',
                          }}
                        >
                          {expandedRows[_id] ? 'Ver menos' : 'Ver más'}
                        </button>
                      )}
                    </td>
                    <td style={thTdStyles}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'red', textDecoration: 'underline' }}
                      >
                        {url}
                      </a>
                    </td>
                    <td style={thTdStyles}>
                      {imagen ? (
                        <img
                          src={imagen}
                          alt={titulo}
                          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        />
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
                        onClick={() =>
                          editarMedia({
                            serial,
                            titulo,
                            sinopsis,
                            url,
                            imagen,
                            añoEstreno,
                            genero,
                            director,
                            productora,
                            tipo,
                            _id,
                          })
                        }
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
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={gridStyles}>
          {medias.map(
            ({
              serial,
              titulo,
              sinopsis,
              url,
              imagen,
              fechaCreacion,
              fechaModificacion,
              añoEstreno,
              genero,
              director,
              productora,
              tipo,
              _id,
            }) => (
              <div key={_id} style={cardStyles}>
                <div style={cardContentStyles}>
                  <img
                    src={imagen || 'https://via.placeholder.com/300'}
                    alt={titulo}
                    style={imageStyles}
                  />
                  <h3>{titulo}</h3>
                  <p>
                    <strong>Serial:</strong> {serial}
                  </p>
                  <p>
                    <strong>Sinopsis:</strong>
                    <div
                      style={{
                        maxHeight: expandedRows[_id] ? 'none' : '50px',
                        overflow: 'hidden',
                      }}
                    >
                      {sinopsis}
                    </div>
                    {sinopsis.length > sinopsisLimit && (
                      <button
                        onClick={() => toggleExpand(_id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'blue',
                          cursor: 'pointer',
                        }}
                      >
                        {expandedRows[_id] ? 'Ver menos' : 'Ver más'}
                      </button>
                    )}
                  </p>
                  <p>
                    <strong>URL:</strong>{' '}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'red', textDecoration: 'underline' }}
                    >
                      {url}
                    </a>
                  </p>
                  <p>
                    <strong>Año Estreno:</strong> {añoEstreno}
                  </p>
                  <p>
                    <strong>Fecha creación:</strong> {fechaCreacion}
                  </p>
                  <p>
                    <strong>Fecha modificación:</strong> {fechaModificacion}
                  </p>
                  <p>
                    <strong>Género:</strong> {genero?.nombre || 'N/A'}
                  </p>
                  <p>
                    <strong>Director:</strong> {director?.nombre || 'N/A'}
                  </p>
                  <p>
                    <strong>Productora:</strong> {productora?.nombre || 'N/A'}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {tipo?.nombre || 'N/A'}
                  </p>
                </div>
                <div style={buttonsContainerStyles}>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() =>
                      editarMedia({
                        serial,
                        titulo,
                        sinopsis,
                        url,
                        imagen,
                        añoEstreno,
                        genero,
                        director,
                        productora,
                        tipo,
                        _id,
                      })
                    }
                  >
                    Editar
                  </button>
                  <button
                    data-id={_id}
                    type="button"
                    className="btn btn-danger"
                    onClick={borrarPorId} // Ajuste para que se ejecute correctamente
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
