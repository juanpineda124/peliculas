import React from 'react'

export default function Modal({
  tipo,
  tipoEdit,
  change,
  guardar,
  editarTipo,
  clearForm,
  editing
}) {
  const handleChange = e => {
    change(e)
  }

  const guardarTipo = (e) => {
    e.preventDefault()
    if (editing) {
      editarTipo()
    } else {
      guardar()
    }
  }

  const clear = () => {
    clearForm()
  }

  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">{editing ? 'Editar tipo' : 'Nuevo tipo'}</h1>
          <button 
          type="button" 
          className="btn-close" 
          data-bs-dismiss="modal" 
          aria-label="Close"
          onClick={clear}>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={guardarTipo}>
            <div className="mb-3">
              <label for="recipient-name" className="col-form-label">Nombre:</label>
              <input 
              type="text" 
              className="form-control" 
              id="recipient-name" 
              name='nombre'
              onChange={handleChange}
              value={editing ? tipoEdit.nombre : tipo.nombre}/>
            </div>
            <div className="mb-3">
              <label for="message-text" className="col-form-label">Descripción:</label>
              <textarea 
              className="form-control" 
              id="message-text"
              name='descripcion'
              onChange={handleChange}
              value={editing ? tipoEdit.descripcion: tipo.descripcion}>
              </textarea>
            </div>
            <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            data-bs-dismiss="modal"
            onClick={clear}>
            Cerrar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={editing ? !tipoEdit.nombre : !tipo.nombre}>
            {editing ? 'Actualizar' : 'Enviar'}
          </button>
        </div>
          </form>
        </div>
      </div>
    </div>
  </div> 
  )
}
