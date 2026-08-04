export const dynamic = 'force-static';

export async function GET() {
    return new Response('This route is not used in static export mode.', {
        status: 404,
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
