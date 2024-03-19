import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeContextProvider } from '@/contextapi/ThemeContext'
import ThemeBox from '@/provider/ThemeProvider'
import { messageContextProvider } from '@/contextapi/messageContext'
import { AuthProvider } from '@/provider/authProvider'
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Blog App',
  description: 'The best blog app!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet"/> 

      </head>
      <body className={inter.className}>
        <AuthProvider>
        <ThemeContextProvider>
          <ThemeBox>
          <messageContextProvider  > 
        <Navbar/>
        {children}
        <Footer/>
        </messageContextProvider>
        </ThemeBox>

        </ThemeContextProvider>

        </AuthProvider>
        </body>
    </html>
  )
}
