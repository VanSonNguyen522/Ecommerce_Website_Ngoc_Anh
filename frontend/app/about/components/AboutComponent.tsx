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
              Chúng tôi cam kết mang lại những dịch vụ và sản phẩm tốt nhất cho khách hàng.
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
                Sứ mệnh của chúng tôi là đổi mới và dẫn đầu trong việc cung cấp các dịch vụ chất lượng cao nhằm tạo nên sự khác biệt trong cuộc sống của khách hàng.
              </p>
            </div>

            {/* Team Section */}
            <div className="p-8 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
              <h2 className="text-3xl font-semibold text-gray-800">
                Meet Our Team
              </h2>
              <p className="mt-4 text-gray-600">
                Đội ngũ của chúng tôi bao gồm các chuyên gia trong ngành, những người đam mê mang lại những trải nghiệm đặc biệt.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-12 bg-blue-500 text-white py-10 rounded-lg shadow-lg">
            <h2 className="text-3xl text-white font-semibold text-center">
              Our Core Values
            </h2>
            <ul className="mt-6 space-y-4 px-4 text-xl text-left">
              <li className="hover:text-yellow-300 transition duration-300">
                - Tính chính trực: Trung thực, đạo đức và minh bạch trong mọi hành động
              </li>
              <li className="hover:text-yellow-300 transition duration-300">
                - Tập trung vào khách hàng: Đặt nhu cầu và sự hài lòng của khách hàng lên hàng đầu
              </li>
              <li className="hover:text-yellow-300 transition duration-300">
                - Sự đổi mới: Luôn tạo ra và áp dụng các ý tưởng, giải pháp mới để cải thiện và phát triển
              </li>
              <li className="hover:text-yellow-300 transition duration-300">
                - Sự xuất sắc: Luôn phấn đấu để đạt được chất lượng cao nhất trong mọi hoạt động.
              </li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}
