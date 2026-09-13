import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import Logo from "../components/navbar/Logo";

const poppins = Poppins({
  variable:"--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400","500","600","700","800","900"],
})
export const metadata: Metadata = {
  title: "NextDev",
  description: "NextDev tutorial Egbontech",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased scroll-smooth`}
    >
      <body className="flex-1 w-full flex flex-col text-white px-6">
        {children}
      </body>
    </html>
  );
}
