import { FC } from "react";

import Header from "@components/Layout/Header";
import { initializeApollo } from "@lib/apolloClient";
import { BattlesDocument, BattleDocument } from "@codegen";

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

const IndexPage = () => {
  return (
    <div>
      <Header />

      <BattleTitle />
      <BattleDescription>
        <p>
          Старый предмет споров: кем быть, как себя позиционировать, как расти?
          Можно ли себя называть фронтендером/бэкендером или настоящий
          программист должен быть инженером, а специализация - особенность
          проекта/задачи?
        </p>
        <p>
          С одной стороны "фуллстек - вечный мидл, ничего толком не знает, за
          двумя зайцами погонишься...", а "специализация в одной области - выбор
          настоящего профессионала".
        </p>
        <p>
          С другой - "нужно уметь делать проект от и до, хотя бы в плане
          разработки, без работы не останешься, шире кругозор".
        </p>
      </BattleDescription>
    </div>
  );
};

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: BattlesDocument,
  });

  const paths = data.battles.map((battle) => ({
    params: { id: battle.id },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BattleDocument,
    variables: { id: params.id },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}

export default IndexPage;
