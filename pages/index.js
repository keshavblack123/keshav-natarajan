import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>KN | Home</title>
        <meta name='keywords' content='test'/>
      </Head>
      <div className={styles.container}>
        <h1>Homepage</h1>
        <p>not really sure what to put on the homepage yet</p>
        <Link href="/testing">
          <a className={styles.btn}>nowhere</a>
        </Link>
      </div>
    </>
  )
}
