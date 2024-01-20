import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { getToken  } = getAuth(req);
 
  const token = await getToken();

  return res.status(200).json({token});

}