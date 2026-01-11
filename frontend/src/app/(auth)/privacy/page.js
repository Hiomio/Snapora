export const metadata = { title: 'Privacy - Pixora' };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-medium text-violet-300">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, and username when you create an account</li>
                <li>Profile information including bio, profile picture, and location</li>
                <li>Communication preferences and settings</li>
                <li>Payment information (if using premium features)</li>
              </ul>
              
              <h3 className="text-lg font-medium text-violet-300 mt-6">Content and Usage Data</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Images you upload and their metadata</li>
                <li>Comments, likes, and other interactions</li>
                <li>Collections you create and manage</li>
                <li>Search queries and browsing behavior</li>
                <li>Device information and IP addresses</li>
              </ul>
            </div>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our image sharing platform</li>
                <li>Process your uploads and manage your content</li>
                <li>Enable social features like likes, comments, and follows</li>
                <li>Personalize your experience and recommendations</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our services and develop new features</li>
                <li>Ensure platform security and prevent abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">3. Information Sharing</h2>
            <div className="space-y-4 text-gray-300">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Public Content:</strong> Images and comments you post are publicly visible</li>
                <li><strong>Service Providers:</strong> With trusted partners who help us operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
                <li><strong>Consent:</strong> When you explicitly give us permission</li>
              </ul>
            </div>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">4. Data Security</h2>
            <div className="space-y-4 text-gray-300">
              <p>We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="mt-4 text-amber-300">
                However, no method of transmission over the internet is 100% secure. 
                We cannot guarantee absolute security of your information.
              </p>
            </div>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">5. Your Rights and Choices</h2>
            <div className="space-y-4 text-gray-300">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdrawal:</strong> Withdraw consent where applicable</li>
              </ul>
              <p className="mt-4">
                You can exercise these rights by contacting us at <span className="text-violet-400">privacy@pixora.com</span>
              </p>
            </div>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">6. Cookies and Tracking</h2>
            <div className="space-y-4 text-gray-300">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our platform</li>
                <li>Provide personalized content and recommendations</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Improve our services and user experience</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences, 
                though disabling certain cookies may affect platform functionality.
              </p>
            </div>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">7. Data Retention</h2>
            <div className="space-y-4 text-gray-300">
              <p>We retain your information for as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our platform and services</li>
              </ul>
              <p className="mt-4">
                When you delete your account, we will delete your personal information 
                within 30 days, though some information may be retained for legal purposes.
              </p>
            </div>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">8. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data in accordance with 
              applicable data protection laws.
            </p>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">9. Children&apos;s Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our platform is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If you are a parent or guardian 
              and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">10. Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. 
              Your continued use of our platform after such changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-violet-400">11. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="p-4 bg-zinc-800/50 rounded-lg border border-white/5">
              <p className="text-violet-400 font-medium">Email:</p>
              <p className="text-gray-300">rehman.contact9@gmail.com</p>
              <p className="text-violet-400 font-medium mt-2">Data Protection Officer:</p>
              <p className="text-gray-300">Pixora Privacy Team<br />
              [Your Company Address]<br />
              [City, State, ZIP]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


