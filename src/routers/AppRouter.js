import React from 'react'
import NavBar from "../components/ui/NavBar"
import { Route, Routes } from 'react-router-dom'
import Director from '../components/directores/Director.js'
import Genero from '../components/generos/Genero.js'
import Media from '../components/medias/Media.js'
import Productora from '../components/productoras/Productora.js'
import Tipo from '../components/tipos/Tipo.js'
import NotFound from '../components/ui/NotFound'
import Footer from '../components/ui/Footer'

export default function AppRouter() {
  return (
    <div>
         <NavBar />
         <div className='container'>
            <Routes>
                <Route path='/directores' element={<Director />}/>
                <Route path='/' element={<Genero />}/> 
                <Route path='/medias' element={<Media />}/> 
                <Route path='/productoras' element={<Productora />}/> 
                <Route path='/tipos' element={<Tipo />}/>
                <Route path='*' element={<NotFound />}/>    
            </Routes> 
         </div>
         <Footer />
    </div>
  )
}
