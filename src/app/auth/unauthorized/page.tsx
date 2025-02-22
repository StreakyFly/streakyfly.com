import Link from 'next/link';


export default function Unauthorized() {
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>Sorry, you don&apos;t have permission to view this page.</p>
            <Link href="/">Return home</Link>
        </div>
    )
}
