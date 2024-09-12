import React, { useEffect, useState } from 'react';
import { borrarMedia, crearMedia, obtenerMedias, editarMedia } from '../../services/MediaService';
import Title from '../ui/Title.js';
import Modal from './Modal';
import Table from './Table';
import ButtonModal from '../ui/ButtonModal';
import Spinner from '../ui/Spinner';
import Swal from 'sweetalert2';

export default function Media() {

        const [medias, setMedias] = useState([]);
        const [loader, setLoader] = useState(false);
        const [editing, setEditing] = useState(false); // Nuevo estado para manejar la edición
        const [mediaEdit, setMediaEdit] = useState(null); // Media seleccionada para editar
    
        const [media, setMedia] = useState({
            serial: '',
            titulo: '',
            sinopsis: '',
            url: '',
            imagen: '',
            añoEstreno: '',
            genero: '',
            director: '',
            productora: '',
            tipo: ''
        });
    
        useEffect(() => {
            listarMedias();
        }, []);
    
        const listarMedias = async () => {
            setLoader(true);
            try {
                const { data } = await obtenerMedias();
                setMedias(data);
            } catch (e) {
                console.error(e);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se puede mostrar la información!',
                    footer: e.message
                });
            } finally {
                setLoader(false);
            }
        };
    
        // Función para cargar los datos de la media seleccionada en el formulario
        const cargarMedia = (mediaData) => {
            setMedia({
                serial: mediaData.serial || '',
                titulo: mediaData.titulo || '',
                sinopsis: mediaData.sinopsis || '',
                url: mediaData.url || '',
                imagen: mediaData.imagen || '',
                añoEstreno: mediaData.añoEstreno || '',
                genero: mediaData.genero?._id || '',
                director: mediaData.director?._id || '',
                productora: mediaData.productora?._id || '',
                tipo: mediaData.tipo?._id || ''
            });
            setEditing(true); // Activar el modo de edición
            setMediaEdit(mediaData); // Guardar la media seleccionada para editar
        };
    
        const guardar = async () => {
            if (Object.values(media).some(value => !value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Todos los campos son obligatorios!',
                });
                return;
            }
    
            setLoader(true);
            try {
                if (editing) {
                    // Si está en modo de edición, actualiza la media
                    const response = await editarMedia(mediaEdit._id, media);
                    console.log(response);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se actualizó la información correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    // Si no está en modo de edición, crea una nueva media
                    const response = await crearMedia(media);
                    console.log(response);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Se guardó la información correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
                listarMedias();
                clearForm();
            } catch (e) {
                console.error(e);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la información!',
                    footer: e.message
                });
            } finally {
                setLoader(false);
            }
        };
    
        const handleChange = e => {
            const { name, value } = e.target;
            setMedia({
                ...media,
                [name]: value
            });
        };
    
        const clearForm = () => {
            setMedia({
                serial: '',
                titulo: '',
                sinopsis: '',
                url: '',
                imagen: '',
                añoEstreno: '',
                genero: '',
                director: '',
                productora: '',
                tipo: ''
            });
            setEditing(false); // Resetear el modo de edición
        };
    
        const borrarMediaPorId = async (e) => {
            const id = e.target.getAttribute('data-id');
            setLoader(true);
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            });
    
            swalWithBootstrapButtons.fire({
                title: '¿Estás seguro de borrar?',
                text: "No se podrá revertir la acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, estoy seguro!',
                cancelButtonText: 'No, cancelar!',
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await borrarMedia(id);
                        listarMedias();
                    } catch (e) {
                        console.error(e);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo eliminar la información!',
                            footer: e.message
                        });
                    } finally {
                        setLoader(false);
                    }
                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'El archivo ha sido eliminado.',
                        'success'
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'Tu archivo está a salvo :)',
                        'error'
                    );
                    setLoader(false);
                }
            });
        };
    
        return (
            <>
                <Title title={'Medias'} />
                {loader && <Spinner />}
                <Table
                    medias={medias}
                    borrarMediaPorId={borrarMediaPorId}
                    cargarMedia={cargarMedia} // Pasamos la función para editar
                />
                <ButtonModal title='Nueva media' />
                <Modal
                    media={media}
                    change={handleChange}
                    guardar={guardar}
                    clearForm={clearForm}
                    editing={editing}
                />
            </>
        );
    }