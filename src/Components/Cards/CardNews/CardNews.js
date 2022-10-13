import { Link } from "react-router-dom";
import './CardNews.css'

const CardNews = ({ img, name, content }) => {
    return (
        <div className="card card-new">
            <img
                src={img}
                alt={name}
                className="card-new-img"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = false;
                    currentTarget.src = "https://uxwing.com/wp-content/themes/uxwing/download/07-web-app-development/image-not-found.svg";
                    currentTarget.className = "card-img noLoaded"
                }}
            />
            <div className="card-news-right-container">
                <p className='card-news-desc'
                    dangerouslySetInnerHTML={{ __html: content }}>
                </p>
                <Link className="secondary-button" to='/news'>Ver Novedades</Link>
            </div>
        </div>
    )
}

export default CardNews