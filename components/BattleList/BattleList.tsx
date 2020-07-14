import Link from "next/link";

import { CommentIcon } from "@components/Icon";
import UpvoteButton from "@components/UpvoteButton";

import { Battle } from "@prisma/client";

const BattleCardTitle = ({ sideA, sideB }: Partial<Battle>) => (
  <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-bold mb-4">
    <span className="text-havelock-blue">{sideA}</span> or{" "}
    <span className="text-fruit-salad">{sideB}</span>
  </h2>
);

const BattleCardUserInfoLink = () => (
  <Link href="/user/[id]" as={`/user/yuri`}>
    <a className="flex items-center mb-2 sm:mb-0 sm:mr-10 text-gray-500 hover:text-gray-300">
      <span className="w-5 h-5 rounded-full bg-yellow-500 mr-2"></span>
      <span className="text-sm sm:text-base">John Doe</span>
    </a>
  </Link>
);

const BattleCardCommentsLink = ({ id }: Partial<Battle>) => (
  <Link href="/battle/[id]" as={`/battle/${id}`}>
    <a className="flex items-center text-gray-500 hover:text-gray-300">
      <CommentIcon className="mr-2 w-5" />
      <span className="text-sm sm:text-base">9 comment(s) </span>
    </a>
  </Link>
);

export const BattleCard = ({ id, sideA, sideB }: Battle) => (
  <Link href="/battle/[id]" as={`/battle/${id}`}>
    <div className="bl-container flex space-x-6 sm:space-x-12 mb-8 p-6 sm:p-8 bg-shark rounded-xl cursor-pointer z-0">
      <div className="flex flex-col flex-grow">
        <BattleCardTitle sideA={sideA} sideB={sideB} />

        <div className="flex flex-col sm:flex-row sm:items-center">
          <BattleCardUserInfoLink />
          <BattleCardCommentsLink id={id} />
        </div>
      </div>

      <div className="z-10">
        <UpvoteButton onClick={() => console.log("hello")} />
      </div>
    </div>
  </Link>
);

const BattleList = ({ data }: { data: Battle[] }) => (
  <section>
    {data.map((battle) => (
      <BattleCard {...battle} key={battle.id} />
    ))}
  </section>
);

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
