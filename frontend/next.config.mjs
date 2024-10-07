/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'khothepxaydung.com',
          port: '',
          pathname: '/**',
        },
//         {
//           protocol: 'https',
//           hostname: 'tiimg.tistatic.com',
//           port: '',
//           pathname: '/**',
//         },
//         {
//           protocol: 'https',
//           hostname: '5.imimg.com',
//           port: '',
//           pathname: '/**',
//         },
      ],
    },
  };
  
  export default nextConfig;
  