"use client"

import { useSession } from 'next-auth/react';

const MyComponents = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to continue.</div>;
  }

  return (
    <div>
      {/* Check if session.user.name is available, fallback to session.user.id */}
      <h1>Welcome, {session.user.name || session.user.id || 'Guest'}!</h1>
    </div>
  );
};

export default MyComponents;
