import { useState, useEffect } from 'react';
// CSS
import './Home.css'
// Components
import MembersList from '../Members/MembersList'
import Card from '../../Cards/Card/Card'
import CardNews from '../../Cards/CardNews/CardNews';
import Spinner from '../../Spinner/Spinner';
import Alert from '../../Alerts/Alerts';
// Services
import { Get } from '../../../Services/publicApiService'
import { Link } from 'react-router-dom';
//Header y footer
import PublicHeader from '../PublicHeader/PublicHeader';
import Footer from '../Footer/Footer';
//Slider
import Slider from './Slider/Slider';

const Home = () => {
    const [homeData, setHomeData] = useState([]);
    const [testimonialsData, setTestimonialsData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { REACT_APP_BASE_URL, REACT_APP_ORGANIZATION, REACT_APP_TESTIMONIALS, REACT_APP_NEWS } = process.env

    const getHomeData = async () => {
        try{
            const res = await Get(REACT_APP_BASE_URL + REACT_APP_ORGANIZATION);
            setHomeData(res.data.data);
            setIsLoading(false);
        }catch(error){
            Alert("Algo salio mal. Por favor intente de nuevo", "Hubo un error al hacer las peticiones", "error");
        }
    };

    const getTestimonials = async () => {
        try {
            const res = await Get(REACT_APP_BASE_URL + REACT_APP_TESTIMONIALS + `?limit=5`);
            setTestimonialsData(res.data.data);
            setIsLoading(false);
        } catch (error) {
            Alert("Algo salio mal. Por favor intente de nuevo", "Hubo un error al hacer las peticiones", "error");
        }
    };

    const getNews = async () => {
        try{
            const res = await Get(REACT_APP_BASE_URL + REACT_APP_NEWS + `?limit=5`);
            setNewsData(res.data.data);
            setIsLoading(false);
        }catch(error){
            Alert("Algo salio mal. Por favor intente de nuevo", "Hubo un error al hacer las peticiones", "error");
        }
    };


    useEffect(() => {
        getHomeData();
        getTestimonials();
        getNews();
    }, []);

    return (
        <>
        <PublicHeader/>
        <div className='home-frontoffice-container'>
            <div id='container-home-welcomeText-img'>
                <div className='home-left-container'>
                    <h1 className='home-welcome-title'>
                        {homeData.welcome_text}
                    </h1>
                    <p className='home-text-description'
                        dangerouslySetInnerHTML={{ __html: homeData.long_description }}>
                    </p>
                    <Link to='contact'>
                    <button
                        type='button'
                        className='primary-button contact__button'>
                        Contactanos
                    </button>
                    </Link>
                </div>

                <Slider />
            </div>

            {/* ABOUT SECTION*/}
            <div className='title-and-button-container'>
                <h3 className='home-title-about-section'>Nuestro Staff</h3>
                <Link
                    className='link-to-component'
                    to="/about">
                    Ver todos {`>`}
                </Link>
            </div>
            {/* ABOUT CARDS*/}
            <MembersList />

            {/* TESTIMONIALS SECTION*/}
            <div className='title-and-button-container'>
                <h3 className='home-title-about-section'>Testimonios</h3>
                <Link
                    className='link-to-component'
                    to="/testimonials">
                    Ver todos {`>`}
                </Link>
            </div>
            {/* TESTIMONIALS CARDS*/}
            <div className='testimonials-cards-container'>
                {
                    testimonialsData.map((testimonial) => (
                        <Card key={testimonial.id}
                            imageSrc={testimonial.image}
                            name={testimonial.name}
                            desc={testimonial.description}
                        />
                    ))
                }
            </div>

            {/* NEWS SECTION */}
            <div className='title-and-button-container'>
                <h3 className='home-title-about-section'>Novedades</h3>
                <Link
                    className='link-to-component'
                    to="/news">
                    Ver todas {`>`}
                </Link>
            </div>
            {/* NEWS CARDS*/}
            <div className='testimonials-cards-container'>
                {
                    newsData.map((newItem) => (
                        <CardNews key={newItem.id}
                            img={newItem.image}
                            name={newItem.name}
                            content={newItem.content}
                        />
                    ))
                }
            </div>

        </div>
        <Footer />
        </>
    )
}

export default Home