import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Zap, Shield, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-black">
        <div className="container px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              AI Task Manager
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Manage your tasks smarter with AI-powered suggestions
            </p>
            <p className="text-lg text-blue-50 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              Get intelligent recommendations for task titles, priorities, and deadlines. 
              Stay organized and productive with our modern task management system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/register">
                  Get Started Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/10 text-white border-white hover:bg-white/20">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Features Grid */}
            <div className="mt-20 grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <Sparkles className="h-12 w-12 mb-4 text-yellow-300" />
                  <CardTitle>AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-blue-100">
                    Let AI suggest better titles, priorities, and deadlines for your tasks
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <Zap className="h-12 w-12 mb-4 text-yellow-300" />
                  <CardTitle>Fast & Simple</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-blue-100">
                    Intuitive interface to create, update, and manage tasks effortlessly
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <Shield className="h-12 w-12 mb-4 text-yellow-300" />
                  <CardTitle>Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-blue-100">
                    Your data is protected with industry-standard authentication
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="grid gap-4 text-left">
                {[
                  'Full CRUD operations for tasks',
                  'AI suggestions for better productivity',
                  'Priority and status management',
                  'Deadline tracking with overdue detection',
                  'Responsive design for all devices',
                  'Dark mode support'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 AI Task Manager. Built with Next.js 16, TypeScript, MongoDB & OpenAI.</p>
          <p className="mt-2 text-sm">
            A production-grade full-stack application demonstrating modern web development.
          </p>
        </div>
      </footer>
    </div>
  );
}
