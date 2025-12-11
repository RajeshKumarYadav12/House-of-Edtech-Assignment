import { Toaster } from 'sonner';
import AuthProvider from '../components/AuthProvider';
import Footer from '../components/Footer';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Task Manager | Smart Productivity Tool',
  description: 'Manage your tasks smarter with AI-powered suggestions for titles, priorities, and deadlines',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <AuthProvider>
          <div className="flex-1">
            <Toaster position="top-right" richColors />
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
