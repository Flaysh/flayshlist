import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visuals - FlayshList',
  description: 'VJ performances, projection mapping, and audiovisual art by FLAYSH.',
};

export default function VisualsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
