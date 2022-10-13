import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Get, Post, Put} from '../../../Services/privateApiService';
import '../../FormStyles.css';
import './ActivitiesForm.css';
import './ActivitiesBackOffice.css';
import Alert from '../../Alerts/Alerts';

const ActivitiesForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        image: '',
        description: '<p> </p>'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const url= process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ACTIVITIES;

    const fetchData = async() =>{
        if(id){
            const res = await Get(url+'/'+id)
            const {name, image, description} = await res.data.data
            setInitialValues({
                description, image, name
            })
        }
        setLoading(false);
    };
     
    // Estimado para obtener la data de edicion 
    useEffect ( () => {
        setLoading(true);
        fetchData()
    }, []);//pendiente ver porq no renderiza del todo bien


    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setInitialValues({...initialValues, name: e.target.value});
        }
    }

    const isBlank = () => {
        let keys = Object.keys(initialValues);
        for (let i = 0; i < keys.length-1; i++) {
            let str = initialValues[keys[i]];
            if (!str || /^\s*$/.test(str)) {
                setErrors({[keys[i]]: 'El campo ' + keys[i] + ' no puede estar vacio'})
                Alert('Error', 'Error: el campo ' + keys[i] + ' no puede estar vacio', 'error')
                return true;
            }
        } 
        if (initialValues.description === "<p> </p>"){
            setErrors({'descripcion': 'El campo descripcion no puede estar vacio'})
            Alert('Error', 'Error: el campo descripcion no puede estar vacio', 'error')
            return true;
        }     
    }

    function validateImageFormat() {
        const isPng = initialValues.image.substring(11,14) === 'png' 
                    || initialValues.image.substring(initialValues.image.length -3, initialValues.image.length) === 'png';
        const isJpg = initialValues.image.substring(11,14) === 'jpg' 
                    || initialValues.image.substring(initialValues.image.length -3, initialValues.image.length) === 'jpg';
        const isJpeg = initialValues.image.substring(11,15) === 'jpeg' 
                    || initialValues.image.substring(initialValues.image.length -4, initialValues.image.length) === 'jpeg';;
    
        if (isPng || isJpeg || isJpg) {
            return true;
        } 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isBlank()){
            return;
        }
        if(!validateImageFormat(initialValues.image)){
            setErrors({'image': 'El fomato de la imagen no es valido. Solo se aceptan jpg y png'});
            Alert('Error', 'El fomato de la image no es valido. Solo se aceptan jpg y png', 'error')
            return;
        }

        //caso edit
        if(id){
            Put(url + '/' + id, initialValues);
            Alert('Exito', "Actividad " + id + "actualizada exitosamente", 'success');
        }
        //caso create
        else{
            Post(url, initialValues);
            Alert('Exito',"Actividad creada satisfactoriamente",'success');
        }
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
    
    return (
        <form className="form-container form-activity" onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name} onChange={handleChange} placeholder="Activity Title"></input>
            <div className='input-field img-input-div'>
                <img className='activity-img-prev'src={initialValues.image} alt='Imagen Actividad'/>
                <input className="img-select" type="file" name="image" onChange={handleImage} placeholder="Activity Image"></input>
            </div>
            <CKEditor
                    editor={ ClassicEditor }
                    data={ initialValues.description }
                    name="description"
                    onChange={( event, editor ) => {
                        const data = editor.getData();
                        setInitialValues((prevState)=>({...prevState, description: data}));
                    } }
                />
            <button className="create-backoffice-button button-create" type="submit">Send</button>
        </form>
    );
}

 
export default ActivitiesForm;