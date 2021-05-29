import React, { useState, useEffect } from 'react';
import './SearchParams.css';
import useDropdown from '../../customHooks/useDropdown.js';
import Results from '../Results/Results.js';
import axios from 'axios';

function SearchParams() {
    const ANIMALS = ['bird', 'cat', 'dog', 'horse', 'rabbit'];
    const [location, setLocation] = useState('Seattle, WA');
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
    const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
    const [pets, setPets] = useState([]);

    function requestPets() {
        axios.get(`http://pets.dev-apis.com/animals?location=${location},+WA&breed=${breed}&type=${animal}`)
            .then(function (response) {
                setPets(response.data.animals);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        setBreeds([]);
        setBreed('');

        axios.get(`http://pets.dev-apis.com/types/dog/breeds`)
            .then(function (response) {
                const data = response.data.breeds;
                const breedStrings = data.map(breed => breed.name);
                setBreeds(breedStrings);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [animal, setBreed, setBreeds]);

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location" 
                        value={location} 
                        placeholder="Location" 
                        onChange={event => setLocation(event.target.value)}
                    />
                </label>
                {/* <label htmlFor="animal">
                    Animal 
                    <select 
                        id="animal"
                        value={animal}
                        onChange={e => setAnimal(e.target.value)}
                        onBlur={e => setAnimal(e.target.value)}>
                        <option>All</option>
                        {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={e => setBreed(e.target.value)}
                        onBlue={e => setBreed(e.target.value)}
                        disabled={breeds.length === 0}
                    >
                        <option>All</option>
                        {breeds.map(breedString => <option key={breedString} value={breedString}>{breedString}</option>)}
                    </select>
                </label> */}
                <AnimalDropdown />
                <BreedDropdown />
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    );
}

export default SearchParams;