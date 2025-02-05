import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "機能要望フォーム | Hirokit",
};

export default function FeatureRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 