import React from 'react'

export default function Modal({
  productora,
  productoraEdit,
  change,
  guardar,
  editarProductora,
  clearForm,
  editing
}) {
  const handleChange = e => {
    change(e)
  }

  const guardarProductora = (e) => {
    e.preventDefault()
    if (editing) {
      editarProductora()
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
        <h1 className="modal-title fs-5" id="exampleModalLabel">{editing ? 'Editar productora' : 'Nuevo productora'}</h1>
        <button 
        type="button" 
        className="btn-close" 
        data-bs-dismiss="modal" 
        aria-label="Close"
        onClick={clear}>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={guardarProductora}>
          <div className="mb-3">
            <label for="recipient-name" className="col-form-label">Nombre:</label>
            <input 
            type="text" 
            className="form-control" 
            id="recipient-name" 
            name='nombre'
            onChange={handleChange}
            value={editing ? productoraEdit.nombre : productora.nombre}/>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Slogan:</label>
            <textarea 
            className="form-control" 
            id="message-text"
            name='slogan'
            onChange={handleChange}
            value={editing ? productoraEdit.slogan : productora.slogan}>
            </textarea>
          </div>
          <div className="mb-3">
            <label for="message-text" className="col-form-label">Descripción:</label>
            <textarea 
            className="form-control" 
            id="message-text"
            name='descripcion'
            onChange={handleChange}
            value={editing ? productoraEdit.descripcion : productora.descripcion}>
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
             disabled={editing ? !productoraEdit.nombre : !productora.nombre}>
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
