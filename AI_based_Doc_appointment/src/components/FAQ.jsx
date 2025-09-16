import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: 'How do I book an appointment with a doctor?',
    answer:
      'Simply click the "Book Appointment" button, choose a doctor, select your preferred time slot, and confirm your booking.',
  },
  {
    question: 'Can I cancel or reschedule my appointment?',
    answer:
      'Yes, you can easily cancel or reschedule your appointment from your account dashboard under "My Appointments".',
  },
  {
    question: 'Is the AI Medical Assistant reliable?',
    answer:
      'Our AI assistant provides accurate responses based on trained medical data, but it does not replace a certified doctor’s advice.',
  },
  {
    question: 'Will I get reminders for my appointments?',
    answer:
      'Yes, our system will send you timely reminders through notifications and email before your appointment.',
  },
  {
    question: 'Are online consultations available?',
    answer:
      'Yes, many of our doctors offer secure video consultations. You can choose the consultation mode during booking.',
  },
  {
    question: 'Is my medical information secure?',
    answer:
      'Absolutely. We follow strict privacy protocols and use encryption to ensure all your health data remains confidential and secure.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div id="faq" className="flex flex-col items-center gap-6 py-2 text-gray-800 bg-white">
      <h1 className="text-3xl font-semibold">
        Frequently Asked <span className="text-[#037c6e]">Questions</span>
      </h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600">
        Get answers to common queries about booking appointments, using our features, and more.
      </p>

      <div className="w-full max-w-4xl px-4 mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
            >
              <span className="text-gray-800 font-medium">{faq.question}</span>
              <FaChevronDown
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180 text-[#037c6e]' : ''
                }`}
              />
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 text-sm text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
