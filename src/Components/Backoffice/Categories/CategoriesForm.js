import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CategoriesForm.css';
import { Get, Put, Post } from '../../../Services/privateApiService';
import { validateHasContent, validateImageFormat, validateLength } from '../../../Services/validatorsService';
import placeholder from '../../../assets/placeholder-image.png'
import Alert from '../../Alerts/Alerts';

const endpoint = process.env.REACT_APP_BASE_URL +  process.env.REACT_APP_CATEGORIES;

const CategoriesForm = () => {
    //si existe un id es un formulario de actualizacion, sino de creacion
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({
        name: '',
        image: '',
        description: '',
    })

    const getCategory = async () => {
        if(id) {
          const response = await Get(endpoint + `/${id}`);
          const { name, image, description } = response.data.data;
          setInitialValues((prevState) =>({...prevState, name, image, description }));
        }
    }
    
    useEffect(() => {
        getCategory();
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
        name !== "image" ? setInitialValues({...initialValues, [name]: value}) : imageABase64(e);
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
            const { data } = response; 
            if(data){
                Alert("Exito", data.message, "success")  
            }else {
                Alert("Algo salió mal", response.message , "error")
            }
               
         }
    }

    return (
        <div className='category-form-container'>  
            <form className="category-form" onSubmit={handleSubmit}>
                <h1 className='category-form__title'>{ id? "Actualizar una categoría" : "Crear nuevo categoría"}</h1>

                <input className="category-form__input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Category Title" required/>
                <textarea className="category-form__input-field" name="description" value={initialValues.description} onChange={handleChange} placeholder="Category description" required/>

                <div className='category-image-selection-section'>

                {initialValues.image? (
                    <div className='category-form-container-img'>
                        <img className='category-form__img' src={initialValues.image} alt={`${initialValues.name} category`}/>
                    </div>
                    ) : (
                    <div className='category-form-container-img'>
                        <img className='category-form__img placeholder' src={placeholder} alt="placeholder"/>
                    </div>
                    )
                }

                <input className="category-form__input-field" type="file" accept=".jpg, .png" name="image" onChange={handleChange} required/>
                </div>

                <button className="create-backoffice-button" type="submit">{(id ? 'Actualizar':'Crear') + ' Categoría'}</button>
            </form>
        </div>
    );
}
 
export default CategoriesForm;