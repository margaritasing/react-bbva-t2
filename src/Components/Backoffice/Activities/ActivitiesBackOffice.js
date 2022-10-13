/*Al ingresar a la ruta /backoffice/activities, mostrará el listado de Actividades de la ONG para el usuario administrador en una tabla.
El mismo tendrá datos mockeados para representar los datos, que posteriormente se obtendrán desde el endpoint de listado de Actividades. 
La tabla mostrará los campos name, image, y createdAt, y las acciones para eliminar y editar. 
En la sección superior, mostrará un componente <Link> que redirigirá a la ruta /backoffice/activities/create.*/
import './ActivitiesBackOffice.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Activity from './Activity';
import '../../../general-styles.css';
import { Delete, Get } from '../../../Services/privateApiService';

const ActivitiesBackOffice = () => {
    const [activities, setActivities] = useState([]);
    const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ACTIVITIES;

    const getActivities = async () => {
        let res = await Get(endpoint);
        setActivities(res.data.data)
    }

    const handleDelete = async (id) => {
        try {
            await Delete(`${endpoint + '/' + id}`);
            await getActivities();
            //actualizo la lista paraque se recargue el componente sin la actividad eliminada.
            setActivities(activities.filter(activity => activity.id !== id));
        } catch (err) {
            alert('error')
        }
    }
    
    //Se listan las activities al cargar el componente
    useEffect(() => {
        getActivities()
    },[setActivities])

    return (
        <>
        <div className="container-create-activity">
            <Link to={'/backoffice/activities/create'} className='container-create-activity__a'>
                <button type='button' className= 'create-backoffice-button button-create'>Crear nueva actividad</button>
            </Link>
        </div>
        <div className='list-container'>
            <h1 className='list-container__h1'>Lista de actividades</h1>
            <section className='list-container__section rows-container'> 
                <p>Nombre</p>
                <p>Imagen</p>
                <p>Creado</p>
            </section>
            {
                activities.map((activity) => {
                    return (
                        <Activity 
                            id={activity.id} 
                            name={activity.name} 
                            createdAt={activity.created_at} 
                            image={activity.image} 
                            key={activity.id} 
                            handleDelete={handleDelete}
                        />
                    )
                })
            }
        </div>
        </>
    )
}

export default ActivitiesBackOffice;