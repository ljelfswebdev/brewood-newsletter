export const metadata = {
  title: 'Newsletter Maker',
  description: 'Build print-ready newsletter pages',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
