import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "プロフィール | Hirokit",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 