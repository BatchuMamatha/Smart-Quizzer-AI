import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">Last Updated: December 1, 2025</p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Smart Quizzer AI ("the Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to these Terms, please do not use the Service. These Terms constitute a legally binding agreement 
                between you and Smart Quizzer AI.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">2. Description of Service</h2>
              <p className="mb-2">
                Smart Quizzer AI is an AI-powered quiz platform that provides:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Automated quiz generation from uploaded documents and custom topics</li>
                <li>Multiple-choice questions generated using AI technology</li>
                <li>Performance tracking, analytics, and progress reports</li>
                <li>Learning path recommendations and skill assessments</li>
                <li>Multiplayer quiz competitions and leaderboards</li>
                <li>Badge achievements and gamification features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">3. User Accounts</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">3.1 Registration</h3>
              <p className="mb-3">
                You must create an account to use certain features. You agree to provide accurate, current, and complete information 
                and to update it as necessary. You are responsible for maintaining the confidentiality of your password.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">3.2 Account Security</h3>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>You are responsible for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Do not share your account credentials with others</li>
                <li>Use a strong, unique password</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">3.3 Email Verification</h3>
              <p>
                You must verify your email address to access full features. We may send verification codes and important notifications 
                to your registered email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">4. Acceptable Use</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">4.1 Permitted Use</h3>
              <p className="mb-3">You may use the Service for lawful educational and learning purposes.</p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">4.2 Prohibited Activities</h3>
              <p className="mb-2">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Upload content that infringes copyright, contains malware, or is illegal</li>
                <li>Attempt to reverse engineer, hack, or compromise the Service</li>
                <li>Use automated bots or scripts to manipulate quizzes or leaderboards</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share or resell generated quiz content without permission</li>
                <li>Create multiple accounts to abuse free trials or promotions</li>
                <li>Upload copyrighted materials without authorization</li>
                <li>Use the Service for commercial purposes without a license</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">5. Content and Intellectual Property</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">5.1 Your Content</h3>
              <p className="mb-3">
                You retain ownership of content you upload (documents, custom topics). By uploading, you grant us a license to 
                process, store, and use your content solely to provide the Service (e.g., generate quizzes via AI).
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">5.2 AI-Generated Content</h3>
              <p className="mb-3">
                Quizzes generated by our AI are provided "as-is." While we strive for accuracy, AI-generated questions may contain 
                errors. You are responsible for verifying the accuracy of quiz content for your use case.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">5.3 Our Intellectual Property</h3>
              <p>
                The Service, including its design, code, algorithms, and branding, is owned by Smart Quizzer AI and protected by 
                copyright and other intellectual property laws. You may not copy, modify, or distribute our platform without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">6. Data and Privacy</h2>
              <p>
                Your use of the Service is subject to our <Link to="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>, 
                which explains how we collect, use, and protect your data. By using the Service, you consent to our data practices 
                as described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">7. Subscription and Payments</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">7.1 Free Tier</h3>
              <p className="mb-3">
                We offer a free tier with limited features. We reserve the right to modify free tier limits at any time.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">7.2 Paid Plans (If Applicable)</h3>
              <p className="mb-2">
                If we introduce paid subscriptions:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Payments are processed securely through third-party payment processors</li>
                <li>Subscriptions auto-renew unless canceled</li>
                <li>Refunds are subject to our refund policy</li>
                <li>We may change pricing with 30 days' notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">8. Disclaimers and Limitations</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">8.1 Service Availability</h3>
              <p className="mb-3">
                The Service is provided "AS IS" and "AS AVAILABLE." We do not guarantee uninterrupted, error-free, or secure access. 
                We may suspend or terminate the Service for maintenance, updates, or other reasons.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">8.2 Educational Use Only</h3>
              <p className="mb-3">
                Quiz results are for educational purposes only. Do not rely on quizzes for professional certifications, academic 
                assessments, or critical decisions without independent verification.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">8.3 Limitation of Liability</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SMART QUIZZER AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA LOSS, OR SERVICE INTERRUPTIONS. OUR TOTAL LIABILITY 
                SHALL NOT EXCEED THE AMOUNT YOU PAID (IF ANY) IN THE PAST 12 MONTHS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">9. Third-Party Services</h2>
              <p>
                The Service uses third-party AI APIs (e.g., OpenAI), email services, and analytics tools. We are not responsible 
                for third-party services' availability, accuracy, or privacy practices. Your use of third-party services is subject 
                to their terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">10. Termination</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">10.1 By You</h3>
              <p className="mb-3">
                You may delete your account at any time through account settings. Deletion is permanent and cannot be reversed.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">10.2 By Us</h3>
              <p>
                We may suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or for other 
                legitimate reasons. We will provide notice when possible but reserve the right to terminate immediately for serious violations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">11. Changes to Terms</h2>
              <p>
                We may update these Terms periodically. We will notify you of material changes via email or a notice on the platform. 
                Continued use after changes constitutes acceptance. If you disagree with updated Terms, you must stop using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">12. Dispute Resolution</h2>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">12.1 Informal Resolution</h3>
              <p className="mb-3">
                If you have a dispute, please contact us at support@smartquizzer.ai to resolve it informally.
              </p>

              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">12.2 Governing Law</h3>
              <p>
                These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles. 
                Any disputes shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">13. Miscellaneous</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Severability:</strong> If any provision is unenforceable, the remaining provisions remain in effect</li>
                <li><strong>Waiver:</strong> Failure to enforce a right does not constitute a waiver</li>
                <li><strong>Assignment:</strong> You may not assign these Terms; we may assign them to successors</li>
                <li><strong>Entire Agreement:</strong> These Terms and the Privacy Policy constitute the entire agreement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">14. Contact Information</h2>
              <p className="mb-2">For questions about these Terms, contact us at:</p>
              <ul className="list-none space-y-1">
                <li>Email: legal@smartquizzer.ai</li>
                <li>Support: support@smartquizzer.ai</li>
              </ul>
            </section>

            <section className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                <strong>By using Smart Quizzer AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
              </p>
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

export default TermsOfService;
