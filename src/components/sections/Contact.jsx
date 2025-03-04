import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Your message has been sent successfully! I will get back to you soon.',
    });
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: '',
        });
      }, 5000);
    }, 500);
    
    // In a real application, you would send the form data to a server here
  };
  
  return (
    <section id="contact" className="py-20 bg-bgSecondary">
      <div className="section-container">
        <h2 className="section-title" data-aos="fade-right">Contact Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
            <p className="text-textSecondary mb-8">
              Feel free to reach out to me for collaborations, inquiries, or just to say hello!
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-accentPrimary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <FaEnvelope className="text-xl text-accentPrimary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <a 
                    href="mailto:aidil@lecturer.itk.ac.id" 
                    className="text-textSecondary hover:text-accentPrimary transition-colors"
                  >
                    aidil@lecturer.itk.ac.id
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-accentPrimary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <FaPhone className="text-xl text-accentPrimary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Phone</h4>
                  <a 
                    href="tel:+6281234567890" 
                    className="text-textSecondary hover:text-accentPrimary transition-colors"
                  >
                    +62 853 9895 xxxx
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-accentPrimary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <FaMapMarkerAlt className="text-xl text-accentPrimary" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Location</h4>
                  <p className="text-textSecondary">
                    Balikpapan, Indonesia
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-3">Connect With Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/aidilsaputrakirsan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accentPrimary/20 flex items-center justify-center text-accentPrimary hover:bg-accentPrimary hover:text-white transition-all"
                >
                  <FaGithub />
                </a>
                <a 
                  href="id.linkedin.com/in/aidil-saputra-kirsan-0808911bb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accentPrimary/20 flex items-center justify-center text-accentPrimary hover:bg-accentPrimary hover:text-white transition-all"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="https://twitter.com/aidilsaputrakirsan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-accentPrimary/20 flex items-center justify-center text-accentPrimary hover:bg-accentPrimary hover:text-white transition-all"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div data-aos="fade-up" data-aos-delay="200">
            <div className="bg-bgPrimary p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
              
              {formStatus.submitted && (
                <div className={`p-4 rounded-lg mb-6 ${formStatus.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-textSecondary mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bgSecondary border border-accentPrimary/20 text-textPrimary focus:outline-none focus:border-accentPrimary transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-textSecondary mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bgSecondary border border-accentPrimary/20 text-textPrimary focus:outline-none focus:border-accentPrimary transition-colors"
                    placeholder="Your Email"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-textSecondary mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bgSecondary border border-accentPrimary/20 text-textPrimary focus:outline-none focus:border-accentPrimary transition-colors"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-textSecondary mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-bgSecondary border border-accentPrimary/20 text-textPrimary focus:outline-none focus:border-accentPrimary transition-colors resize-none"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={formStatus.submitted}
                >
                  {formStatus.submitted ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;