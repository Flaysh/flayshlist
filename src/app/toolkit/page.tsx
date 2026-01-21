import type { Metadata } from 'next';
import { ToolkitShell } from './components/ToolkitShell';

export const metadata: Metadata = {
  title: 'FLAYSH AI Toolkit',
  description: 'Generate stunning AI images and videos with the FLAYSH AI Toolkit. Fast, beautiful, and powerful creative tools.',
};

export default function ToolkitPage() {
  return <ToolkitShell />;
}
