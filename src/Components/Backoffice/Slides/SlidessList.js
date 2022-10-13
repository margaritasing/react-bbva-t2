import React from 'react'
import './SlidesList.css'
import { Link } from 'react-router-dom'
import SlidesTable from './SlidesTable'

const SlidesList = () => {
  return (
    <div className='slides-screen'>
      <div className='slides-backoffice-container'>

        <h1 className='slides-back-title'>Slides</h1>

        <div className='slides__upper-bar'>
          <Link to='/backoffice/slides/create'>
              <button className='create-backoffice-button'>Crear nuevo Slide</button>
          </Link>
        </div>

        <SlidesTable/>
        
      </div>
    </div>
  )
}

export default SlidesList