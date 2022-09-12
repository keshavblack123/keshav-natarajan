import Footer from "./footer";
import Navbar from "./navbar";
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => {
    return ( 
        <div className={styles.container}>
            <Navbar/>
            {children}
            <Footer/>
        </div>
     );
}
 
export default Layout;