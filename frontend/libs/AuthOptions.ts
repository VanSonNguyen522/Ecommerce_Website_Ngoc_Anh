// import { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import prismadb from './prismadb';
// import bcrypt from 'bcrypt';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// export const authOptions: AuthOptions = {
//     providers: [
//       CredentialsProvider({
//         name: 'credentials',
//         credentials: {
//           email: { label: 'Email', type: 'email' },
//           password: { label: 'Password', type: 'password' },
//         },
//         async authorize(credentials) {
//           console.log("Authorization triggered with credentials: ", credentials);
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error('Missing Credentials');
//           }
  
//           const user = await prismadb.user.findFirst({
//             where: { email: credentials.email },
//           });
//           console.log("User found in database: ", user);
  
//           if (!user || !user.id || !user.hashedPassword) {
//             throw new Error('Invalid Credentials');
//           }
  
//           const isCorrectPassword = await bcrypt.compare(
//             credentials.password,
//             user.hashedPassword
//           );
//           if (!isCorrectPassword) {
//             throw new Error('Invalid Credentials');
//           }
  
//           return user;
//         },
//       }),
//     ],
  
//     secret: process.env.NEXTAUTH_SECRET,
  
//     session: {
//       strategy: 'jwt',
//       maxAge: 30 * 24 * 60 * 60,
//     },
  
//     jwt: {
//       secret: process.env.NEXTAUTH_SECRET,
//       maxAge: 30 * 24 * 60 * 60,
//     },
  
//     callbacks: {
//       async jwt({ token, user }) {
//         console.log("JWT Callback - token: ", token);
//         if (user) {
//           token.id = user.id;
//         }
//         return token;
//       },
  
//       async session({ session, token }) {
//         console.log("Session Callback - token: ", token);
//         console.log("Session Callback - session: ", session);
//         session.user.id = token.id;
//         return session;
//       },
//     },
  
//     pages: {
//       signIn: '/signin',
//     },
  
//     debug: true, // Enable debug for more logging
//   };
//   / Enable debug logs in development
import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prismadb from './prismadb';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null
    };
  }

  interface User {
    id: string;
    email: string;
    role: string
    // Add other fields as necessary
  }
}

// export const authOptions: AuthOptions = {
//   providers: [
//     Credentials({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // Check if credentials are defined
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Missing credentials');
//         }

//         // Look up the user in the database by email
//         const user = await prismadb.user.findFirst({
//           where: { email: credentials.email },
//         });

//         if (!user || !user.hashedPassword) {
//           throw new Error('Invalid credentials');
//         }

//         // Compare the entered password with the stored hashed password
//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );
//         if (!isCorrectPassword) {
//           throw new Error('Invalid credentials');
//         }

//         // Return the user object with the required properties
//         return { id: user.id, email: user.email }; // Must return { id: string, email: string }
//       },
//     }),
//   ],

//   session: {
//     strategy: 'jwt', // Use JWT strategy
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id; // Set the user ID on the token
//         token.name = user.name; // Set the user name on the token (if available)
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id as string; // Ensure session user has the ID
//       session.user.name = token.name || ''; // Ensure the name is set (or an empty string)
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/signin', // Define the custom sign-in page
//   },
// };

export const authOptions: AuthOptions = {
    providers: [
      Credentials({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Missing credentials');
          }
  
          // Tìm user trong database
          const user = await prismadb.user.findFirst({
            where: { email: credentials.email },
          });
  
          if (!user || !user.hashedPassword) {
            throw new Error('Invalid credentials');
          }
  
          // Kiểm tra mật khẩu
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }
  
          // Trả về user bao gồm role
          return {
            id: user.id,
            email: user.email,
            role: user.role, // Thêm role vào user
          };
        },
      }),
    ],
  
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = user.role; // Thêm role vào token
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id as string;
        session.user.role = token.role as string; // Thêm role vào session
        return session;
      },
    },
    pages: {
      signIn: '/signin', // Đường dẫn trang đăng nhập
    },
  };
  


