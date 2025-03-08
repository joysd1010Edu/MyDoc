import type { Metadata } from "next";
import localFont from "next/font/local";
// import Inter from "next/font/google";
import "./globals.css";
import { sub } from "date-fns";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// const inter = Inter(
//   {
//     subsets:['latin']
//   }
// )

export const metadata: Metadata = {
  title: "TextKumir",
  description:
    "TextKumir – a powerful and modern online word editor designed for effortless writing, seamless collaboration, and productivity. Create, edit, and format documents with ease. Try TextKumir today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased 
         
          `}
      >
        <NuqsAdapter>

        {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
