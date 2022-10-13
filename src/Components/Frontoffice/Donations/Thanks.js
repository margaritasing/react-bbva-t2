import { Link } from 'react-router-dom';

const Thanks = ( props ) => {
    let contribution = props.location.state.contribution;
    return (
        <div className='thanks-container'>
            <p className="thanks-title">Tu donacion de ${contribution} fue recibida con exito. </p>
            <p className="thanks-title">Muchas gracias por colaborar con la ONG Somos Mas. Lo apreciamos mucho</p>
            <Link to={'/'} className='link-thanks'>
                <button type='button' className='primary-button button-thanks'>Ir a inicio</button>
            </Link>        
        </div>
    )
}

export default Thanks;