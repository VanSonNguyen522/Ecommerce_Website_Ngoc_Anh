// import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/AuthOptions';
import { redirect } from 'next/navigation';

// interface ProtectedRootLayoutProps{
//     children: React.ReactNode
// }

// export default async function ProtectedRootLayout({
//     children
// }: ProtectedRootLayoutProps) {

//     const session = await getServerSession(authOptions);

//     if(!session?.user?.email){
//         redirect("/signin");
//     }

//     return (
//         <main>
//             {children}
//         </main>
//     )
// }

import React from 'react';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <main>
            {children}
        </main>
    );
}

// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;   // Add the id field here
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }

//   interface JWT {
//     id: string; // Include the id field in the JWT token as well
//   }
// }


