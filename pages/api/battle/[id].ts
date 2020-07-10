import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/battle/:id
const handleGET = async (battleId: string, res: NextApiResponse) => {
  const battle = await prisma.battle.findOne({
    where: { id: battleId },
    include: { arguments: { include: { comments: true } } },
  });

  res.json(battle);
};

// DELETE /api/battle/:id
const handleDELETE = async (battleId: string, res: NextApiResponse) => {
  const post = await prisma.battle.delete({
    where: { id: battleId },
  });

  res.json(post);
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const battleId = req.query.id.toString();

  switch (req.method) {
    case "GET":
      return handleGET(battleId, res);

    case "DELETE":
      return handleDELETE(battleId, res);

    default:
      res.status(405).json({
        error: `The HTTP ${req.method} method is not supported at this route.`,
      });
  }
};
