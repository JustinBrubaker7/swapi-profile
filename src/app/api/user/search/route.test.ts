import 'jest-fetch-mock';
import { GET } from './route';
import { NextRequest, NextResponse } from 'next/server';

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

    test('successful fetch returns expected data', async () => {
        // Mock a successful response
        const mockSuccessResponse = { name: 'Luke Skywalker', height: '172', mass: '77' };
        fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse), { status: 200 });

        const mockRequest = new NextRequest('https://swapi-profile.vercel.app/api/user/search?searchTerm=luke', {
            method: 'GET',
        });
        const response = await GET(mockRequest);
        // expect(response.status).toBe(200); // Expect the status to be 200 for a successful call

        const responseData = await response.json();
        // Replace the expected object with the actual structure of your successful response
        expect(responseData).toEqual(mockSuccessResponse);
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
