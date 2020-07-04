import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

import { UserCreateInput } from '.prisma/client';

export const APP_SECRET = 'appsecret321';

const db = new PrismaClient();

main();

async function main() {
  // const battles = [
  //   {
  //     description: 'Hello',
  //   },
  //   {
  //     description: 'Hello 2',
  //   },
  // ];

  const users: UserCreateInput[] = [
    {
      userName: 'yuri',
      email: 'hi@mynameisyuri.com',
      password: 'test123',
      fullName: 'Yuri Yakovlev',
      battles: {
        create: [
          {
            description: 'Hello there',
          },
          {
            description: 'Hello there 2',
          },
          {
            description: 'Hello there 3',
          },
          {
            description: 'Hello there 4',
          },
          {
            description: 'Hello there 5',
          },
          {
            description: 'Hello there 6',
          },
          {
            description: 'Hello there 7',
          },
          {
            description: 'Hello there 8',
          },
          {
            description: 'Hello there 9',
          },
          {
            description: 'Hello there 10',
          },
        ],
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

  // for (const battle of battles) {
  //   results.push(await db.battle.create({ data: battle }));
  // }

  console.log('Seeded: %j', results);

  db.disconnect();
}
