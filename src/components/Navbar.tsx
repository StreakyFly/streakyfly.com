import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-6 right-8 w-full text-white">
          <ul className="flex text-2xl justify-end space-x-12">
            <li><Link href="projects">Projects</Link></li>
            <li><Link href="wisdom">Wisdom</Link></li>
          </ul>
        </nav>
    );
}
