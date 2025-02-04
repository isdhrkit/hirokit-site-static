import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "麻雀点数計算 | Hirokit",
};

export default function MahjongLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 