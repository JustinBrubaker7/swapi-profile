'use client';
import { useState, FormEvent } from 'react';
import SearchBar from '@components/home/SearchBar';
import Title from '@components/Title';
import UserProfile from '@components/home/UserProfile';

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
            <main className=' h-screen p-4'>
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
            <div className='grid grid-cols-1 md:grid-cols-3 gap-x-12 p-4'>
                {profiles.length > 0 && profiles.map((profile, index) => <UserProfile key={index} profile={profile} />)}
            </div>
        </main>
    );
}
