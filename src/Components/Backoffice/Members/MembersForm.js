import React, { useState, useEffect } from 'react';
import '../../FormStyles.css';
import { validateImageFormat, validateHasContent, validateSocialNetworkUrl, validateLength } from '../../../Services/validatorsService';
import { Post, Put, Get } from '../../../Services/privateApiService';
import { useParams } from 'react-router-dom';
import Alert from '../../Alerts/Alerts';

const MembersForm = () => {

  const baseURL = process.env.REACT_APP_BASE_URL;
  const endpoint = process.env.REACT_APP_MEMBERS;

  const path = baseURL + endpoint;

  const { id } = useParams();

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    image: '',
    linkedinUrl: '',
    facebookUrl: ''
  })

  const getMember = async () => {
    if(id) {
      const response = await Get(path + `/${id}`);
      const memberData = response.data.data;
      setFormValues({...memberData});
    } else {
      throw new Error("El miembro no existe")
    }
  }

  useEffect(() => {
    getMember();
  }, [])

  const imageABase64 = (element) => {
    if(!validateImageFormat(element.target.value)) {
      Alert('Error',"Formato de imagen inválido, debe ser .png o .jpg", 'error');
      element.target.value = '';
      return false;
    }
    if(!element||!element.currentTarget.files)
        return;
    var file = element.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      setFormValues({...formValues, image: reader.result})
    }
    reader.readAsDataURL(file);    
  }

  const handleChange = (e) => {
    e.target.name !== "image" 
    ? setFormValues({...formValues, [e.target.name]: e.target.value}) 
    : imageABase64(e);
  }

  const validateForm = () => {
    for (const field in formValues) {
      const fieldValue = formValues[field];
      if(!validateHasContent(fieldValue)){
        Alert('Error','Todos los campos son obligatorios', 'error');
        return false;
      }
    }

    if(!validateLength(formValues.name, 4)) {
      alert("El campo Name debe tener al menos 4 caracteres de longitud");
      return false;
    }

    if (!validateSocialNetworkUrl('facebook', formValues.facebookUrl)) {
      alert("Perfil de Facebook inválido, ingresa una URL correcta, ej: \n'https://www.facebook.com/maria-garcia'");
      return false;      
    }

    if (!validateSocialNetworkUrl('linkedin', formValues.linkedinUrl)) {
      alert("Perfil de LinkedIn inválido, ingresa una URL correcta, ej: \n'https://www.linkedin.com/maria-garcia'");
      return false;      
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(validateForm()) {
      let response;
        id 
        ? response = await Put(path + `/${id}`, formValues)
        : response = await Post(path, formValues);

       const { data } = await response; 

       Alert("Exito", data.message, "success")     
  }
}
  

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input className="input-field" type="text" name="name" value={formValues.name} onChange={handleChange} placeholder="Nombre" required></input>
      <input className="input-field" type="text" name="description" value={formValues.description} onChange={handleChange} placeholder="Descripción" required></input>
      <input className="input-field" type="file" accept=".jpg, .png" name="image" onChange={handleChange} required></input>
      <input className="input-field" type="url" name="linkedinUrl" value={formValues.linkedinUrl} onChange={handleChange} placeholder="Perfil de LinkedIn" required></input>
      <input className="input-field" type="url" name="facebookUrl" value={formValues.facebookUrl} onChange={handleChange} placeholder="Perfil de Facebook" required></input>
      <button className="primary-button" type="submit">Send</button>
    </form>
  );
}
 
export default MembersForm;