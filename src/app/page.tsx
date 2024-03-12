'use client';
import { useState, FormEvent } from 'react';
import SearchBar from '@components/home/SearchBar';
import Title from '@components/Title';

// The component
export default function Home() {
    // State for the search input and character profiles
    const [searchTerm, setSearchTerm] = useState('');
    const [profiles, setProfiles] = useState<any[]>([]); // Now an array to hold multiple profiles
    const [isLoading, setIsLoading] = useState(false);

    // Handle search input change
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    };

    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); // Prevent the form from reloading the page
        setIsLoading(true); // Set loading state to true
        const response = await fetch(`/api/user/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log(data);

        if (data && data?.length > 0) {
            setProfiles(data); // Store all results
        } else {
            setProfiles([]); // Reset profiles if no results are found
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <main className='bg-gray-100 h-screen p-4'>
                <Title className='text-center mt-8'>Star Wars Character Profiles</Title>
                <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} searchTerm={searchTerm} />
                <div className='flex justify-center items-center w-full'>
                    <div className='animate-spin rounded-full h-32 mt-14 w-32 border-t-2 border-b-2 border-yellow-primary'></div>
                </div>
            </main>
        );
    }

    return (
        <main className='bg-gray-100 h-screen p-4'>
            <Title className='text-center mt-8'>Star Wars Character Profiles</Title>
            <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} searchTerm={searchTerm} />
            <div className='grid grid-cols-4 gap-4 p-4'>
                {profiles.length > 0 &&
                    profiles.map((profile, index) => (
                        <div key={index} className='w-full max-w-md mx-auto p-8 my-4 bg-white rounded-xl shadow-md'>
                            <h2 className='text-2xl font-bold text-gray-800'>{profile.name}</h2>
                            <div className='flex gap-x-2'>
                                <p>H: {profile.height}</p>
                                <p>W: {profile.mass}</p>
                            </div>
                            <p>Hair Color: {profile.hair_color}</p>
                            <p>Date of Birth: {profile.birth_year}</p>

                            <h2>Films Appeared In</h2>
                            {/* Assuming films are URLs in the profile.films array */}
                            {profile?.films?.map((filmUrl: string) => (
                                <p key={filmUrl}>Film details fetch separately</p>
                            ))}

                            <h2>Starships Flown</h2>
                            {/* Assuming starships are URLs in the profile.starships array */}
                            {profile?.starships?.map((shipUrl: string) => (
                                <p key={shipUrl}>Starship details fetch separately</p>
                            ))}
                        </div>
                    ))}
            </div>
        </main>
    );
}
