import { NextPage } from "next";

import Header from "@components/Layout/Header";
import BattleList from "@components/BattleList";

import {
  PrismaClient,
  Battle,
  Comment,
  User,
  Standpoint,
} from "@prisma/client";

export type IndexPageBattle = Battle & {
  standpoints: Array<
    Standpoint & {
      comments: Comment[];
    }
  >;
  User: User;
};

interface Props {
  battles: IndexPageBattle[];
}

const IndexPage: NextPage<Props> = ({ battles }) => {
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
    include: { standpoints: { include: { comments: true } }, User: true },
  });

  return {
    props: {
      battles,
    },
    revalidate: 1,
  };
}

export default IndexPage;
