import React from 'react';

export default function UserProfile({ profile, key }: { profile: any; key: number }) {
    const renderFilmTitles = (films: any[]) => {
        return films.map((film, index) => (
            <p key={index}>{film.title}</p> // Use film.title or any other appropriate property
        ));
    };

    const renderStarships = (starships: any[]) => {
        return starships.map((ship, index) => <p key={index}>{ship.name}</p>); // Use shipUrl or any other appropriate property
    };

    return (
        <div
            key={key}
            className='min-h-[350px] w-full  p-8 my-4 bg-white rounded-xl shadow-md  bg-gradient-to-t from-gray-100/50 via-gray-200/50 to-gray-100/50'
        >
            <div className='text-center p-2 text-gray-primary'>
                <h2 className='text-3xl font-bold text-gray-800'>{profile.name}</h2>
            </div>
            <div className='mb-4'>
                <h4 className='text-xl font-bold text-gray-800 mt-4 '>About Me</h4>
                <p>Gender: {profile.gender}</p>
                <p>DOB: {profile.birth_year}</p>
                <p>Height: {profile.height}</p>
                <p>Weight: {profile.mass}</p>
                <p>Hair Color: {profile.hair_color}</p>
                <p>Eye Color: {profile.eye_color}</p>
            </div>
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
            </div>
        </div>
    );
}
