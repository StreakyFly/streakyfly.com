import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 right-0 w-full text-white p-4">
          <ul className="flex text-2xl justify-end space-x-12">
            <li><Link href="projects">Projects</Link></li>
            <li><Link href="wisdom">Wisdom</Link></li>
          </ul>
        </nav>
    );
}
