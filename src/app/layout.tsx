import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JG University | Shape Your Future",
  description:
    "JG University is a premier institution fostering innovation, excellence, and leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning prevents React from complaining when the
    // inline script below mutates className/style before hydration.
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Blocking script: runs before first paint so there is zero flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try{
    var theme = localStorage.getItem('theme');
    if(theme === 'dark'){
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }catch(e){}
})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
