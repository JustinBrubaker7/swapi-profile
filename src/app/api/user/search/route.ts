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
        const apiResponse = await fetch(`https://swapi.tech/api/people/?name=${searchTerm}`);
        const apiData = await apiResponse.json();

        console.log('apiData:', apiData);
        //character.properties.url
        const detailUrls = apiData.result.map((character: { properties: { url: any } }) => character.properties.url);

        const details = await Promise.all(detailUrls.map((url: any) => fetch(url).then((res) => res.json())));

        return new NextResponse(JSON.stringify(details.map((detail: any) => detail.result.properties)), {
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
