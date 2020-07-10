import Link from "next/link";

import ErrorMessage from "./ErrorMessage";

const BattleList = ({ data }) => {
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

  return (
    <section>
      <ul>
        {data.map((battle, index) => (
          <li key={battle.id} className="py-4">
            <div>
              <p>
                <b>Battle description</b>:
              </p>
              <div dangerouslySetInnerHTML={{ __html: battle.description }} />
            </div>
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
