import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { getLoginSession } from "utils/auth";

const prisma = new PrismaClient();

// GET /api/auth/me
const handleGET = async (userId: string, res: NextApiResponse) => {
  const user = await prisma.user.findOne({
    where: {
      id: userId,
    },
  });

  res.json(user);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("GET api/auth/me");

  const session = await getLoginSession(req, res);

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const userId = session.id;

  switch (req.method) {
    case "GET":
      return handleGET(userId, res);

    default:
      res.status(405).json({
        error: `The HTTP ${req.method} method is not supported at this route.`,
      });
  }
};
