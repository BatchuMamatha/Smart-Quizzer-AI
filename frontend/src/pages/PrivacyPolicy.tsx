import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">Last Updated: December 1, 2025</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Introduction</h2>
              <p>
                Welcome to Smart Quizzer AI ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered quiz platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>Account Information:</strong> Name, email address, password, phone number (optional), and profile picture</li>
                <li><strong>Quiz Content:</strong> Custom topics, uploaded documents (PDF, DOC, DOCX, TXT), and quiz responses</li>
                <li><strong>Profile Data:</strong> Learning preferences, skill levels, and performance history</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Usage Data:</strong> Quiz history, scores, completion rates, and time spent on questions</li>
                <li><strong>Device Information:</strong> Browser type, IP address, operating system, and device identifiers</li>
                <li><strong>Analytics:</strong> Performance metrics, feature usage, and interaction patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. How We Use Your Information</h2>
              <p className="mb-2">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and maintain our quiz generation and assessment services</li>
                <li>Generate personalized quizzes using AI based on your uploaded content and preferences</li>
                <li>Track your progress, scores, and learning analytics</li>
                <li>Send verification emails, password reset links, and important account notifications</li>
                <li>Improve our AI algorithms and user experience</li>
                <li>Detect and prevent fraud, abuse, or security issues</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Data Storage and Security</h2>
              <p className="mb-2">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Passwords are hashed using bcrypt before storage</li>
                <li>Secure HTTPS connections for all data transmission</li>
                <li>Uploaded documents are stored securely and processed only for quiz generation</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication mechanisms</li>
              </ul>
              <p className="mt-3">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your data, 
                we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Data Sharing and Disclosure</h2>
              <p className="mb-2">We do not sell your personal information. We may share data with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>AI Service Providers:</strong> Third-party AI APIs (e.g., OpenAI) to generate quiz content from your uploaded materials</li>
                <li><strong>Email Services:</strong> To send verification emails and notifications</li>
                <li><strong>Analytics Providers:</strong> To understand usage patterns and improve our service</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Your Rights and Choices</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Update:</strong> Modify your profile information, email, and preferences</li>
                <li><strong>Delete:</strong> Request deletion of your account and associated data</li>
                <li><strong>Export:</strong> Download your quiz history and performance data</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from promotional emails (verification emails cannot be disabled)</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact us at privacy@smartquizzer.ai or use the account settings page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Cookies and Tracking</h2>
              <p>
                We use localStorage and sessionStorage to maintain your login session, preferences, and temporary quiz data. 
                We may use cookies for analytics and to improve user experience. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">8. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13. We do not knowingly collect data from children under 13. 
                If we discover such data has been collected, we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">9. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your residence. We ensure appropriate safeguards 
                are in place to protect your data in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent 
                notice on our platform. Continued use after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">11. Contact Us</h2>
              <p className="mb-2">If you have questions about this Privacy Policy, contact us at:</p>
              <ul className="list-none space-y-1">
                <li>Email: privacy@smartquizzer.ai</li>
                <li>Support: support@smartquizzer.ai</li>
              </ul>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
