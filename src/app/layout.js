import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import { ThemeContextProvider } from "@/contextapi/ThemeContext";
import ThemeBox from "@/provider/ThemeProvider";
import Script from "next/script";
import { AuthProvider } from "@/provider/authProvider";
const roboto = Roboto_Slab({
  subsets: ["latin"],
  weight: ['100','200','300',"400", "500", "600", '700','800'],
  variable : '--font-roboto_slab'
});

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
     
<Script async  strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-T2PG4Y5BJY"></Script>
<Script id="google-analytics"
 strategy="afterInteractive"
>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', 'G-T2PG4Y5BJY');
</Script>
      
      </head>
      <body className={roboto.variable}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeBox>
              <Navbar />
              {children}
              <Footer />
            </ThemeBox>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
