import "../app/globals.css";

import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  return (
    <>
      <div className="bg-green-900 text-2xl text-white">Hey Netflix , Login success..</div>
      <button className='h-10 w-full bg-white hover:opacity-80'
      onClick={() => signOut()}
      >
        Logout
      </button>
    </>
  );
}
