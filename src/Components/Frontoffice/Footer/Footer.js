import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import axios from 'axios';
import {ReactComponent as LogoFacebook} from '../../../assets/facebook.svg';
import {ReactComponent as LogoInstagram} from '../../../assets/instagram.svg';
import {ReactComponent as LogoTwitter} from '../../../assets/twitter.svg';
import {ReactComponent as LogoLinkedIn} from '../../../assets/linkedin.svg';
import {ReactComponent as LogoOng} from '../../../assets/ong.svg';
import { getIsAdmin } from '../../Backoffice/RoutesSecurity/RoutesSecurity'

const Footer = () => {
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkedIn] = useState('');
    const [twitter, setTwtitter] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const getData = async () => {
        try {
            let res = await axios.get('https://ongapi.alkemy.org/api/organization');
            setInstagram(res.data.data.instagram_url)
            setFacebook(res.data.data.facebook_url)
            setLinkedIn(res.data.data.linkedin_url)
            setTwtitter(res.data.data.twitter_url)
        } catch (error) {
            alert(error.message + '\n\n' + 'Hubo un error, vuelva a intentarlo más tarde');
        }
    }

  
    const checkIsAdmin = async () => {
        let response = await getIsAdmin();
        if (response === 'true') {
        setIsAdmin(true)
        }
    }

    useEffect (() => {      
        getData();
        checkIsAdmin();
    }, [])


    return (
        <footer className="footer-container">
            <div className='logo-container'>
                <hr className="footer-container__hr"/>
                <LogoOng className='logo-container__svg'/>
                <hr className="footer-container__hr"/>
            </div>
             <ul className='list-container-footer'>
                <li className='list-container__li'><Link to='/'  className='link-public-header'>Inicio</Link></li>
                <li className='list-container__li'><Link to='/about' className='link-public-header'>Nosotros</Link></li>
                <li className='list-container__li'><Link to='/news' className='link-public-header'>Novedades</Link></li>
                <li className='list-container__li'><Link to='/testimonials' className='link-public-header'>Testimonios</Link></li>
                {isAdmin || <li className='list-container__li'><Link to='/contact' className='link-public-header'>Contacto</Link></li>}
                <li className='list-container__li'><Link to='/donar' className='link-public-header'>Contribuye</Link></li>
                <li className='list-container__li'><Link to='/activities' className='link-public-header'>Actividades</Link></li>
             </ul>
            <hr className="footer-container__hr"/>
            <div className='socialmedia-container'>
                <a target="_blank" href={instagram} className='socialmedia-container__a' rel="noreferrer">
                    <LogoInstagram className='socialmedia-container__a-svg'/>
                </a>
                <a target="_blank" href={facebook} className='socialmedia-container__a' rel="noreferrer">
                    <LogoFacebook className='socialmedia-container__a-svg'/>
                </a>         
                <a target="_blank" href={twitter} className='socialmedia-container__a' rel="noreferrer" >
                    <LogoTwitter className='socialmedia-container__a-svg'/>
                </a>
                <a target="_blank" href={linkedin} className='socialmedia-container__a' rel="noreferrer"> 
                    <LogoLinkedIn className='socialmedia-container__a-svg'/>
                </a>
            </div>
            <div className='copyright-container'>
                <p className='copyright-container__p'>2022 by Alkemy. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;