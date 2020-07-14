import Link from "next/link";
import pluralize from "pluralize";

import { CommentIcon } from "@components/Icon";
import UpvoteButton from "@components/UpvoteButton";

import { IndexPageBattle } from "pages";
import { useUser } from "@components/Layout/Header/Header";

const BattleCardTitle = ({ sideA, sideB }: Partial<IndexPageBattle>) => (
  <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-bold mb-4">
    <span className="text-havelock-blue">{sideA}</span> or{" "}
    <span className="text-fruit-salad">{sideB}</span>
  </h2>
);

const BattleCardUserInfoLink = ({ User }: Partial<IndexPageBattle>) => (
  <Link href="/user/[id]" as={`/user/${User.userName}`}>
    <a className="flex items-center mb-2 sm:mb-0 sm:mr-10 text-gray-500 hover:text-gray-300">
      <span className="w-5 h-5 rounded-full bg-yellow-500 mr-2"></span>
      <span className="text-sm sm:text-base">{User.fullName}</span>
    </a>
  </Link>
);

const BattleCardCommentsLink = ({ id }: Partial<IndexPageBattle>) => (
  <Link href="/battle/[id]" as={`/battle/${id}`}>
    <a className="flex items-center text-gray-500 hover:text-gray-300">
      <CommentIcon className="mr-2 w-5" />
      <span className="text-sm sm:text-base">1 {pluralize("comment", 1)}</span>
    </a>
  </Link>
);

export const BattleCard = (battle: IndexPageBattle) => {
  const { user } = useUser();

  return (
    <>
      {user && user.id === battle.User.id && (
        <p className="mb-4 text-right">
          This is battle created by you. You can{" "}
          <Link href="/battle/edit/[id]" as={`/battle/edit/${battle.id}`}>
            <a className="py-1 px-3 text-white">Edit it</a>
          </Link>
        </p>
      )}

      <Link href="/battle/[id]" as={`/battle/${battle.id}`}>
        <div className="bl-container flex space-x-6 sm:space-x-12 mb-8 p-6 sm:p-8 bg-shark rounded-xl cursor-pointer z-0">
          <div className="flex flex-col flex-grow">
            <BattleCardTitle sideA={battle.sideA} sideB={battle.sideB} />

            <div className="flex flex-col sm:flex-row sm:items-center">
              <BattleCardUserInfoLink {...battle} />
              <BattleCardCommentsLink id={battle.id} />
            </div>
          </div>

          <div className="z-10">
            <UpvoteButton onClick={() => console.log("hello")} />
          </div>
        </div>
      </Link>
    </>
  );
};

const BattleList = ({ data }: { data: IndexPageBattle[] }) => {
  return (
    <section>
      {data.map((battle) => {
        console.log({ battle: battle.User });
        return <BattleCard {...battle} key={battle.id} />;
      })}
    </section>
  );
};

export default BattleList;

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

// {areMorePosts && (
//   <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
//     {loadingMorePosts ? "Loading..." : "Show More"}
//   </button>
// )}
