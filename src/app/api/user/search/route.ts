import { NextRequest, NextResponse } from 'next/server';

// Main handler function remains
export async function GET(request: NextRequest) {
    const searchTerm = request.nextUrl.searchParams.get('searchTerm');

    if (!searchTerm) {
        return new NextResponse(JSON.stringify({ error: 'Search term must be provided' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const characterDetailsWithExtras = await searchCharacters(searchTerm);
        return new NextResponse(JSON.stringify(characterDetailsWithExtras), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to fetch character details:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch character details' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

// Extracted search logic
async function searchCharacters(searchTerm: string) {
    const apiResponse = await fetch(`https://swapi.info/api/people/?search=${searchTerm}`);
    const apiData = await apiResponse.json();

    if (apiData.length === 0) {
        throw new Error('No characters found');
    }

    return processCharacters(apiData, searchTerm);
}

// Extracted character processing logic
async function processCharacters(apiData: any[], searchTerm: string) {
    const filteredResults = apiData.filter((character: any) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredResults.length === 0) {
        return {
            error: `No characters found for '${searchTerm}'`,
        };
    }

    return Promise.all(
        filteredResults.map(async (character: any) => {
            const filmDetails = await fetchDetails(character.films);
            const starshipDetails = await fetchDetails(character.starships);

            return { ...character, filmDetails, starshipDetails };
        })
    );
}

// Generic function to fetch details (films or starships)
async function fetchDetails(urls: string[]) {
    return Promise.all(
        urls.map(async (url: string) => {
            const response = await fetch(url);
            return response.json();
        })
    );
}
