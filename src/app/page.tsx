'use client';
import { useState, FormEvent } from 'react';
import SearchBar from '@components/home/SearchBar';
import Title from '@components/Title';
import UserProfile from '@components/home/UserProfile';
import { Character } from '@/types/Character';

// The component
export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [profiles, setProfiles] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const GET_PATH = '/api/user/search?searchTerm=';

    // Handle search input change
    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        setSearchTerm(event.currentTarget.value);
    };

    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        const response = await fetch(`${GET_PATH}${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.status !== 200 || data.error) {
            setError(data.error || 'Failed to fetch character details');
            setIsLoading(false);
            return;
        }
        setError('');

        if (data?.length > 0) {
            setProfiles(data); // Store all results
        } else {
            setProfiles([]); // Reset profiles if no results are found
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <main className=' h-screen p-4'>
                <Title className='text-center mt-8'>Star Wars Character Profiles</Title>
                <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} searchTerm={searchTerm} />
                <div className='flex justify-center items-center w-full'>
                    <div className='animate-spin rounded-full h-32 mt-14 w-32 border-t-2 border-b-2 border-yellow-primary'></div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className=' h-screen p-4'>
                <Title className='text-center mt-8'>Star Wars Character Profiles</Title>
                <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} searchTerm={searchTerm} />
                <div className='flex justify-center items-center w-full'>
                    <p className='text-center text-red-500'>{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className='bg-gray-100 h-screen p-4'>
            <Title className='text-center mt-8'>Star Wars Character Profiles</Title>
            <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} searchTerm={searchTerm} />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-12 p-4'>
                {profiles.length > 0 && profiles.map((profile, index) => <UserProfile key={index} profile={profile} />)}
            </div>
        </main>
    );
}

