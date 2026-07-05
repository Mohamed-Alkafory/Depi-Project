import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';
import VisitStudio from './VisitStudio';


const ContactPage = () => {
  return (
    <div className="font-body bg-background text-on-surface min-h-screen">
     

      <main>
        {/* Hero */}
        <ContactHero />

        {/* Split: Form + Details */}
        <section className="pb-section-gap px-6 md:px-desktop-margin max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-gutter items-start">
            <ContactForm />
            <ContactDetails />
          </div>
        </section>

        {/* Visit Studio */}
        <VisitStudio />
      </main>

    </div>
  );
};

export default ContactPage;