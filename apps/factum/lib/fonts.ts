import { Inter, Newsreader, IBM_Plex_Mono } from 'next/font/google';

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
});

// The optical-size axis is the point of using Newsreader: display sizes need a
// different drawing than the 20px pull-quote sizes.
export const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap'
});

// Labels and counts only, so it never needs to be on the critical path.
export const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: false
});

export const fontVariables = `${inter.variable} ${newsreader.variable} ${plexMono.variable}`;
