import React, { useState, useEffect } from 'react';
import Carousel from '../Carousel/Carousel.js';
import axios from 'axios';

function Details(props) {
    const [loading, setLoading] = useState(true);
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        axios.get(`http://pets.dev-apis.com/animals/${props.id}`)
            .then(function (response) {
                const animal = response.data.animal;
                setAnimal(animal);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    if (loading) {
        return <h1>loading...</h1>;
    }

    return (
        <div className="details">
            <Carousel media={animal.photos} />
            <div>
                <h1>{animal.name}</h1>
                    <h2>{`${animal.name} - ${animal.breeds.primary} - ${animal.contact.address.city}, ${animal.contact.address.state}`}</h2>
                    <button>Adopt {animal.name}</button>
                    <p>{animal.description}</p>
            </div>
        </div>
    );
}

export default Details;