import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PflegeAI - Bewohner',
  description: 'Ihr persönlicher Assistent im Pflegeheim',
};

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-blue-950">
        {children}
      </body>
    </html>
  );
}
