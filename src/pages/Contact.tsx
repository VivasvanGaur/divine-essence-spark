
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-b from-divine-light/30 to-white">
        <div className="divine-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 text-xs font-medium rounded-full bg-saffron-light text-divine-dark capitalize animate-fade-in">
              Get in Touch
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-divine-dark mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Connect With Me
            </h1>
            <p className="text-lg text-divine-dark/80 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Whether you're seeking spiritual guidance or simply want to share your thoughts, I'm here to connect with you.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="divine-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="section-subheading mb-6">Reach Out</h2>
              <p className="text-divine-dark/80 mb-8">
                I welcome your messages and look forward to connecting with you. Whether you have questions about spiritual practices, want to share your experiences, or are interested in personal guidance, please don't hesitate to reach out.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-divine-light rounded-full p-3 text-divine">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-divine-dark">Phone</h3>
                    <p className="text-divine-dark/70">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-divine-light rounded-full p-3 text-divine">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-divine-dark">Email</h3>
                    <p className="text-divine-dark/70">connect@spiritualjourney.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-divine-light rounded-full p-3 text-divine">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-divine-dark">Location</h3>
                    <p className="text-divine-dark/70">Spiritual Retreat Center<br/>123 Serenity Way, Mindful Valley</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-serif text-lg font-medium text-divine-dark mb-4">Connect on Social Media</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, label: "Facebook" },
                    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, label: "Instagram" },
                    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>, label: "Twitter" },
                    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, label: "LinkedIn" },
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="bg-white hover:bg-divine-light text-divine-dark hover:text-divine border border-divine-light/50 rounded-full p-3 transition-colors duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
