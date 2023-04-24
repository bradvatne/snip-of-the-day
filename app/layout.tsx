import "./globals.css";
import Nav from "../components/Nav";
import SnipPreview from "../components/SnipPreview";
import { createClient } from "@supabase/supabase-js";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-xl mx-auto">
          <Nav />
          {children}
          <SnipPreview />
          
        </div>
      </body>
    </html>
  );
}
