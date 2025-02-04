import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "チンチロ | Hirokit",
};

export default function ChinchiroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 