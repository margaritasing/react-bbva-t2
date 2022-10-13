import React from 'react'
import './TestimonialsList.css'
import { Link } from 'react-router-dom'
import TestimonialsTable from './TestimonialsTable'

const TestimonialsList = () => {
  return (
    <div className='testimonials-screen'>
      <div className='testimonials-backoffice-container'>

        <h1 className='testimonials-back-title'>Testimonios</h1>

        <div className='testimonials__upper-bar'>
          <Link to='/backoffice/testimonials/create'>
              <button className='create-backoffice-button'>Crear nuevo testimonio</button>
          </Link>
        </div>

        <TestimonialsTable/>
        
      </div>
    </div>
  )
}

export default TestimonialsList