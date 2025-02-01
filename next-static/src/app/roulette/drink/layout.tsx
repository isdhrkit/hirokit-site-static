import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "お酒ルーレット | Hirokit",
};

export default function DrinkRouletteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 