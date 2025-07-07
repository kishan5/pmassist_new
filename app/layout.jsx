import "./globals.css";

export const metadata = {
  title: "PMAssist",
  description: "Your AI Copilot for Product Managers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
