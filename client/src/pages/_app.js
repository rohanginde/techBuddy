import Footer from "@/components/layout/Footer";

import Header from "@/components/layout/Header";
import { SessionProvider, useSession} from "next-auth/react";

import "@/styles/globals.css";
import { createTheme, NextUIProvider, Text } from "@nextui-org/react"
import { UserContext } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 2. Call `createTheme` and pass your custom values
const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

export default function App({ Component, pageProps }) {
  const shouldSkipLayout = Component.skipLayout || false;
  const [user,setUser]=useState({name:"rohan",email:"r@hjh.com",username:"rohan",_id:"644016771654892586768557",level:"Level One"});



  if (shouldSkipLayout) {
    return (
    
      <SessionProvider>
         <NextUIProvider theme={theme}>
          <UserContext.Provider value={{user}}>
        <Component {...pageProps} />
        </UserContext.Provider>
        </NextUIProvider>
      </SessionProvider>
     
    );
  }

  return (
    <>
    
      <SessionProvider session={pageProps.session} >
        <Header></Header>
        {Component.auth ? (
        <Auth>
          <NextUIProvider theme={theme}>
          <UserContext.Provider value={{user}}>
        <Component {...pageProps} />
        </UserContext.Provider>
        </NextUIProvider>
        </Auth>
        ): (
          <NextUIProvider theme={theme}>
             <UserContext.Provider value={{user}}>
          <Component {...pageProps} />
          </UserContext.Provider>
          </NextUIProvider>
        )}
        <Footer></Footer>
      </SessionProvider>
    </>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}