import Card from '../../Cards/Card/Card'
import Spinner from '../../Spinner/Spinner'
import { Get } from '../../../Services/publicApiService'
import { useState, useEffect } from 'react'
import Alert from '../../Alerts/Alerts'
import './Testimonials.css'

const Testimonials = () => {
    const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_TESTIMONIALS
    const [testimonials, setTestimonials] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchTestimonials = async () => {
        setIsLoading(true)
        try {
            const res = await Get(endpoint)
            setTestimonials(res.data.data)
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            Alert("Something went wrong. Please try again", "There was an error fetching the data", "error");
        }
    }

    useEffect(() => {
        fetchTestimonials()
    }, [])

    return(
        <div>
            <h1 className="testimonials-title">Testimonios</h1>
        <div className="testimonials-container">
            {isLoading ? (<Spinner />) : (
                testimonials.map( (test) => {
                    const { id, name, image, description } = test
                    return(
                            <div className="testimonial-card" key={id}>
                                <Card 
                                imageSrc={image}
                                name={name}
                                desc={description}
                            />
                            </div>
                    )
                })
            )}
        </div>
        </div>
    )
}

export default Testimonials