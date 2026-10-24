import { AutomationDocument, automationMetadata } from '../_shared';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return automationMetadata((await params).locale, 'terms');
}

export default async function AutomationTermsPage({ params }: Props) {
  return <AutomationDocument locale={(await params).locale} kind="terms" />;
}
