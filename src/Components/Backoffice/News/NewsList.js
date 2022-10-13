import '../Activities/ActivitiesBackOffice.css';
import '../../../general-styles.css';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Delete, Get } from '../../../Services/privateApiService';
import Alert from '../../Alerts/Alerts';
import Spinner from '../../Spinner/Spinner';

import News from './News.js';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_NEWS;
    const [loading, setLoading] = useState(true);


    const handleDelete = async (id) => {
        try {
            await Delete(`${endpoint + '/' + id}`);
            await getNews();
            setNews(news.filter(news => news.id !== id));
        } catch (err) {
            alert('error')
        }
    }

    const getNews = async () => {
        try {
            const res = await Get(endpoint);
            setNews(res.data.data);
        } catch (err) {
            Alert("Something went wrong. Please try again", "There was an error loading the userList", "error");
        }
        setLoading(false);
    }

    useEffect(() => {
        getNews();
    },[])

    return (
        <>
            {loading ? (<Spinner />):(
            <>
                <div className="container-create-activity">
                    <Link to={'/backoffice/news/create'} className='container-create-activity__a'>
                        <button type='button' className= 'create-backoffice-button button-create'>Crear nueva novedad</button>
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
                        news.map((news) => {
                            return (
                                <News 
                                    id={news.id} 
                                    name={news.name} 
                                    createdAt={news.created_at} 
                                    image={news.image} 
                                    key={news.id} 
                                    handleDelete={handleDelete}
                                />
                            )
                        })
                    }
                </div>
                </>
            )} 
        </>
    )
}

export default NewsList;