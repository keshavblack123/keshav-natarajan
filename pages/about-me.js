import styles from '../styles/Home.module.css'
import Head from 'next/head';

const About = () => {
    return ( 
        <>
            <Head>
                <title>KN | About</title>
                <meta name='keywords' content='test'/>
            </Head>
            <div className={styles.container}>
                <h1>About</h1>
                <p>This page needs to be populated</p>
                <p>With more info about me</p>
            </div>
        </>
     );
}
 
export default About;