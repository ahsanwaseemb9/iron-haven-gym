import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Iron Haven Gym | Elite Fitness",
  description: "High-performance fitness website for elite athletes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black antialiased`}>
        {/* The Navbar is now its own responsive component */}
        <Navbar />

        {/* Padding-top (pt-20) ensures content starts below the navbar */}
        <main className="pt-20"> 
          {children}
        </main>
      </body>
    </html>
  );
}