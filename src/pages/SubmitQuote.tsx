
import Layout from "@/components/Layout";
import CreateQuoteForm from "@/components/CreateQuoteForm";

const SubmitQuote = () => {
  return (
    <Layout>
      <section className="section-padding bg-saffron-light/20">
        <div className="divine-container">
          <h1 className="section-heading text-center mb-10">
            <span className="text-divine">Submit</span> Daily Wisdom
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <CreateQuoteForm />
          </div>
          
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <p className="text-divine-dark/70 italic">
              "Words have the power to both destroy and heal. When words are both true and kind, they can change our world."
            </p>
            <p className="mt-2 text-divine font-medium">— Buddha</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitQuote;
