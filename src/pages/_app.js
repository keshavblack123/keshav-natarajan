import '@/styles/globals.css'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { montserrat } from '@/utils/utils';

const content_color = 'text-dark dark:text-light';
const text_accent = 'text-accent-dark dark:text-accent-light';

export default function App({ Component, pageProps }) {

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${montserrat.className} ${darkMode && 'dark'} transition-colors`}>
        <div className={`flex flex-row box-border h-screen bg-light dark:bg-dark`}>
          <div className={`hidden flex-col gap-5 py-5 pl-5 sm:flex`}>
            <div className={`flex h-28`}>
              <Image
                src={darkMode ? "/lightLogo.png" : "/darkLogo.png"}
                width={165}
                height={100}
                alt="logo"
              />
            </div>
            <div className={`flex w-full h-full justify-center`}>
              <p className={`flex self-center text-5xl rotate-180`} style={{ writingMode: 'vertical-rl' }}>
                <span className={`${content_color}`}>Keshav</span>&nbsp;
                <span className={`${text_accent}`}>Natarajan</span>
              </p>
            </div>
            <div className={`flex h-28 items-start justify-center`}>
              <button className={`relative h-9 w-16 p-1 cursor-pointer rounded-full transition-all duration-800 border-2 border-accent-dark dark:border-accent-light`} onClick={toggleDarkMode}>
                <span className={`absolute h-6 w-6 left-1 top-1 rounded-full bg-accent-dark dark:bg-accent-light ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  )
}
