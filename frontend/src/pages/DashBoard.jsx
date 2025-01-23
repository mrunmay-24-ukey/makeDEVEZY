import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Zap, Database, FileText, Box, ArrowRight, Github, Twitter } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Developer Tools, <span className="text-indigo-600">Simplified</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          makeDEVEZY is your all-in-one platform for managing code snippets, testing APIs, handling environment variables, and more.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/snippets"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Github className="mr-2 h-5 w-5" /> View on GitHub
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            to="/snippets"
            icon={<Code2 className="h-8 w-8" />}
            title="Code Snippets"
            description="Save, organize, and search through your code snippets with powerful syntax highlighting and tagging system."
          />
          <FeatureCard
            to="/api-tester"
            icon={<Zap className="h-8 w-8" />}
            title="API Tester"
            description="Test your APIs with an intuitive interface. Save requests, view response times, and manage collections."
          />
          <FeatureCard
            to="/env-manager"
            icon={<Database className="h-8 w-8" />}
            title="Environment Manager"
            description="Securely manage your environment variables across different projects with encryption support."
          />
          <FeatureCard
            to="/documentation"
            icon={<FileText className="h-8 w-8" />}
            title="Documentation Generator"
            description="Auto-generate comprehensive documentation from your codebase using AI-powered analysis."
          />
          <FeatureCard
            to="/generator"
            icon={<Box className="h-8 w-8" />}
            title="Boilerplate Generator"
            description="Generate production-ready boilerplate code for your projects with customizable templates."
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 -mx-4 px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">Why Choose makeDEVEZY?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">All-in-One Solution</h3>
              <p className="text-gray-600">Everything you need in one place. No more switching between different tools.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Time-Saving</h3>
              <p className="text-gray-600">Automate repetitive tasks and focus on what matters - writing great code.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Developer-First</h3>
              <p className="text-gray-600">Built by developers for developers, with features you'll actually use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of developers who are already using makeDEVEZY to streamline their workflow.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/snippets"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try It Free <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Twitter className="mr-2 h-5 w-5" /> Follow Updates
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

export default Dashboard;
