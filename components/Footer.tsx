import Link from 'next/link';
import { Github, Linkedin, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">AI Task Manager</h3>
            <p className="text-sm text-gray-300">
              A modern task management application powered by AI, built with Next.js, TypeScript, and MongoDB.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Developer</h3>
            <p className="text-sm font-medium text-gray-200">Rajesh Kumar Yadav</p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/RajeshKumarYadav12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-all transform hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rky99/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-all transform hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/rajeshkumaryadav8118/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-all transform hover:scale-110"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>
              © {new Date().getFullYear()} AI Task Manager. Built with{' '}
              <Heart className="inline h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> by{' '}
              <Link
                href="https://www.linkedin.com/in/rky99/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white hover:text-blue-400 transition-colors"
              >
                Rajesh Kumar Yadav
              </Link>
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/RajeshKumarYadav12"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/rky99/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.instagram.com/rajeshkumaryadav8118/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition-colors"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
