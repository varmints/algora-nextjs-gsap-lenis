import { Suspense } from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Navbar from "@/components/Navbar/Navbar";

import "./globals.css";

export const metadata = {
  title: "ALGORA — Twój portal sztuki AI",
  description: "CGMWT JAN 2025 by Codegrid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <Suspense>
          <ProgressBar />
        </Suspense>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
