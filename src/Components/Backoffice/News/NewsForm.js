import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Get, Post, Put} from '../../../Services/privateApiService';
import '../../FormStyles.css';
import './NewsForm.css';
import Alert from '../../Alerts/Alerts'

const NewsForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        image: '',
        content: '<p> </p>',
        category_id: ''
    });
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState();
    const [categories, setCategories] = useState([]);

    const { id } = useParams();
    const url = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_NEWS;
    const urlCategories = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_CATEGORIES;


    const fetchData = async() =>{
        if(id){
            const res = await Get(url+'/'+id)
            const {name, image, content, category_id} = await res.data.data
            setInitialValues({
                name, image, content, category_id
            })
        }
        await Get(urlCategories)
        .then( (res) =>{
            setCategories(res.data.data);
        });  
        setLoading(false); 
    };
     
    // Estimado para obtener la data de edicion 
    useEffect ( () => {
        setLoading(true);
        fetchData()
    }, []);

    const handleChange = (e) => {
            setInitialValues({...initialValues, [e.target.name]: e.target.value})
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

    const isBlank = () => {
        let keys = Object.keys(initialValues);
        for (let i = 0; i < keys.length-2; i++) {
            let str = initialValues[keys[i]];
            if (!str || /^\s*$/.test(str)) {
                setErrors({[keys[i]]: 'El campo ' + keys[i] + ' no puede estar vacio'})
                Alert('Error','Error: el campo ' + keys[i] + ' no puede estar vacio','error')
                return true;
            }
        } 
        if (initialValues.content === "<p> </p>"){
            setErrors({'content': 'El campo contenido no puede estar vacio'})
            Alert('Error','Error: el campo contenido no puede estar vacio','error')
            return true;
        }     
        if (initialValues.category_id === ""){
            setErrors({'category_id': 'Debe seleccionar una categoria'})
            Alert('Error','Error: Debe seleccionar una categoria','error')
            return true;
        }
    }

    function validateImageFormat() {

        const isPng = initialValues.image.substring(11,14) === 'png' 
                    || initialValues.image.substring(initialValues.image.length -3, initialValues.image.length) === 'png';
        const isJpg = initialValues.image.substring(11,15) === 'jpeg' 
                    || initialValues.image.substring(initialValues.image.length -4, initialValues.image.length) === 'jpeg';;
    
        if (isPng || isJpg) {
          return true;
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isBlank()){
            return;
        }
        if(!validateImageFormat(initialValues.image.result)){
            setErrors({'image': 'El fomato de la imagen no es valido. Solo se aceptan jpg y png'});
            Alert('Error','El fomato de la image no es valido. Solo se aceptan jpg y png', 'error')
            return;
        }
        if(id){
            Put(url + '/' + id, initialValues);
            Alert('Exito',"Actividad " + id + "actualizada exitosamente", 'success');
        }
        //caso create
        else{
            Post(url, initialValues);
            Alert('Exito',"Actividad creada satisfactoriamente",'success');
        }
    }

    return (
        <form className="form-container form-news" onSubmit={handleSubmit}>
            <input className="input-field" type="text" name="name" value={initialValues.name || ''} onChange={handleChange} placeholder='News Title'></input>
            <div className='input-field img-input-div'>
                <img className='activity-img-prev'src={initialValues.image} alt='Imagen Novedad'/>
                <input className="img-select" type="file" name="image" onChange={handleImage} placeholder="News Image"></input>
            </div>
            <CKEditor
                    editor={ ClassicEditor }
                    data={ initialValues.content }
                    name="content"
                    onChange={( event, editor ) => {
                        const data = editor.getData();
                        setInitialValues((prevState)=>({...prevState, content: data}));
                    } }
                />
            <select className="select-field " name="category" value={initialValues.category_id || ''} onChange={e => setInitialValues({...initialValues, category_id: e.target.value})}>
                <option value="" disabled>Select category</option>
                {categories.map( (category) => {
                    const {id, description} = category;
                    return(
                        <option value={id} key={id}>{description}</option>
                    )
                })}
            </select>
            <button className="create-backoffice-button button-create" type="submit">Send</button>
        </form>
    );
}
 
export default NewsForm;