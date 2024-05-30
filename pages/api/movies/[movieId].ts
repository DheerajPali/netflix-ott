import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid movieId");
    }
    if (!movieId) {
      throw new Error("movieId not found");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if(!movie){
        throw new Error('Movie Not Found');
    }

    return res.status(200).json(movie);

  } catch (error) {
    console.log("api :: [movieId] : Error", error);
    return res.status(400).end();
  }
}
