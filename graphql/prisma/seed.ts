import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

import { UserCreateInput } from '.prisma/client';

export const APP_SECRET = 'appsecret321';

const db = new PrismaClient();

main();

async function main() {
  const battle = {
    description: `<p>Nunc vitae odio sit amet ex consectetur luctus. Vivamus efficitur.</p><p>Leo nec pulvinar. Sed commodo enim non justo venenatis, eu eleifend.</p>`,
  };

  const users: UserCreateInput[] = [
    {
      userName: 'yuri',
      email: 'hi@mynameisyuri.com',
      password: 'test123',
      fullName: 'Yuri Yakovlev',
      battles: {
        create: Array(10).fill(battle),
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

  console.log('Seeded: %j', results);

  db.disconnect();
}
