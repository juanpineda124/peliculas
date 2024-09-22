import React, { useState, useEffect } from 'react';

export default function Modal({ 
  media, 
  change, 
  guardar, 
  clearForm, 
  editing,
  generos,  
  directores,
  productoras,
  tipos
}) {
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    // Actualizar la vista previa de la imagen cuando el campo 'imagen' cambie
    setImagePreview(media.imagen);
  }, [media.imagen]);

  const handleChange = (e) => {
    change(e);

    // Si se cambia la URL de la imagen, actualizar la vista previa
    if (e.target.name === 'imagen') {
      setImagePreview(e.target.value);
    }
  };

  const guardarMedia = (e) => {
    e.preventDefault();
    guardar();
  };

  const clear = () => {
    clearForm();
    setImagePreview(''); // Limpiar la vista previa de la imagen
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-5" id="exampleModalLabel">{editing ? 'Editar Media' : 'Nueva Media'}</h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"
              onClick={clear}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={guardarMedia}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Serial:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="recipient-name" 
                  name='serial'
                  onChange={handleChange}
                  value={media.serial || ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-titulo" className="col-form-label">Titulo:</label>
                <textarea 
                  className="form-control" 
                  id="message-text-titulo"
                  name='titulo'
                  onChange={handleChange}
                  value={media.titulo || ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-sinopsis" className="col-form-label">Sinopsis:</label>
                <textarea 
                  className="form-control" 
                  id="message-text-sinopsis"
                  name='sinopsis'
                  onChange={handleChange}
                  value={media.sinopsis || ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-url" className="col-form-label">URL:</label>
                <textarea 
                  className="form-control" 
                  id="message-text-url"
                  name='url'
                  onChange={handleChange}
                  value={media.url || ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-imagen" className="col-form-label">Imagen:</label>
                <textarea 
                  className="form-control" 
                  id="message-text-imagen"
                  name='imagen'
                  onChange={handleChange}
                  value={media.imagen || ''}
                />
                {/* Vista previa de la imagen */}
                {imagePreview && (
                  <div className="mt-3">
                    <img 
                      src={imagePreview} 
                      alt="Vista previa" 
                      style={{ maxWidth: '100%', maxHeight: '300px' }} 
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-añoEstreno" className="col-form-label">Año estreno:</label>
                <input
                  type="date"
                  className="form-control"
                  id="message-text-añoEstreno"
                  name='añoEstreno'
                  onChange={handleChange}
                  // Verificar si añoEstreno es una fecha y formatearla como YYYY-MM-DD
                  value={media.añoEstreno ? new Date(media.añoEstreno).toISOString().split('T')[0] : ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-genero" className="col-form-label">Género:</label>
                <select
                  className="form-control"
                  id="message-text-genero"
                  name="genero"
                  onChange={handleChange}
                  value={media.genero}  // Asignamos el id del género seleccionado
                >
                  <option value="" disabled>Selecciona un género</option>
                  {generos.map(genero => (
                    <option key={genero._id} value={genero._id}>
                      {genero.nombre}  {/* Ajusta el campo según cómo se llame en tu API */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-director" className="col-form-label">Director:</label>
                <select
                  className="form-control"
                  id="message-text-director"
                  name="director"
                  onChange={handleChange}
                  value={media.director}  
                >
                  <option value="" disabled>Selecciona un director</option>
                  {directores.map(director => (
                    <option key={director._id} value={director._id}>
                      {director.nombre} 
                    </option>
                  ))}
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="message-text-productora" className="col-form-label">Productora:</label>
                <select
                  className="form-control"
                  id="message-text-productora"
                  name="productora"
                  onChange={handleChange}
                  value={media.productora}  
                >
                  <option value="" disabled>Selecciona una productora</option>
                  {productoras.map(productora => (
                    <option key={productora._id} value={productora._id}>
                      {productora.nombre} 
                    </option>
                  ))}
                </select>
                </div>
                <div className="mb-3">
                <label htmlFor="message-text-tipo" className="col-form-label">Tipo:</label>
                <select
                  className="form-control"
                  id="message-text-tipo"
                  name="tipo"
                  onChange={handleChange}
                  value={media.tipo}  
                >
                  <option value="" disabled>Selecciona un tipo</option>
                  {tipos.map(tipo => (
                    <option key={tipo._id} value={tipo._id}>
                      {tipo.nombre} 
                    </option>
                  ))}
                </select>
                </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={clear}
                >
                  Cerrar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!media.serial || media.serial.length === 0}
                >
                  {editing ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}