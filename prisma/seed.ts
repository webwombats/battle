const PrismaClient = require("@prisma/client").PrismaClient;
const hash = require("bcryptjs").hash;

import { UserCreateInput } from ".prisma/client";

const db = new PrismaClient();

main();

async function main() {
  const battle = {
    description: `<p>Nunc vitae odio sit amet ex consectetur luctus. Vivamus efficitur.</p><p>Leo nec pulvinar. Sed commodo enim non justo venenatis, eu eleifend.</p>`,
  };

  const users: UserCreateInput[] = [
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
          arguments: {
            create: {
              text: "Some argument",
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

  // Could use Promise.all
  // Sequential here so that world IDs match the array order above

  let results = [];

  for (const user of users) {
    const hashedPassword = await hash(user.password, 10);
    const createdUser = await db.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });

    results.push(createdUser);
  }

  console.log("Seeded: %j", results);

  db.disconnect();
}
