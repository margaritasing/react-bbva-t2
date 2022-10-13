import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Contact.css'
import ContactForm from './ContactForm'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { getIsAdmin } from '../../Backoffice/RoutesSecurity/RoutesSecurity'


import MapView from '../Map/MapView'
import Alert from '../../Alerts/Alerts';

const Contact = (props) => {
  const history = useHistory();

  const checkIsAdmin = async () => {
    let response = await getIsAdmin();
    if (response === 'true') {
      history.push("/backoffice/dashboard")
    }
  }

  useEffect(() => {
    checkIsAdmin();
  }, [])

  const { 
    address, 
    instagram_url, 
    facebook_url, 
    linkedin_url, 
    twitter_url, 
    phone } = props

  const iconProp = { fontSize: 40, margin:1 }
  
  const [coordinates, setCoordinates] = useState({
    longitude: 0,
    latitude: 0
  })

  //fluj de la obtención de geolocation del usuario
  const getMapData = () => {
    //se le pregunta al usuario si permite obtener su ubicación. Si acepta se setean el estado de coordenadas. Si no, se lanza un error.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
      },
      (error) => {
        Alert('Tu ubicación no se mostrará', 'Si quieres que tu ubicación se visualice en el mapa, permitela y vuelva a intentarlo.', 'warning');
      },
      { 
        enableHighAccuracy: true //esta linea permite usar la ubicación del gps de los dispositivos para mayor precisión
      }); 
  }
  useEffect(() => {
    getMapData()
  }, [])

  return (
    <div className='contact-container'>
      <div className='contribuir-section'>
        <h1 className='contact-title'>¿Queres contribuir?</h1>

        <Link to='/donar' className='contact__link'>
          <button type='button' className='primary-button contact__button'>
              Contribuir
          </button>
        </Link>
      </div>

      <h1 className='contact-title'>¡Contactate con nosotros!</h1>

      <div className='contact__data-section'>
          <p>Direccion: <b>{ address || 'direccion' }</b> </p>
          <p>Teléfono de contacto: <b> { phone || 'telefono' } </b></p>

        <ul className='contact__media-list'>
          <li className='contact__media-list-item'>
            <InstagramIcon sx={iconProp}/> 
            { instagram_url || 'instagram_url'}
          </li>

          <li className='contact__media-list-item'>
            <FacebookIcon sx={iconProp} color="primary"/> 
            { facebook_url || 'facebook_url'}
          </li>

          <li className='contact__media-list-item'>
            <LinkedInIcon sx={iconProp} color="primary"/> 
            { linkedin_url || 'linkedin_url'}
          </li>

          <li className='contact__media-list-item'>
            <TwitterIcon sx={iconProp} color="primary"/>
            { twitter_url || 'twitter_url'} 
          </li>
        </ul>
      </div>

      <h2 className='contact-title' >Puedes dejarnos tu consulta:</h2>
     
      <ContactForm/>
      <h3 className='contact-title'>Visitanos! Queremos conocerte</h3>
      <MapView coordinates={coordinates} /> 
    </div>
  )
}

export default Contact