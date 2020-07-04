import { NetworkStatus } from "apollo-client";

import ErrorMessage from "./ErrorMessage";
import { useBattlesQuery } from "../codegen/generated/graphql";
import Link from "next/link";

const BattleList = () => {
  const { loading, error, data, fetchMore, networkStatus } = useBattlesQuery({
    // variables: allPostsQueryVars,
    // Setting this value to true will make the component rerender when
    // the "networkStatus" changes, so we are able to know if it is fetching
    // more data
    notifyOnNetworkStatusChange: true,
  });

  const loadingMoreBattles = networkStatus === NetworkStatus.fetchMore;

  // const loadMorePosts = () => {
  //   fetchMore({
  //     variables: {
  //       skip: allPosts.length,
  //     },
  //     updateQuery: (previousResult, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) {
  //         return previousResult;
  //       }
  //       return Object.assign({}, previousResult, {
  //         // Append the new posts results to the old one
  //         allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
  //       });
  //     },
  //   });
  // };

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMoreBattles) return <div>Loading</div>;

  // const { allPosts, _allPostsMeta } = data;
  // const areMorePosts = allPosts.length < _allPostsMeta.count;

  return (
    <section>
      <ul>
        {data.battles.map((battle, index) => (
          <li key={battle.id} className="py-4">
            <p>
              <b>Battle description</b>: {battle.description}
            </p>
            <p>
              <b>UserId created this battle</b>: {battle.userId}
            </p>

            <Link href="/battle/[id]" as={`/battle/${battle.id}`}>
              <a className="underline hover:no-underline text-white">
                Go to battle
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {/* 
        {areMorePosts && (
          <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
            {loadingMorePosts ? "Loading..." : "Show More"}
          </button>
        )} */}
    </section>
  );
};

export default BattleList;
