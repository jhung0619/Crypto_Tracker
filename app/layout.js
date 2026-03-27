import "./globals.css";

export const metadata = {
  title: "Crypto Tracker",
  description: "Track BTC, ETH, and SOL with sentiment and news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
