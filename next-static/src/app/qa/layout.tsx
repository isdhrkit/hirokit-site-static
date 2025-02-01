import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Q&A | Hirokit",
};

export default function QALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 