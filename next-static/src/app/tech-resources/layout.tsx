import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "技術情報 | Hirokit",
};

export default function TechResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 