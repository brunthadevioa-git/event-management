import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I register for an event?",
      answer: "Simply navigate to the Discover page, click on the event you are interested in, and fill out the registration form at the bottom of the Event Details page."
    },
    {
      question: "Can I cancel my registration?",
      answer: "Currently, cancellations are handled manually. Please visit our Contact page and send us a message with your registration email and event title."
    },
    {
      question: "How do I host my own event on NexusEvents?",
      answer: "Event hosting is available through the 'Manage' dashboard. If you have admin access, you can easily click 'Create Event' and publish it instantly to our platform."
    },
    {
      question: "Are there any fees to use the platform?",
      answer: "NexusEvents is completely free for attendees to browse and register for free events. Premium and ticketing features for hosts will be rolling out later this year."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption for all registrations. Your email is only shared with the specific organizer of the event you registered for."
    }
  ];

  return (
    <div className="faq-container animate-fade-in">
      <div className="faq-header text-center">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about the platform and how it works.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item glass ${openIndex === index ? 'active' : ''}`}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              {openIndex === index ? <ChevronUp className="faq-icon" /> : <ChevronDown className="faq-icon" />}
            </div>
            <div className="faq-answer" style={{ maxHeight: openIndex === index ? '200px' : '0' }}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
