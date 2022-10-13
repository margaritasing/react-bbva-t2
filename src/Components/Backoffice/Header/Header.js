import { Link } from 'react-router-dom';
import './Header.css';
import Sidebar from './Sidebar/Sibebar';

export default function Header() {
    return (
        <header className='header-backoffice-container'>
            <Sidebar />
            <Link to={'/backoffice/dashboard'}>
                <img src='/logo.svg' alt='logo-ONG' />
            </Link>
        </header>
    )
}