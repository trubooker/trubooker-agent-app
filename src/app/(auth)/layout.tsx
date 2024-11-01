export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main suppressHydrationWarning={true}>
      <body>{children}</body>
    </main>
  );
}
