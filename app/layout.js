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
      <body className="bg-black">
        <Navbar />
        {children}
      </body>
    </html>
  );
}