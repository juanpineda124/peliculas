import { axiosConfiguration } from '../configuration/axiosConfiguration';

//obtener todas las productoras
const obtenerDirectores = () => {
     return axiosConfiguration.get('directores/?estado=true', {
      headers:{
        'Content-Type': 'application/json'
      }
    })
} 

//crear productora
const crearDirector = (data) => {
  return axiosConfiguration.post('directores', data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//actualizar productora
const editarDirector = (tipoId, data) => {
  return axiosConfiguration.put('directores/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//eliminar productora
const borrarDirector = (tipoId, data) => {
  return axiosConfiguration.delete('directores/'+tipoId, data, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

//productora por id
const obtenerDirectorPorId = (tipoId) => {
  return axiosConfiguration.post('directores'+tipoId, {
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

export{
  obtenerDirectores,
  crearDirector,
  editarDirector,
  borrarDirector,
  obtenerDirectorPorId
}