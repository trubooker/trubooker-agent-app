import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/redux/providers";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Connector | TruBooker",
  icons: "/logo.svg",
};

const gilroy = localFont({
  src: "../fonts/Gilroy-Regular.woff",
  variable: "--font-gilroy",
  weight: "100 200 300 400 500 600 700 800 900",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={gilroy.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
