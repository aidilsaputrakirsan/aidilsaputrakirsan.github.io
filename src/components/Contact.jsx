import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';

const ContactCard = ({ icon: Icon, title, value, link }) => (
  <a
    href={link}
    target={link.startsWith('http') ? '_blank' : undefined}
    rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="flex items-start space-x-4 p-4 bg-[#232323] dark:bg-[#F7F7F7] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
  >
    <div className="bg-[#4CAF50] dark:bg-[#FF5722] rounded-lg p-3">
      <Icon className="w-6 h-6 text-[#E0E0E0] dark:text-[#212121]" />
    </div>
    <div>
      <h3 className="font-medium text-[#E0E0E0] dark:text-[#212121]">{title}</h3>
      <p className="text-[#A9A9A9] dark:text-[#757575]">{value}</p>
    </div>
  </a>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <section id="contact" className="py-20 bg-[#181818] dark:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#E0E0E0] dark:text-[#212121] sm:text-4xl">
            Get in Touch
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#4CAF50] mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-[#232323] dark:bg-[#F7F7F7] rounded-xl shadow-lg p-6 space-y-8">
              <h3 className="text-2xl font-bold text-[#E0E0E0] dark:text-[#212121] mb-4">
                Contact Information
              </h3>

              <div className="grid gap-6">
                <ContactCard
                  icon={Mail}
                  title="Email"
                  value="aidil@lecturer.itk.ac.id"
                  link="mailto:aidil@lecturer.itk.ac.id"
                />
                
                <ContactCard
                  icon={Phone}
                  title="Phone"
                  value="+62 853 9895 xxxx"
                  link="tel:+628539895xxx"
                />
                
                <ContactCard
                  icon={MapPin}
                  title="Location"
                  value="Balikpapan, Indonesia"
                  link="https://maps.google.com/?q=Sepinggan+Pratama+Blok+G12+No.9+Street,+Balikpapan"
                />
              </div>

              <div className="pt-8 border-t border-[#2C2C2C] dark:border-[#E0E0E0]">
                <h4 className="text-lg font-semibold text-[#E0E0E0] dark:text-[#212121] mb-4">
                  Find me on
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/aidilsaputrakirsan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#2C2C2C] dark:bg-[#E0E0E0] rounded-full hover:bg-[#4CAF50] dark:hover:bg-[#FF5722] transition-colors"
                  >
                    <Github className="w-6 h-6 text-[#E0E0E0] dark:text-[#212121]" />
                  </a>
                  <a
                    href="https://id.linkedin.com/in/aidil-saputra-kirsan-0808911bb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#2C2C2C] dark:bg-[#E0E0E0] rounded-full hover:bg-[#4CAF50] dark:hover:bg-[#FF5722] transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-[#E0E0E0] dark:text-[#212121]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#232323] dark:bg-[#F7F7F7] rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#E0E0E0] dark:text-[#212121]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#2C2C2C] shadow-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#E0E0E0] dark:border-[#757575] dark:text-[#212121]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E0E0E0] dark:text-[#212121]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#2C2C2C] shadow-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#E0E0E0] dark:border-[#757575] dark:text-[#212121]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#E0E0E0] dark:text-[#212121]">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#2C2C2C] shadow-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#E0E0E0] dark:border-[#757575] dark:text-[#212121]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#E0E0E0] dark:text-[#212121]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-[#2C2C2C] shadow-sm focus:border-[#4CAF50] focus:ring-[#4CAF50] dark:bg-[#E0E0E0] dark:border-[#757575] dark:text-[#212121]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#E0E0E0] dark:text-[#212121] bg-[#4CAF50] hover:bg-[#388E3C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                <span className="ml-2">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
