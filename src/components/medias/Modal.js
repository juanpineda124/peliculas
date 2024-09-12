import React from 'react';

export default function Modal({ 
  media, 
  change, 
  guardar, 
  clearForm, 
  editing 
}) {
  const handleChange = e => {
    change(e);
  };

  const guardarMedia = (e) => {
    e.preventDefault();
    guardar();
  };

  const clear = () => {
    clearForm();
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
                <label htmlFor="message-text-genero" className="col-form-label">Genero:</label>
                <input
                  type="text"
                  className="form-control"
                  id="message-text-genero"
                  name='genero'
                  onChange={handleChange}
                  value={media.genero ? media.genero.id : ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-director" className="col-form-label">Director:</label>
                <input
                  type="text"
                  className="form-control"
                  id="message-text-director"
                  name='director'
                  onChange={handleChange}
                  value={media.director ? media.director.id : ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-productora" className="col-form-label">Productora:</label>
                <input
                  type="text"
                  className="form-control"
                  id="message-text-productora"
                  name='productora'
                  onChange={handleChange}
                  value={media.productora ? media.productora.id : ''}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text-tipo" className="col-form-label">Tipo:</label>
                <input
                  type="text"
                  className="form-control"
                  id="message-text-tipo"
                  name='tipo'
                  onChange={handleChange}
                  value={media.tipo ? media.tipo.id : ''}
                />
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
