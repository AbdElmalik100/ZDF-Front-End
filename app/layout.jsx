'use client'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Jost } from 'next/font/google'
import Main from './main'
import { usePathname } from "next/navigation";
import { store } from './store/index'
import { Provider } from 'react-redux'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "./globals.scss";
import { Toaster } from "sonner";
import axios from 'axios';

const jost = Jost({ subsets: ['latin'] })

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL

export default function RootLayout({ children }) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={jost.className}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <Provider store={store}>
            <Toaster closeButton richColors />
            {pathname == '/login' ? null : <Header />}
            <Main>
              {children}
            </Main>
            {pathname == '/login' ? null : <Footer />}
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
