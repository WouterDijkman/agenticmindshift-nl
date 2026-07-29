import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const newsreader = await readFile(
    join(process.cwd(), 'assets/Newsreader-Medium.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#081930',
          color: '#ffffff',
          fontFamily: 'Newsreader',
          fontSize: 108,
          letterSpacing: '0.01em'
        }}
      >
        F<span style={{ color: '#f14c1d' }}>.</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Newsreader', data: newsreader, weight: 500, style: 'normal' }]
    }
  );
}
