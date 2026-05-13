import ScorecardLayout from '@/components/layout/ScorecardLayout';

export default function ScorecardSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ScorecardLayout>{children}</ScorecardLayout>;
}
