import { AutomationDocument, automationMetadata } from './_shared';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return automationMetadata((await params).locale, 'home');
}

export default async function AutomationPage({ params }: Props) {
  return <AutomationDocument locale={(await params).locale} kind="home" />;
}
