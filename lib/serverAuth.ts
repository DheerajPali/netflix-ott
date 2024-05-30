import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  console.log("Session:",session);

console.log("session.user.email",session?.user?.email)
  if (!session || !session.user || !session.user.email) {
    console.log('Session or user email not found');
    throw new Error("No active session found or user email is missing");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('User not signed in or does not exist');
  }

  return { currentUser };
};

export default serverAuth;
