const PrismaClient = require("@prisma/client").PrismaClient;
const hash = require("bcryptjs").hash;
const faker = require("faker");
// import { PrismaClient } from "@prisma/client";
// import { hash } from "bcryptjs";
// import * as faker from "faker";

import { UserCreateInput } from ".prisma/client";

const db = new PrismaClient();

faker.seed(12345);

const mainUsers: UserCreateInput[] = [
  {
    id: "ckc918o7m000201mqh0ambcxl",
    userName: "dmitriy",
    email: "me@dmitryakovlev.com",
    password: "test123",
    fullName: "Dmitriy Yakovlev",
    role: "ADMIN",
  },
  {
    id: "ckc9180xz000101mqe1w00qtm",
    userName: "yuri",
    email: "hi@mynameisyuri.com",
    password: "test123",
    fullName: "Yuri Yakovlev",
    role: "ADMIN",
    battles: {
      create: {
        id: "ckc9314zo000001mq11v6fwug",
        sideA: "This is side A text",
        sideB: "This is side B text",
        description:
          "<p>Nunc vitae odio sit amet ex consectetur luctus. Vivamus efficitur.</p><p>Leo nec pulvinar. Sed commodo enim non justo venenatis, eu eleifend.</p>",
        standpoints: {
          create: {
            text: "Some standpoint",
            side: "SIDE_B",
            User: {
              connect: {
                id: "ckc918o7m000201mqh0ambcxl",
              },
            },
          },
        },
      },
    },
  },
];

const battle = {
  description: `<p>Nunc vitae odio sit amet ex consectetur luctus. Vivamus efficitur.</p><p>Leo nec pulvinar. Sed commodo enim non justo venenatis, eu eleifend.</p>`,
};

async function main() {
  const generateUsers = async (amount: number = 5) =>
    new Array(amount).fill(null).map((e) => ({
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: "test123",
      fullName: faker.name.findName(),
      role: "ADMIN",
    }));

  const generatedUsers = await generateUsers(100);

  let userResults = [];

  for (const mainUser of mainUsers) {
    const hashedPassword = await hash(mainUser.password, 10);
    const createdUser = await db.user.create({
      data: {
        ...mainUser,
        password: hashedPassword,
      },
    });
  }

  for (const user of generatedUsers) {
    const hashedPassword = await hash(user.password, 10);
    const createdUser = await db.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    var randomSide = Math.round(Math.random());

    const createdStandpoint = await db.standpoint.create({
      data: {
        text: faker.lorem.paragraph(),
        side: randomSide === 0 ? "SIDE_A" : "SIDE_B",
        Battle: {
          connect: {
            id: "ckc9314zo000001mq11v6fwug",
          },
        },
        User: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });

    userResults.push({ ...createdUser, standpoint: createdStandpoint });
  }

  console.log("Seeded: %j", userResults);

  db.disconnect();
}

main();
