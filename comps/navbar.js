import Link from 'next/link'
import Image from 'next/image';

const Navbar = () => {
    return ( 
        <nav>
            <div className="logo">
                <Image src="/Apple-logo.png" width={80} height={80} />
            </div>
            <Link href="/"><a>Home</a></Link>
            <Link href="/about-me"><a>About Me</a></Link>
            <Link href="/testing"><a>My Work</a></Link>
        </nav>
     );
}
 
export default Navbar;