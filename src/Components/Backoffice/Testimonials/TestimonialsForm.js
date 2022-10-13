import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TestimonialsForm.css';
import { Get, Put, Post } from '../../../Services/privateApiService';
import { validateHasContent, validateImageFormat, validateLength } from '../../../Services/validatorsService';
import placeholder from '../../../assets/placeholder-image.png'
import Alert from '../../Alerts/Alerts';

const endpoint = process.env.REACT_APP_BASE_URL +  process.env.REACT_APP_TESTIMONIALS;

const TestimonialForm = () => {
    //definir si es un testimonio ya creado (update) o nuevo
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        name: '',
        image: '',
        description: '',
    });

    const getTestimonial = async () => {
        if(id) {
          const res = await Get(endpoint + `/${id}`);
          const { name, image, description } = res.data.data;
          setInitialValues((prevState) =>({...prevState, name, image, description }));
        }
      }

    useEffect(() => {
        getTestimonial();
    }, [])
    
    const imageABase64 = (element) => {
        if(!validateImageFormat(element.target.value)) {
          alert("Formato de imagen inválido, debe ser .png o .jpg");
          element.target.value = '';
          return false;
        }
        if(!element||!element.currentTarget.files)
            return;
        var file = element.currentTarget.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          setInitialValues({...initialValues, image: reader.result})
        }
        reader.readAsDataURL(file);    
      }

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        name !== "image" 
        ? setInitialValues({...initialValues, [name]: value}) 
        : imageABase64(e);
      }
    
      const validateForm = () => {
        for (const field in initialValues) {
          const fieldValue = initialValues[field];
          if(!validateHasContent(fieldValue)){
            alert('Todos los campos son obligatorios');
            return false;
          }
        }
    
        if(!validateLength(initialValues.name, 4)) {
          alert("El campo Name debe tener al menos 4 caracteres de longitud");
          return false;
        }
    
        return true;
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
          const response=  id ? await Put(endpoint + `/${id}`, initialValues) : await Post(endpoint, initialValues);  
          const { data } = await response; 

          Alert("Exito", data.message, "success")  
        }
    }

    return (
    <div className='testimonial-form-container'>  
        <form className="testimonial-form" onSubmit={handleSubmit}>
            <h1 className='testimonial-form__title'>{ id? "Actualizar un Testimonio" : "Crear nuevo Testimonio"}</h1>
            
            <input className="testimonial-form__input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Testimonial Title" required/>
            <textarea className="testimonial-form__input-field" name="description" value={initialValues.description} onChange={handleChange} placeholder="Testimonial description" required/>
            
            <div className='testimonial-image-selection-section'>
              
              {initialValues.image? (
                  <div className='testimonial-form-container-img'>
                    <img className='testimonial-form__img' src={initialValues.image} alt={`${initialValues.name} testimonial`}/>
                  </div>
                ) : (
                  <div className='testimonial-form-container-img'>
                    <img className='testimonial-form__img placeholder' src={placeholder} alt="placeholder"/>
                  </div>
                )
              }

              <input className="testimonial-form__input-field" type="file" accept=".jpg, .png" name="image" onChange={handleChange} required/>
            </div>

            <button className="create-backoffice-button" type="submit">{(id ? 'Actualizar':'Crear') + ' Testimonio'}</button>
        </form>
    </div>
    );
}
 
export default TestimonialForm;