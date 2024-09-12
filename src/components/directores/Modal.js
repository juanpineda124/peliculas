import React from 'react'

export default function Modal({
  director,
  directorEdit,
  change,
  guardar,
  editarDirector,
  clearForm,
  editing
}) {
  const handleChange = e => {
    change(e)
  }

  const guardarDirector = (e) => {
    e.preventDefault()
    if (editing) {
      editarDirector()
    } else {
      guardar()
    }
  }

  const clear = () => {
    clearForm()
  }

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{editing ? 'Editar director' : 'Nuevo director'}</h1>
            <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close" 
            onClick={clear}>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={guardarDirector}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Nombre:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="recipient-name" 
                  name="nombre"
                  onChange={handleChange}
                  value={editing ? directorEdit.nombre : director.nombre}
                />
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
                disabled={editing ? !directorEdit.nombre : !director.nombre}>
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
