import Layout from "../components/Layout";

const Waitlist = () => {
  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-[#0C0F3F] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Join the Waitlist</h1>
          <p className="mb-8 text-gray-300">We’ll let you know when we launch.</p>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-l-full text-black"
            />
            <button className="px-4 py-2 bg-[var(--accent)] text-[var(--primary)] rounded-r-full font-semibold hover:bg-[var(--secondary)] hover:text-white transition-all duration-300">
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Waitlist;
