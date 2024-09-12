import React, { useEffect, useState } from 'react'
import { borrarProductora, crearProductora, editarProductora, obtenerProductoras } from '../../services/ProductoraServices.js'
import Title from '../ui/Title.js'
import Modal from './Modal.js'
import Table from './Table.js'
import ButtonModal from '../ui/ButtonModal.js'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'

export default function Productora() {

    const [ productoras, setProductoras ] = useState([])
    const [loader, setLoader] = useState( false )
    const [productora, setProductora] = useState({
  nombre: '',
  slogan: '',
  descripcion: ''
})

const [editing, setEditing] = useState(false) // Para controlar si estamos editando
const [productoraEdit, setProductoraEdit] = useState({
  nombre: '',
  slogan: '',
  descripcion: '',
  _id: ''
})

  useEffect(() => {
    listarProductoras()
  }, [])

   const listarProductoras = async() => {
    setLoader(true)
    try {
      const { data } = await obtenerProductoras()
      setProductoras(data)
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
      const response = await crearProductora(productora)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardo la informacion correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarProductoras()
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

const actualizarProductora = async () => {
  setLoader(true)
  try{
    const response = await editarProductora(productoraEdit._id, { nombre: productoraEdit.nombre, slogan: productoraEdit.slogan, descripcion: productoraEdit.descripcion })
    console.log(response)
    Swal.fire({
      position: 'top-end',
        icon: 'success',
        title: 'Productora actualizada correctamente',
        showConfirmButton: false,
        timer: 2000
    })
    listarProductoras()
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
    setProductoraEdit({
      ...productoraEdit,
      [name]: value
    })
  } else {
    setProductora({
      ...productora,
      [name]: value
    })
  }
}

const seleccionarProductora = (productora) => {
  setProductoraEdit(productora)
  setEditing(true)
}

const clearForm = () => {
  setProductora({
    nombre: '',
    slogan: '',
    descripcion: ''
  })
}

const borrarProductoraPorId = (e) => {
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
             const response = await borrarProductora(id)
             console.log(response)
             listarProductoras()
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
      <Title title={'Productoras'}/>
      {
        loader && <Spinner />
      }
      <Table 
      productoras={productoras}
      borrarProductoraPorId={borrarProductoraPorId}
      seleccionarProductora={seleccionarProductora}
      />
      <ButtonModal title='Nueva productora'/>
      <Modal 
        productora={productora}
        change={handleChange}
        productoraEdit={productoraEdit}
        guardar={guardar}
        editarProductora={actualizarProductora}
        clearForm={clearForm}
        editing={editing}
      />
    </>
  )
}

