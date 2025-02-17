
export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Car Recognition App. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
