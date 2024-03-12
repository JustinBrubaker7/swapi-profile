import React from 'react';

export default function UserProfile({ profile, key }: { profile: any; key: number }) {
    // Assuming filmDetails is an array of objects, we can map through it and render titles or any other property
    const renderFilmTitles = (films: any[]) => {
        return films.map((film, index) => (
            <p key={index}>{film.title}</p> // Use film.title or any other appropriate property
        ));
    };

    // Function to render starship details or placeholders based on URLs
    const renderStarships = (starships: any[]) => {
        return starships.map((ship, index) => <p key={index}>{ship.name}</p>); // Use shipUrl or any other appropriate property
    };

    return (
        // add gradient
        <div
            key={key}
            className='w-full mx-auto p-8 my-4 bg-white rounded-xl shadow-md grid grid-cols-2 gap-4 relative bg-gradient-to-t from-gray-100/50 via-gray-200/50 to-gray-100/50'
        >
            <div>
                <div className='mb-4'>
                    <h4 className='text-xl font-bold text-gray-800'>Films</h4>
                    {profile.filmDetails ? renderFilmTitles(profile.filmDetails) : null}
                </div>
                <div>
                    {profile?.starships?.length ? (
                        <h4 className='text-xl font-bold text-gray-800'>Starships Flown</h4>
                    ) : null}
                    {profile.starshipDetails ? renderStarships(profile.starshipDetails) : null}
                </div>
                <h4 className='text-xl font-bold text-gray-800 mt-4'>Details</h4>
                <p>Hair Color: {profile.hair_color}</p>
                <p>DOB: {profile.birth_year}</p>
                <p>Eye Color: {profile.eye_color}</p>
            </div>
            <div className='absolute bottom-4 right-4 p-2 text-gray-primary'>
                <h2 className='text-3xl font-bold text-gray-800'>{profile.name}</h2>
                <div className='flex gap-x-2'>
                    <p>H: {profile.height}</p>
                    <p>W: {profile.mass}</p>
                    <p>{profile.gender}</p>
                </div>
            </div>
        </div>
    );
}
