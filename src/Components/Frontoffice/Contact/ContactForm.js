import React, { useState, useEffect } from 'react'
import './ContactForm.css'
import { Post } from '../../../Services/publicApiService';
import FormInputContact from './FormInputContact'
import Alert from '../../Alerts/Alerts'

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ENDPOINT = process.env.REACT_APP_CONTACTS;

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const postContact = async () => await Post(BASE_URL + ENDPOINT, formData);

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      postContact();
      Alert("Éxito!", "Se ha enviado su consulta", "success")
    } catch (error) {
      Alert("Error", "Hubo un error mientras realizaba la consulta", "error")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Nombre completo",
      pattern: `^[A-Za-z]{10,}$`,
      errorMessage: "El nombre debe ser más largo"
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email inválido"
    },
    {
      name: "phone",
      type: "text",
      placeholder: "Phone",
      pattern: `[0-9]{8,}`,
      errorMessage: `Número de télefono invalido`
    },
    {
      name: "message",
      type: "text",
      placeholder: "Consulta",
      errorMessage: `Campo obligatorio`
    }
  ];

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "50px" }}>

      {inputs.map((input, index) => (
        <FormInputContact
          key={index}
          {...input}
          value={formData[input.name]}
          onChange={handleChange}
        />
      ))}

      <button className="secondary-button" type="submit">Enviar</button>
    </form>
  )
}

export default ContactForm