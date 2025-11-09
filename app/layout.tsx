import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import StoreProvider from "./providers";
import Navigation from "../components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medieval Stories Generator",
  description: "Generate historical medieval stories based on your choose",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <div className="app-container">
            <header className="header">
              <div className="container">
                <div className="header-content">
                  <h1>🏰 Medieval Stories</h1>
                  <p>Generate tales from the Middle Ages</p>
                </div>
              </div>
            </header>
            <main className="main-content">
              <div className="container">{children}</div>
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
