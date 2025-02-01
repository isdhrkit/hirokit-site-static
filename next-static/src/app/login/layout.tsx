import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ログイン | Hirokit",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 