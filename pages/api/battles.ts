import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/battles
const handleGET = async (res: NextApiResponse) => {
  const battles = await prisma.battle.findMany({
    include: { standpoints: { include: { comments: true } } },
  });

  res.json(battles);
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return handleGET(res);

    default:
      res.status(405).json({
        error: `The HTTP ${req.method} method is not supported at this route.`,
      });
  }
};
