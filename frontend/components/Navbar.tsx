import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>

      <div>
        <Link href="/login/">
          <a>Login</a>
        </Link>
        <Link href="/register/">
          <a>register</a>
        </Link>
      </div>
    </nav>
  );
}
