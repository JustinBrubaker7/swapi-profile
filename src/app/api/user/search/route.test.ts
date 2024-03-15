import 'jest-fetch-mock';
import { GET } from './route';
import { NextRequest, NextResponse } from 'next/server';
import { Character } from '@/types/Character';

// Extend the FetchMock type to include resetMocks for TypeScript recognition
declare global {
    namespace fetch {
        function resetMocks(): void;
        function mockResponseOnce(response: string, init?: ResponseInit): void;
    }
}

describe('Character API Route', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    test('successful fetch returns expected data', async () => {
        // Mock a successful response
        const mockSuccessResponse: Character[] = [
            {
                name: 'Luke Skywalker',
                height: '172',
                mass: '77',
                hair_color: 'blond',
                skin_color: 'fair',
                eye_color: 'blue',
                birth_year: '19BBY',
                gender: 'male',
                homeworld: 'https://swapi.dev/api/planets/1/',
                films: [
                    'https://swapi.dev/api/films/1/',
                    // Add other films as needed
                ],
                species: [], // Luke is human, no specific species URL
                vehicles: [
                    'https://swapi.dev/api/vehicles/14/',
                    // Add other vehicles as needed
                ],
                starships: [
                    'https://swapi.dev/api/starships/12/',
                    // Add other starships as needed
                ],
                created: '2014-12-09T13:50:51.644000Z',
                edited: '2014-12-20T21:17:56.891000Z',
                url: 'https://swapi.dev/api/people/1/',
            },
        ];
        fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse), { status: 200 });

        const mockRequest = new NextRequest('https://swapi-profile.vercel.app/api/user/search?searchTerm=luke', {
            method: 'GET',
        });

        // TODO finish the test

    });

    test('handles fetch failure', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

        const mockRequest = new NextRequest('https://swapi-profile.vercel.app/api/user/search?searchTerm=luke', {
            method: 'GET',
        });
        const response = await GET(mockRequest);
        expect(response.status).toBe(500);

        const responseData = await response.json();
        expect(responseData.error).toBe('Failed to fetch character details');
    });
});

describe('Directly testing Next.js API Handler', () => {
    test('returns 400 if searchTerm is missing', async () => {
        const mockRequest = new NextRequest('http://localhost:3000/api/user/search?searchTerm=', {
            method: 'GET',
        });

        const response = await GET(mockRequest);

        expect(response.status).toBe(400);
        const responseData = await response.json();
        expect(responseData.error).toBe('Search term must be provided');
    });
});
