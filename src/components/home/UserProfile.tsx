import React from 'react';
import { Starship } from '@/types/Starship';
import { Films } from '@/types/Films';

export default function UserProfile({ profile, key }: { profile: any; key: number }) {
    const renderFilmTitles = (films: Films[]) => {
        return films.map((film, index) => <p key={index}>{film.title}</p>);
    };

    const renderStarships = (starships: Starship[]) => {
        return starships.map((ship, index) => <p key={index}>{ship.name}</p>);
    };

    return (
        <div
            key={key}
            className='min-h-[350px] w-full  p-8 my-4 bg-white rounded-xl shadow-md  bg-gradient-to-t from-gray-100/50 via-gray-200/50 to-gray-100/50'
        >
            <div className='text-center p-2 text-gray-primary'>
                <h2 className='text-3xl font-bold text-gray-primary'>{profile.name}</h2>
            </div>
            <div className='mb-4'>
                <h4 className='text-xl font-bold text-gray-800 mt-4 '>About Me</h4>
                <ul className='ml-8 list-disc'>
                    <li>Gender: {profile.gender}</li>
                    <li>DOB: {profile.birth_year}</li>
                    <li>Height: {profile.height}</li>
                    <li>Weight: {profile.mass}</li>
                    <li>Hair Color: {profile.hair_color}</li>
                    <li>Eye Color: {profile.eye_color}</li>
                </ul>
            </div>
            <div>
                <div className='mb-4'>
                    {profile?.films?.length > 0 && <h4 className='text-xl font-bold text-gray-800'>Films</h4>}
                    {profile.filmDetails && renderFilmTitles(profile.filmDetails)}
                </div>
                <div>
                    {profile?.starships?.length > 0 && <h4 className='text-xl font-bold text-gray-800'>Starships Flown</h4>}
                    {profile.starshipDetails && renderStarships(profile.starshipDetails)}
                </div>
            </div>
        </div>
    );
}
