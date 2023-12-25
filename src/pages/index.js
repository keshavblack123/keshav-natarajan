import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`flex h-screen flex-col items-center p-5 gap-5 ${montserrat.className}`}>

      <div className={`flex flex-row h-full w-full gap-5 bg-accent-dark`}>
        <div className={`flex flex-col w-48 gap-5 bg-accent-light`}>
          <div className={`flex h-28 w-full`}>
            <p>Logo</p>
          </div>
          <div className={`flex w-full h-full justify-center bg-dark`}>
            <p className={`flex self-center text-5xl rotate-180`} style={{ writingMode: 'vertical-rl' }}>
              <span className='text-dark'>Keshav</span>
              <span className='text-accent-dark'>Natarajan</span>
            </p>
          </div>
          <div className={`flex h-28 items-start justify-center`}>
            <p>Button</p>
          </div>
        </div>
        <div className={`flex flex-row w-full gap-5 bg-dark`}>
          <div className={`flex flex-col w-full gap-5 bg-accent-light`}>
            <div className={`flex items-end h-28 w-full`}>
              <h1>Projects</h1>
            </div>
            <div className={`flex h-28 w-full bg-accent-dark`}>
              <h1>Project Card</h1>
            </div>
          </div>
          <div className={`flex flex-col w-full gap-5 bg-accent-light`}>
            <div className={`flex items-end h-28 w-full`}>
              <h1>About</h1>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
