import './Card.css'

const Card = ({imageSrc, name, desc}) => {
    /*
        imageSrc = src de la imagen.
        name = Nombre de la card.
        desc = Texto descriptivo de la card.
    */
    return (
        <div className="card">
            <img 
                src={imageSrc} 
                alt={name} 
                className="card-img"
                onError={({currentTarget}) => {
                    currentTarget.onerror = false;
                    currentTarget.src= "https://uxwing.com/wp-content/themes/uxwing/download/07-web-app-development/image-not-found.svg"; //imagen online porque local me daba error;
                    currentTarget.className= "card-img noLoaded"
                }}
            />
            <h3 className="card-name">{name}</h3>
            <p className="card-desc">{desc}</p>
        </div>
    )
}

export default Card;