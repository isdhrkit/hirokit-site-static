import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Secret | Hirokit",
};

export default function SecretLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 