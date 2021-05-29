import React, { useEffect, useState } from 'react';

function Carousel(props) {
    const [photos, setPhotos] = useState([]);
    const [activePhoto, setActivePhoto] = useState(0);

    useEffect(() => {
        let media = null;

        if (props.media.length) {
            media = props.media.map((item) => item.large);
        }

        setPhotos(media);
    }, [props.media]);

    function handlePhotoClick(index) {
        setActivePhoto(index);
    }

    if (!photos.length) {
        return <h1>loading...</h1>
    }

    return (
        <>  
            <div className="carousel">
                <img src={photos[activePhoto]} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        <img 
                            key={index}
                            onClick={() => handlePhotoClick(index)}
                            src={photo}
                            className={index === activePhoto ? 'active': ''}
                            alt='animal thumbnail'
                        />
                    ))}
                </div>
            </div>  
        </>
    )
}

export default Carousel;