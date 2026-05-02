import './globals.css';

export const metadata = {
  title: 'Swikar Singh | Frontend Developer',
  description: 'Bold digital experiences. Clean code, striking design, zero compromises.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
