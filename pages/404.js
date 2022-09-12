import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router'

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            // router.go(-1) //go back to history
            // router.go(1) //forward (click the homepage button)
            router.push('/') //redirect to the homepage
        }, 3000)
    }, [])
    return ( 
        <div className="not-found">
            <h1>Unfortunately</h1>
            <h2>This page has not been completed yet</h2>
            <p>Go back to the <Link href="/"><a>Homepage</a></Link></p>
        </div>
     );
}
 
export default NotFound;