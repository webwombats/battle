import { FC } from "react";

import Header from "@components/Layout/Header";
import ErrorMessage from "@components/ErrorMessage";

import { initializeApollo } from "@lib/apolloClient";
import { BattlesDocument, BattleDocument, useBattleQuery } from "@codegen";

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

const IndexPage = ({ id }) => {
  const { loading, error, data, fetchMore, networkStatus } = useBattleQuery({
    variables: { id },
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  return (
    <div>
      <Header />

      <BattleTitle />
      <BattleDescription>
        <div dangerouslySetInnerHTML={{ __html: data.battle.description }} />
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
      id: params.id,
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}

export default IndexPage;
