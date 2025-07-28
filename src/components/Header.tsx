import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/interview', label: 'Interview' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="font-bold text-lg md:text-3xl text-primary-200 tracking-tight">AI Interviewer</span>
        </Link>
        {/* Center/Right: Nav links */}
        <nav className="hidden md:flex gap-6 ml-8 flex-1 justify-end items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-muted-foreground hover:text-primary-200 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Right: Login/Signup icon */}
        <Link href="/sign-in" className="ml-4 p-2 rounded-full hover:bg-accent transition-colors flex items-center">
          <Image src="/profile.svg" alt="Login or Signup" width={28} height={28} />
        </Link>
      </div>
    </header>
  );
}
