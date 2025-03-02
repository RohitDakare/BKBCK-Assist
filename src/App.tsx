import React from 'react';
import ChatbotAgent from './components/ChatbotAgent';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">University College</h1>
          <nav className="mt-4">
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-blue-200">Home</a></li>
              <li><a href="#" className="hover:text-blue-200">Programs</a></li>
              <li><a href="#" className="hover:text-blue-200">Admissions</a></li>
              <li><a href="#" className="hover:text-blue-200">Campus Life</a></li>
              <li><a href="#" className="hover:text-blue-200">About</a></li>
              <li><a href="#" className="hover:text-blue-200">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to University College</h2>
            <p className="mb-4">
              We are dedicated to providing quality education and fostering academic excellence. 
              Our institution offers a wide range of programs designed to prepare students for 
              successful careers and meaningful contributions to society.
            </p>
            <p>
              Have questions? Our AI assistant is here to help! Click the chat icon in the 
              bottom right corner to get instant answers about admissions, programs, campus life, 
              and more.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3">Undergraduate Programs</h3>
            <p>Explore our diverse undergraduate programs designed to provide a strong foundation for your future.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3">Graduate Studies</h3>
            <p>Advance your career with our specialized graduate programs led by industry experts and researchers.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3">Research Opportunities</h3>
            <p>Engage in cutting-edge research projects that address real-world challenges and drive innovation.</p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            <li className="border-b pb-3">
              <h3 className="font-bold">Open House</h3>
              <p className="text-sm text-gray-600">March 15, 2025 | 10:00 AM - 3:00 PM</p>
            </li>
            <li className="border-b pb-3">
              <h3 className="font-bold">Application Workshop</h3>
              <p className="text-sm text-gray-600">April 5, 2025 | 1:00 PM - 4:00 PM</p>
            </li>
            <li>
              <h3 className="font-bold">Summer Session Registration</h3>
              <p className="text-sm text-gray-600">April 20, 2025 | Online</p>
            </li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Contact Us</h3>
              <p>123 University Avenue</p>
              <p>College Town, CT 12345</p>
              <p>info@universitycollege.edu</p>
              <p>(123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-blue-300">Library</a></li>
                <li><a href="#" className="hover:text-blue-300">Student Portal</a></li>
                <li><a href="#" className="hover:text-blue-300">Career Services</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-300">Facebook</a>
                <a href="#" className="hover:text-blue-300">Twitter</a>
                <a href="#" className="hover:text-blue-300">Instagram</a>
                <a href="#" className="hover:text-blue-300">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p>&copy; 2025 University College. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Agent */}
      <ChatbotAgent title="University Assistant" />
    </div>
  );
}

export default App;