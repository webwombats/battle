import { FC } from "react";
import { PrismaClient, Battle, Argument, Comment } from "@prisma/client";

import Header from "@components/Layout/Header";
import ErrorMessage from "@components/ErrorMessage";

type Props = {
  battle: Battle & {
    arguments: (Argument & {
      comments: Comment[];
    })[];
  };
};

const BattleTitle = () => (
  <div className="container mx-auto grid grid-cols-battle-title my-12 border-gray-900 font-sans">
    <div className="py-12 px-8 bg-havelock-blue self-center rounded-tl-xl rounded-bl-xl">
      <div className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white">
        Фуллстак
      </div>
    </div>
    <div className="or py-12">
      <div className="w-full text-center text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white text-opacity-75">
        или
      </div>
    </div>
    <div className="py-12 px-8 bg-fruit-salad self-center rounded-tr-xl rounded-br-xl">
      <div className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white">
        Специализация
      </div>
    </div>
  </div>
);

const BattleDescription: FC = ({ children }) => (
  <div className="max-w-4xl mx-auto bg-shark p-8 text-white text-base sm:text-lg md:text-xl lg:text-2xl rounded-xl font-serif">
    {children}
  </div>
);

const IndexPage = ({ battle }: Props) => {
  return (
    <div>
      <Header />

      <BattleTitle />
      <BattleDescription>
        <div dangerouslySetInnerHTML={{ __html: battle.description }} />
      </BattleDescription>

      <div>
        {battle.arguments.map((argument) => (
          <>
            <div>{argument.text}</div>
            <div>{argument.side}</div>
            <div>
              {argument.comments.map((comment) => (
                <div>{comment.text}</div>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const battles = await prisma.battle.findMany({
    include: { arguments: { include: { comments: true } } },
  });
  const paths = battles.map((battle) => ({
    params: { id: battle.id },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();

  const battle = await prisma.battle.findOne({
    where: { id: params.id },
    include: { arguments: { include: { comments: true } } },
  });

  return {
    props: {
      id: params.id,
      battle,
    },
    unstable_revalidate: 1,
  };
}

export default IndexPage;
