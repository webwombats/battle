import { PrismaClient } from "@prisma/client";

import Header from "@components/Layout/Header";
import BattleList from "@components/BattleList";

const IndexPage = ({ battles }) => {
  return (
    <div className="container mx-auto">
      <Header />

      <BattleList data={battles} />
    </div>
  );
};

export async function getStaticProps() {
  const prisma = new PrismaClient();

  const battles = await prisma.battle.findMany({
    include: { arguments: { include: { comments: true } } },
  });

  return {
    props: {
      battles,
    },
    unstable_revalidate: 1,
  };
}

export default IndexPage;
