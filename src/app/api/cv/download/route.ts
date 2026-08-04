import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    const filePath = path.join(process.cwd(), 'public', 'thanvanthanh.pdf');

    try {
        const fileBuffer = await fs.readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="ThanVanThanh_CV.pdf"',
                'Cache-Control': 'no-store',
            },
        });
    } catch {
        return new NextResponse('PDF not found', {
            status: 404,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
}
