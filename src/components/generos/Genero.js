import React, { useEffect, useState } from 'react'
import { borrarGenero, crearGenero, editarGenero, obtenerGeneros } from '../../services/GeneroService'
import Title from '../ui/Title.js'
import Modal from './Modal'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'


export default function Genero() {

const [ generos, setGeneros, ] = useState([])
const [loader, setLoader] = useState( false )
const [genero, setGenero] = useState({
  nombre: '',
  descripcion: ''
})

const [editing, setEditing] = useState(false) // Para controlar si estamos editando
  const [generoEdit, setGeneroEdit] = useState({
    nombre: '',
    descripcion: '',
    _id: ''
  })

useEffect(() => {
  listarGeneros()
}, [])


 const listarGeneros = async() => {
  setLoader(true)
 try {
      const { data } = await obtenerGeneros()
      setGeneros(data)
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
      const response = await crearGenero(genero)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardo la informacion correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarGeneros()
      clearForm()
      setLoader(false)
  }catch (e){
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puedo guardar la informacion!',
        footer: e.message
      })
      setLoader(false)
  }
}

const actualizarGenero = async () => {
  setLoader(true)
  try{
    const response = await editarGenero(generoEdit._id, { nombre: generoEdit.nombre, descripcion: generoEdit.descripcion })
    console.log(response)
    Swal.fire({
      position: 'top-end',
        icon: 'success',
        title: 'Genero actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
    })
    listarGeneros()
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
    setGeneroEdit({
      ...generoEdit,
      [name]: value
    })
  } else {
    setGenero({
      ...genero,
      [name]: value
    })
  }
}

const seleccionarGenero = (genero) => {
  setGeneroEdit(genero)
  setEditing(true)
}

const clearForm = () => {
  setGenero({
    nombre: '',
    descripcion: ''
  })
}

const borrarGeneroPorId = (e) => {
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
             const response = await borrarGenero(id)
             console.log(response)
             listarGeneros()
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
      /* Read more about handling dismissals below */
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
    <Title title={'generos'}/>
    {
        loader && <Spinner />
      }
    <Table 
      generos={generos}
      borrarGeneroPorId={borrarGeneroPorId}
      seleccionarGenero={seleccionarGenero}
    />
    <ButtonModal title={editing ? 'Editar genero' : 'Nuevo genero'}/>
    <Modal 
      genero={genero}
      change={handleChange}
      generoEdit={generoEdit}
      guardar={guardar}
      editarGenero={actualizarGenero}
      clearForm={clearForm}
      editing={editing}
    />
  </>
)
}
