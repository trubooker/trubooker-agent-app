import type { Metadata } from "next";
import "../globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Montserrat } from "next/font/google";
import StoreProvider from "@/redux/providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Agent | truBooker",
  icons: "/logo.svg",
};
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
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
        <body className={montserrat.className} suppressHydrationWarning={true}>
          <LayoutWrapper>
            {children}
            <Toaster />
          </LayoutWrapper>
        </body>
      </html>
    </StoreProvider>
  );
}
