const PrismaClient = require("@prisma/client").PrismaClient;
const hash = require("bcryptjs").hash;
const faker = require("faker");
// import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";
// import * as faker from "faker";

import { UserCreateInput } from ".prisma/client";

const db = new PrismaClient();

const deleteEverything = async (name: string) => {
  const allItems = await db[name].findMany();

  const removedItems = await allItems.map(
    async (item: any) =>
      await db[name].delete({
        where: { id: item.id },
      })
  );

  return Promise.all(removedItems).then((values) => {
    console.log(`Removed ${name}s: %j`, values.length);
    return values;
  });
};

async function main() {
  await deleteEverything("comment");
  await deleteEverything("argument");
  await deleteEverything("battle");
  await deleteEverything("user");

  console.log("Success");

  db.disconnect();
}

main();
