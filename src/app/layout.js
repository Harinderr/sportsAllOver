import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import './globals.css'
import { Roboto_Slab , Bebas_Neue } from "next/font/google";
import { ThemeContextProvider } from "@/contextapi/ThemeContext";
import ThemeBox from "@/provider/ThemeProvider";
import Script from "next/script";
import { AuthProvider } from "@/provider/authProvider";
import { UserAuthProvider } from '@/contextapi/UserAuthContext'
import { BookmarksProvider } from "@/contextapi/bookmarksProvider";
import NextTopLoader from "nextjs-toploader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactQueryComponent from "@/components/reactQuery";

const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: ['100', '200', '300', "400", "500", "600", '700', '800'],
  variable: '--font-roboto_slab'
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: [ "400"],
  variable: '--font-bebas_neue'
});


export const metadata = {
  title: "SportsAllOver",
  description: "Get info on latest sports events",
};
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
      
      </head>
      <body className={`${roboto.variable} ${bebas.variable}`}>
        <AuthProvider>
        <UserAuthProvider>
        <ReactQueryComponent>
          {/* <ThemeContextProvider> */}
            {/* <ThemeBox> */}
            <BookmarksProvider>
            <NextTopLoader />
             <Navbar />
              {children}
              <Footer />
            </BookmarksProvider>
            {/* </ThemeBox> */}
          {/* </ThemeContextProvider> */}
        </ReactQueryComponent>
          </UserAuthProvider>
        </AuthProvider>
      {/* <Script src='https://eternity-deals.vercel.app/api/products/24d7dab6-9eba-41d9-b795-2693ac0b9d9f/banner'></Script> */}
      </body>
    </html>
  );
}
























{/* <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-T2PG4Y5BJY"></Script>
        
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T2PG4Y5BJY');
            `.replace(/'/g, '&#39;'),
          // // }} */}
