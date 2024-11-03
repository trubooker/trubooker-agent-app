export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main suppressHydrationWarning={true}>{children}</main>;
}
