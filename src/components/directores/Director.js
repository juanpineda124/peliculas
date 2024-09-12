import React, { useEffect, useState } from 'react'
import { borrarDirector, crearDirector, editarDirector, obtenerDirectores } from '../../services/DirectorService'
import Title from '../ui/Title'
import Modal from './Modal'
import Table from './Table'
import ButtonModal from '../ui/ButtonModal'
import Spinner from '../ui/Spinner'
import Swal from 'sweetalert2'


export default function Directores() {

  const [directores, setDirectores] = useState([])
  const [loader, setLoader] = useState(false)
  const [director, setDirector] = useState({
    nombre: ''
  })
  const [editing, setEditing] = useState(false) // Para controlar si estamos editando
  const [directorEdit, setDirectorEdit] = useState({
    nombre: '',
    _id: ''
  }) // Director que se va a editar

  useEffect(() => {
    listarDirectores()
  }, [])

  const listarDirectores = async () => {
    setLoader(true)
    try {
      const { data } = await obtenerDirectores()
      setDirectores(data)
      setLoader(false)
    } catch (e) {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede mostrar la información!',
        footer: e.message
      })
      setLoader(false)
    }
  }

  const guardar = async () => {
    setLoader(true)
    try {
      const response = await crearDirector(director)
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se guardó la información correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarDirectores()
      clearForm()
      setLoader(false)
    } catch (e) {
      console.log(e)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar la información!',
        footer: e.message
      })
      setLoader(false)
    }
  }

  const actualizarDirector = async () => {
    setLoader(true)
    try {
      const response = await editarDirector(directorEdit._id, { nombre: directorEdit.nombre })
      console.log(response)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Director actualizado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      listarDirectores()
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
      setDirectorEdit({
        ...directorEdit,
        [name]: value
      })
    } else {
      setDirector({
        ...director,
        [name]: value
      })
    }
  }

  const seleccionarDirector = (director) => {
    setDirectorEdit(director)
    setEditing(true) // Activamos el modo edición
  }

  const clearForm = () => {
    setDirector({ nombre: '' })
    setDirectorEdit({ nombre: '', _id: '' })
    setEditing(false)
  }

  const borrarDirectorPorId = async (id) => {
    setLoader(true)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de borrar?',
      text: "¡No se podrá revertir la acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await borrarDirector(id)
          console.log(response)
          listarDirectores()
          setLoader(false)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'El director ha sido eliminado.',
            'success'
          )
        } catch (e) {
          console.log(e)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la información!',
            footer: e.message
          })
          setLoader(false)
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El director está a salvo :)',
          'error'
        )
      }
    })
  }

  return (
    <>
      <Title title={'Directores'} />
      {loader && <Spinner />}
      <Table 
        directores={directores}
        borrarDirectorPorId={borrarDirectorPorId}
        seleccionarDirector={seleccionarDirector}
      />
      <ButtonModal title={editing ? 'Editar director' : 'Nuevo director'} />
      <Modal 
        director={director} 
        directorEdit={directorEdit}
        change={handleChange}
        guardar={guardar}
        editarDirector={actualizarDirector}
        clearForm={clearForm}
        editing={editing}
      />
    </>
  )
}