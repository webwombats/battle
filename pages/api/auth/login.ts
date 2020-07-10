import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { TOKEN_SECRET } from "../../../config";
import { setLoginSession } from "../../../utils/auth";

const prisma = new PrismaClient();

// POST /api/auth/login
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: `Some parameters in the payload are missing.`,
    });
  }

  const user = await prisma.user.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(401).json({
      error: "Unauthorized",
    });
  }

  const passwordValid = await compare(password, user.password);

  if (!passwordValid) {
    res.status(401).json({
      error: `Unauthorized, Invalid password`,
    });
  }

  await setLoginSession(res, user);

  res.json({
    token: sign({ userId: user.id }, TOKEN_SECRET),
    user,
  });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`POST api/auth/login`, req.body);

  switch (req.method) {
    case "POST":
      return handlePOST(req, res);

    default:
      res.status(405).json({
        error: `The HTTP ${req.method} method is not supported at this route.`,
      });
  }
};
