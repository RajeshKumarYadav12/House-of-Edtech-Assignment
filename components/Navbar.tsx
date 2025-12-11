'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AI Task Manager</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          {session && (
            <>
              <div className="hidden md:block text-sm">
                Welcome, <span className="font-semibold">{session.user.name}</span>
              </div>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="destructive"
                size="sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
