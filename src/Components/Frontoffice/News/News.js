import { useState, useEffect } from 'react';
// CSS
import "./News.css";
// SERVICES
import { Get } from '../../../Services/publicApiService'

const New = () => {

    const [news, setNews] = useState([]);
    const { REACT_APP_BASE_URL, REACT_APP_NEWS } = process.env

    const getNews = async () => {
        const response = await Get(REACT_APP_BASE_URL + REACT_APP_NEWS)
        setNews(response.data.data);
    }

    useEffect(() => {
        getNews();
    }, [])

    return (
        <div className='container-frontOffice-news'>
            <h1 className='new-frontOffice-section-title'>Novedades</h1>
            {
                news.map((newItem) => {
                    const { name, image, content, id } = newItem;
                    return (
                        <div key={id}>
                            <h1 className='new-frontOffice-title'>{name}</h1>
                            <img className='new-frontOffice-image' src={image} alt={name} />
                            <p className='new-frontOffice-description' dangerouslySetInnerHTML={{ __html: content }}></p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default New