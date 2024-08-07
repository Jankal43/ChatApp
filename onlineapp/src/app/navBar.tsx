import Link from 'next/link';

export default function NavBar() {
    return (
        <div className="navBar bg-gray-900 m-1 p-5 h-1/4">
            <div className="buttonsLayout">
                <Link href="/" className="button">Home</Link>
                <Link href="/paint" className="button">Paint</Link>
                <Link href="/game" className="button">Game</Link>
            </div>
        </div>
    );
}
