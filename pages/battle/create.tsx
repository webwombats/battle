// import { PrismaClient, Battle, Argument, Comment } from "@prisma/client";

import Header from "@components/Layout/Header";

const BattleCreatePage = () => {
  return (
    <>
      <Header />
      <p>BattleCreatePage</p>
    </>
  );
};

// export async function getStaticPaths() {
//   const prisma = new PrismaClient();

//   const battles = await prisma.battle.findMany({
//     include: { arguments: { include: { comments: true } } },
//   });
//   const paths = battles.map((battle) => ({
//     params: { id: battle.id },
//   }));

//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const prisma = new PrismaClient();

//   const battle = await prisma.battle.findOne({
//     where: { id: params.id },
//     include: { arguments: { include: { comments: true } } },
//   });

//   return {
//     props: {
//       id: params.id,
//       battle,
//     },
//     unstable_revalidate: 1,
//   };
// }

export default BattleCreatePage;
