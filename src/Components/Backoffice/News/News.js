import '../Activities/ActivitiesBackOffice.css';
import { Link } from 'react-router-dom';

const News = ({ id, name, image, createdAt, handleDelete }) => {
    return (
        <div className='activity-container rows-container'>
            <p className='activity-container-p__name'>{name}</p>
            <img src={image} alt='imagen de la actividad' className='activity-container__img'/>
            <p className='activity-container-p__createAt'>{createdAt}</p>
            <div className='button-container'>
                <Link to={'/backoffice/news/edit/' + id}>
                    <button type='button' className='primary-backoffice-button button-container__edit'>Editar</button>
                </Link>
                <button type='button' className='button-container__delete secondary-backoffice-button' onClick={()=>handleDelete(id)}>Eliminar</button>
            </div>
        </div>
    )
} 

export default News;