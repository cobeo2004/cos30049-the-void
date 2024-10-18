export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky top-0 z-50"></div>
      <div className="h-screen w-screen">{children}</div>
    </>
  );
}
