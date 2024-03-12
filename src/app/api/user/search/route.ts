// src/app/api/user/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

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
        const apiResponse = await fetch(`https://swapi.info/api/people/?search=${searchTerm}`);
        const apiData = await apiResponse.json();

        if (apiData.length === 0) {
            return new NextResponse(JSON.stringify({ error: 'No characters found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const filteredResults = apiData.filter((character: any) =>
            character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Assuming apiData.results holds the characters
        const characterDetailsWithExtras = await Promise.all(
            filteredResults.map(async (character: any) => {
                // Fetching film details
                const filmDetails = await Promise.all(
                    character?.films?.map(async (film: string) => {
                        const filmResponse = await fetch(film);
                        const filmData = await filmResponse.json();
                        return filmData;
                    })
                );

                // Fetching starship details
                const starshipDetails = await Promise.all(
                    character?.starships?.map(async (starship: string) => {
                        const starshipResponse = await fetch(starship);
                        const starshipData = await starshipResponse.json();
                        return starshipData;
                    })
                );

                return { ...character, filmDetails, starshipDetails };
            })
        );

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
