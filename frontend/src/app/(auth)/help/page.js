export const metadata = { title: 'Help - Pixora' };

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
            Help & Support
          </h1>
          <p className="text-gray-400 text-lg">Find answers to common questions and get the help you need</p>
        </div>

        <div className="space-y-8">
          {/* Quick Actions */}
          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-violet-400">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-white/5 hover:border-violet-500/30 transition-colors">
                <h3 className="text-lg font-medium text-violet-300 mb-2">Contact Support</h3>
                <p className="text-gray-300 text-sm mb-3">Get in touch with our support team for personalized help</p>
                <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Contact Us
                </button>
              </div>
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-white/5 hover:border-violet-500/30 transition-colors">
                <h3 className="text-lg font-medium text-violet-300 mb-2">Report an Issue</h3>
                <p className="text-gray-300 text-sm mb-3">Report bugs, technical issues, or inappropriate content</p>
                <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-violet-400">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium text-violet-300 mb-3">How do I upload images?</h3>
                <div className="text-gray-300 space-y-2">
                  <p>To upload images to Snapora:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Click the &quot;Upload&quot; button in the header or visit the upload page</li>
                    <li>Drag and drop your images or click to browse files</li>
                    <li>Add a title, description, and tags to your image</li>
                    <li>Choose privacy settings and publishing options</li>
                    <li>Click &quot;Publish&quot; to share your image</li>
                  </ol>
                </div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium text-violet-300 mb-3">What file formats are supported?</h3>
                <div className="text-gray-300">
                  <p>Snapora supports the following image formats:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>JPEG (.jpg, .jpeg)</li>
                    <li>PNG (.png)</li>
                    <li>GIF (.gif)</li>
                    <li>WebP (.webp)</li>
                    <li>SVG (.svg)</li>
                    <li>TIFF (.tiff, .tif)</li>
                  </ul>
                  <p className="mt-2 text-amber-300">Maximum file size: 50MB per image</p>
                </div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium text-violet-300 mb-3">How do I create collections?</h3>
                <div className="text-gray-300 space-y-2">
                  <p>To create a collection:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Go to the Collections page</li>
                    <li>Click &quot;Create Collection&quot;</li>
                    <li>Add a name and description for your collection</li>
                    <li>Choose privacy settings (public or private)</li>
                    <li>Start adding images to your collection</li>
                  </ol>
                </div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium text-violet-300 mb-3">How do I follow other users?</h3>
                <div className="text-gray-300">
                  <p>To follow other users:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Visit any user&apos;s profile page</li>
                    <li>Click the &quot;Follow&quot; button on their profile</li>
                    <li>You&apos;ll see their posts in your feed</li>
                    <li>You can unfollow at any time by clicking the same button</li>
                  </ul>
                </div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium text-violet-300 mb-3">How do I report inappropriate content?</h3>
                <div className="text-gray-300 space-y-2">
                  <p>To report inappropriate content:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Go to the image or user profile you want to report</li>
                    <li>Click the three dots menu (⋯)</li>
                    <li>Select &quot;Report&quot; from the options</li>
                    <li>Choose the reason for reporting</li>
                    <li>Add any additional details and submit</li>
                  </ol>
                  <p className="mt-2 text-amber-300">Reports are reviewed by our moderation team within 24 hours.</p>
                </div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium text-violet-300 mb-3">How do I change my account settings?</h3>
                <div className="text-gray-300">
                  <p>To change your account settings:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Click on your profile picture in the header</li>
                    <li>Select &quot;Settings&quot; from the dropdown menu</li>
                    <li>Navigate through different sections (Profile, Privacy, Notifications, etc.)</li>
                    <li>Make your changes and save them</li>
                  </ul>
                </div>
              </div>

              <div className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-medium text-violet-300 mb-3">How do I delete my account?</h3>
                <div className="text-gray-300 space-y-2">
                  <p>To delete your account:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Go to Settings → Account</li>
                    <li>Scroll down to the &quot;Danger Zone&quot; section</li>
                    <li>Click &quot;Delete Account&quot;</li>
                    <li>Confirm your password and reason for deletion</li>
                    <li>Click &quot;Delete Account&quot; to permanently remove your account</li>
                  </ol>
                  <p className="mt-2 text-red-300">⚠️ This action is irreversible and will permanently delete all your data.</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-violet-300 mb-3">How do I get verified?</h3>
                <div className="text-gray-300">
                  <p>To get verified on Snapora:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Have a complete profile with profile picture and bio</li>
                    <li>Upload at least 10 high-quality images</li>
                    <li>Maintain good standing with no policy violations</li>
                    <li>Apply for verification through your profile settings</li>
                    <li>Our team will review your application within 7 days</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Getting Started Guide */}
          <section className="bg-zinc-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-violet-400">Getting Started Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-white/5">
                <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium text-violet-300 mb-2">Create Your Account</h3>
                <p className="text-gray-300 text-sm">Sign up with your email and create a unique username. Add a profile picture and bio to complete your profile.</p>
              </div>

              <div className="bg-zinc-800/50 rounded-lg p-4 border border-white/5">
                <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium text-violet-300 mb-2">Upload Your First Image</h3>
                <p className="text-gray-300 text-sm">Start sharing your creativity by uploading your first image. Add titles, descriptions, and tags to help others discover your work.</p>
              </div>

              <div className="bg-zinc-800/50 rounded-lg p-4 border border-white/5">
                <div className="w-12 h-12 bg-violet-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium text-violet-300 mb-2">Connect & Explore</h3>
                <p className="text-gray-300 text-sm">Follow other creators, like and comment on images you love, and discover amazing content from around the world.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}