import React, { useEffect, useState } from 'react'
import { borrarTipo, crearTipo, obtenerTipos, editarTipo } from '../../services/TipoService'
import Title from '../ui/Title.js'
import Modal from './Modal'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

export default function Productora() {

    const [ tipos, setTipos ] = useState([])
    const [loader, setLoader] = useState( false )
    const [tipo, setTipo] = useState({
  nombre: '',
  descripcion: ''
})

const [editing, setEditing] = useState(false) // Para controlar si estamos editando
const [tipoEdit, setTipoEdit] = useState({
  nombre: '',
  descripcion: '',
  _id: ''
})

  useEffect(() => {
    listarTipos()
  }, [])


   const listarTipos = async() => {
    setLoader(true)
    try {
        const { data } = await obtenerTipos()
        setTipos(data)
        setLoader(false)
    }catch (e){
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede mostrar la informacion!',
        footer: e.message
      })
      setLoader(false)
    }
} 

const guardar = async() => {
  setLoader(true)
 try {
      const response = await crearTipo(tipo)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardo la informacion correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarTipos()
      clearForm()
      setLoader(false)
  }catch (e){
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puedo eliminar la informacion!',
        footer: e.message
      })
      setLoader(false)
  }
}

const actualizarTipo = async () => {
  setLoader(true)
  try{
    const response = await editarTipo(tipoEdit._id, { nombre: tipoEdit.nombre, descripcion: tipoEdit.descripcion })
    console.log(response)
    Swal.fire({
      position: 'top-end',
        icon: 'success',
        title: 'Tipo actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
    })
    listarTipos()
    clearForm()
    setLoader(false)
    setEditing(false)
  } catch (e) {
    console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar la información!',
        footer: e.message
      })
      setLoader(false)
  }
}

const handleChange = e => {
  const { name, value } = e.target
  if (editing) {
    setTipoEdit({
      ...tipoEdit,
      [name]: value
    })
  } else {
    setTipo({
      ...tipo,
      [name]: value
    })
  }
}

const seleccionarTipo = (tipo) => {
  setTipoEdit(tipo)
  setEditing(true)
}

const clearForm = () => {
  setTipo({
    nombre: '',
    descripcion: ''
  })
}

const borrarTipoPorId = (e) => {
  const id = e.target.id
  setLoader(true)
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿Estas seguro de borrar?',
    text: "No se podra revertir la accion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, estoy seguro!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
        try {
             const response = await borrarTipo(id)
             console.log(response)
             listarTipos()
             setLoader(false)
         }catch (e){
             console.log(e)
             Swal.fire({
               icon: 'error',
               title: 'Error',
               text: 'No se puedo guardar la infomracion!',
               footer: e.message
             })
         }
      swalWithBootstrapButtons.fire(
        'Eliminado!',
        'Su archivo ha sido eliminado',
        'success'
      )
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Tu archivo esta a salvo :)',
        'error'
      )
    }
  })
  setLoader(false)
}

  return (
    <>
      <Title title={'Tipos'}/>
      {
        loader && <Spinner />
      }
      <Table 
      tipos={tipos}
      borrarTipoPorId={borrarTipoPorId}
      seleccionarTipo={seleccionarTipo}
      />
      <ButtonModal title='Nuevo tipo'/>
      <Modal 
        tipo={tipo}
        change={handleChange}
        tipoEdit={tipoEdit}
        guardar={guardar}
        editarTipo={actualizarTipo}
        clearForm={clearForm}
        editing={editing}
      />
    </>
  )
}