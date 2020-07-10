import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/battle
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sideA, sideB, description, userId } = req.body;

  if (!sideA || !sideB || !description || !userId) {
    res.status(400).json({
      error: `Some parameters in the payload are missing.`,
    });
  }

  const result = await prisma.battle.create({
    data: {
      sideA,
      sideB,
      description,
      User: {
        connect: { id: userId },
      },
    },
  });

  res.json(result);
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`POST api/post`, req.body);

  switch (req.method) {
    case "POST":
      return handlePOST(req, res);

    default:
      res.status(405).json({
        error: `The HTTP ${req.method} method is not supported at this route.`,
      });
  }
};
