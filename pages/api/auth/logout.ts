import { NextApiRequest, NextApiResponse } from "next";

import { removeTokenCookie } from "@utils/auth-cookies";

// POST /api/auth/logout
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  removeTokenCookie(res);

  res.status(204).end();
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log("POST api/auth/logout");

  switch (req.method) {
    case "POST":
      return handlePOST(req, res);

    default:
      res.status(405).json({
        error: `The HTTP ${req.method} method is not supported at this route.`,
      });
  }
};
