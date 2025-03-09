
import Layout from "@/components/Layout";
import CreateBlogForm from "@/components/CreateBlogForm";

const CreateBlog = () => {
  return (
    <Layout>
      <section className="section-padding bg-divine-light/10">
        <div className="divine-container">
          <h1 className="section-heading text-center mb-10">
            <span className="text-divine">Create</span> New Blog
          </h1>
          
          <div className="max-w-3xl mx-auto">
            <CreateBlogForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateBlog;
