import { PrismaClient, Battle, Standpoint, Comment } from "@prisma/client";

import Header from "@components/Layout/Header";

export type BattleIDPage = Battle & {
  standpoints: (Standpoint & {
    comments: Comment[];
  })[];
};

type Props = {
  battle: BattleIDPage;
};

const BattleTitle = ({ sideA, sideB }: Partial<Battle>) => (
  <div className="container mx-auto grid grid-cols-battle-title my-12 border-gray-900 font-sans">
    <div className="py-12 px-8 bg-havelock-blue self-center rounded-tl-xl rounded-bl-xl">
      <div className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white">
        {sideA}
      </div>
    </div>
    <div className="or py-12">
      <div className="w-full text-center text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white text-opacity-75">
        or
      </div>
    </div>
    <div className="py-12 px-8 bg-fruit-salad self-center rounded-tr-xl rounded-br-xl">
      <div className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white">
        {sideB}
      </div>
    </div>
  </div>
);

const BattleDescription = ({ description }: Partial<BattleIDPage>) => (
  <div className="max-w-4xl mx-auto bg-shark p-8 text-white text-base sm:text-lg md:text-xl lg:text-2xl rounded-xl font-serif">
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);

const StandpointList = ({ standpoints }: Partial<BattleIDPage>) => (
  <div className="container mx-auto my-12 border-gray-900 font-sans">
    {standpoints &&
      standpoints.map((standpoint) => (
        <div
          className={`my-8 py-12 px-8 ${
            standpoint.side === "SIDE_A" ? "bg-havelock-blue" : "bg-fruit-salad"
          } self-center rounded-xl`}
        >
          <div>{standpoint.text}</div>
          <div>{standpoint.side}</div>
          <div>
            {standpoint.comments.map((comment) => (
              <div>{comment.text}</div>
            ))}
          </div>
        </div>
      ))}
  </div>
);

const BattleIDPage = ({ battle }: Props) => {
  return (
    <div>
      <Header />

      <BattleTitle {...battle} />
      <BattleDescription {...battle} />
      <StandpointList {...battle} />
    </div>
  );
};

export async function getStaticPaths() {
  const prisma = new PrismaClient();

  const battles = await prisma.battle.findMany({
    include: { standpoints: { include: { comments: true } } },
  });
  const paths = battles.map((battle) => ({
    params: { id: battle.id },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();

  const battle = await prisma.battle.findOne({
    where: { id: params.id },
    include: { standpoints: { include: { comments: true } } },
  });

  return {
    props: {
      id: params.id,
      battle,
    },
    unstable_revalidate: 1,
  };
}

export default BattleIDPage;

// TODO: Чужие аргументы меня переубедили
