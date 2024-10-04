import Head from 'next/head';

export default function AboutComponent() {
  return (
    <div>
      <Head>
        <title>About Us - Our Company</title>
        <meta name="description" content="Learn more about our company, our values, and our team." />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              About Our Company
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              We are committed to delivering the best services and products to our customers.
            </p>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission Section */}
            <div className="p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
              <h2 className="text-3xl font-semibold text-gray-800">
                Our Mission
              </h2>
              <p className="mt-4 text-gray-600">
                Our mission is to innovate and lead in providing high-quality services that make a difference in our clients' lives.
              </p>
            </div>

            {/* Team Section */}
            <div className="p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
              <h2 className="text-3xl font-semibold text-gray-800">
                Meet Our Team
              </h2>
              <p className="mt-4 text-gray-600">
                Our team consists of industry experts who are passionate about delivering exceptional experiences.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-12 bg-blue-600 text-white py-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center">
              Our Core Values
            </h2>
            <ul className="mt-6 space-y-4 text-lg text-center">
              <li className="hover:underline">- Integrity</li>
              <li className="hover:underline">- Customer Focus</li>
              <li className="hover:underline">- Innovation</li>
              <li className="hover:underline">- Excellence</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
