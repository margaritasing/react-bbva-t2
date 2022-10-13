import './Sidebar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);
    const stylesShowHideMenu = {
        transform: isOpen ? 'translateX(0)' : 'translateX(-100vw)'
    }
    return ( 
        <div className="sidebar">
            <button className="sidebar-menu" onClick={() => setIsOpen(!isOpen)}>
                { isOpen || 
                <svg className="sidebar-menu__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                }
                { isOpen && 
                <svg className="sidebar-menu__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
                }
            </button>
            <ul style={stylesShowHideMenu} className="sidebar-menu__list">
                <li><Link to='/backoffice/activities' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Actividades</Link></li>
                <li><Link to='/backoffice/categories' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Categorías</Link></li>
                <li><Link to='/backoffice/members' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Miembros</Link></li>
                <li><Link to='/backoffice/news' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Novedades</Link></li>
                <li><Link to='/backoffice/organization' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Organización</Link></li>
                <li><Link to='/backoffice/slides' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Slides</Link></li>
                <li><Link to='/backoffice/testimonials' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Testimonios</Link></li>
                <li><Link to='/backoffice/users' className="sidebar-menu__link" onClick={() => setIsOpen(false)}>Usuarios</Link></li>
            </ul>
        </div>
     );
}

export default Sidebar;