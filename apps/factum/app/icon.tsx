import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Inter Bold, the same letterform as FactumWordmark in the product. */
export default async function Icon() {
  const inter = await readFile(join(process.cwd(), 'assets/Inter-Bold.ttf'));

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
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: 40,
          letterSpacing: '-0.02em'
        }}
      >
        F<span style={{ color: '#f14c1d' }}>.</span>
      </div>
    ),
    { ...size, fonts: [{ name: 'Inter', data: inter, weight: 700, style: 'normal' }] }
  );
}
