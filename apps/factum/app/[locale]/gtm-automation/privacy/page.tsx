import { AutomationDocument, automationMetadata } from '../_shared';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return automationMetadata((await params).locale, 'privacy');
}

export default async function AutomationPrivacyPage({ params }: Props) {
  return <AutomationDocument locale={(await params).locale} kind="privacy" />;
}
