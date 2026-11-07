import type { Metadata } from 'next';
import SimpleTaxApp from '@/components/SimpleTaxApp';

export const metadata: Metadata = {
  title: 'SimpleTax LK | Sri Lanka Inland Revenue Department (IRD) Citizen Portal',
  description: 'Official Digital TIN Registration & Citizen Tax Services for Sri Lanka. Simple, fast, and accessible for everyone in Sinhala, Tamil, and English.',
};

export default function Home() {
  return <SimpleTaxApp />;
}
