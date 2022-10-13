import './ActivitiesStyles.css'

import { Link } from 'react-router-dom';

const Activity = ({ id, name, image }) => {
    return (
        <div className='activity-container-frontoffice rows-container-activities-frontoffice'>
            <p className='activity-frontoffice-container-p__name'>{name}Nombre de la actividad</p>
            <img src={image} alt='imagen de la actividad' className='activity-frontoffice-container__img'/>
            <div className='activity-frontoffice-button-container'>
                {<Link to={'/backoffice/activities/' + id}>
                    <button type='button' className='btn-activities-frontoffice'>Conocer más</button>
                </Link>}
            </div>
        </div>
    )
} 

export default Activity;