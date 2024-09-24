import React from 'react';

const Footer = () => {
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "Do not watch the clock. Do what it does. Keep going. - Sam Levenson",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4">© {new Date().getFullYear()}  NotesProblem. All rights reserved.</p>
        <blockquote className="text-lg italic">{randomQuote}</blockquote>
      </div>
    </footer>
  );
};

export default Footer;
