import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Get } from '../../../Services/privateApiService';
import { Post } from '../../../Services/publicApiService';
import axios from 'axios';
import './SlidesForm.css';
import Alert from '../../Alerts/Alerts';


const SlidesForm = () => {

    const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SLIDES
    let { id } = useParams();
    const [error, setError] = useState('')
    const [initialValues, setInitialValues] = useState({
        name: '',
        description: '',
        order: '',
        image: '',
    });

    const fetchSlides = async () => {
        if(id) {
            const res = await Get(`${endpoint + '/' + id}`)
            const {name, description, order, image} = res.data.data
            setInitialValues({
                name, description, order, image,
            })
        }
    }

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleChange = (e) => {
        setInitialValues({
            ...initialValues,
            [e.target.name] : e.target.value
        })
    }

    const handleImage = (element) => {
        if(!element||!element.currentTarget.files)
            return;
        var file = element.currentTarget.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setInitialValues({...initialValues, image: reader.result})
        }
        reader.readAsDataURL(file);
        
      }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const body = {
            name: initialValues.name.toString(),
            description: initialValues.description.toString(),
            order: id ? id.toString() : initialValues.order.toString(),
            image: initialValues.image.toString(),
        }

        if(validate() && validateImageFormat()) {
            if(id) {
                try{
                    axios.put(endpoint + '/' + id, body, {});
                    setError('')
                    Alert('Exito', 'Slide editada con exito', 'success');
                } 
                catch(err){
                    setError(err)
                }
            } else {
                try{
                    Post(endpoint, body)
                    setError('')
                    Alert('Exito', 'Slide creada con exito', 'success');
                } 
                catch(err){
                    setError(err)
                }
            }     
        }
    }

    const validate = () => {
        if(initialValues.name.length < 4) {
            setError('El nombre es demasiado corto')
            return false
        }
        
        if(!initialValues.description) {
            setError('La descripción no puede quedar vacía')
            return false
        }
        return true 
    }

    function validateImageFormat() {

        const isPng = initialValues.image.substring(11,14) === 'png' 
                    || initialValues.image.substring(initialValues.image.length -3, initialValues.image.length) === 'png';
        const isJpg = initialValues.image.substring(11,15) === 'jpeg' 
                    || initialValues.image.substring(initialValues.image.length -4, initialValues.image.length) === 'jpeg';;
    
        if (isPng || isJpg) {
            return true;
        } else {
            setError('Archivo inválido')
            return false;
        }
    }

    return (
        <div className='main'>
            <div className='container'>
                {id ? <h1 className="title">Editar Slide</h1> : <h1 className="title">Crear Slide</h1>}
                <form className="form-container" onSubmit={handleSubmit}>
                    {<p className='error'>{error}</p>}
                    <input className="input" type="text" name="name" value={initialValues.name || ''} onChange={handleChange} placeholder="Slide Title"></input>
                    <input className="input" type="text" name="description" value={initialValues.description || ''} onChange={handleChange} placeholder="Write the description"></input>
                    <input type="file" name="image" onChange={handleImage}></input>
                    <button className="primary-backoffice-button" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}
 
export default SlidesForm;