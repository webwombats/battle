import Header from "@components/Layout/Header";
import BattleList from "@components/BattleList";

import { BattlesDocument } from "@codegen";
import { initializeApollo } from "@lib/apolloClient";

const IndexPage = () => {
  return (
    <div className="container mx-auto">
      <Header />

      <BattleList />
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: BattlesDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}

export default IndexPage;
