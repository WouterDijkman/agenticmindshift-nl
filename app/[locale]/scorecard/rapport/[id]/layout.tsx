import type { Metadata } from 'next';

// Personalised report pages must not be indexed — each URL is unique to a
// specific assessment session and has no evergreen search value.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function RapportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
