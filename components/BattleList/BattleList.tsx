import Link from "next/link";

import { CommentIcon, UpIcon } from "@components/Icon";

import { Battle } from "@prisma/client";

export const BattleCard = ({ id, sideA, sideB }: Battle) => (
  <Link href="/battle/[id]" as={`/battle/${id}`}>
    <div className="bl-container flex mb-8 p-6 sm:p-8 bg-shark rounded-xl cursor-pointer">
      <div className="flex flex-col flex-grow mr-4 sm:mr-8">
        <div className="text-base sm:text-xl md:text-2xl text-gray-400 font-bold mb-4">
          <span className="text-havelock-blue">{sideA}</span> or{" "}
          <span className="text-fruit-salad">{sideB}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <Link href="/user/[id]" as={`/user/yuri`}>
            <a className="flex items-center mb-2 sm:mb-0 sm:mr-10 text-gray-500 hover:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-yellow-500 mr-2"></span>
              <span className="text-sm sm:text-base">John Doe</span>
            </a>
          </Link>

          <Link href="/battle/[id]" as={`/battle/${id}`}>
            <a className="flex items-center text-gray-500 hover:text-gray-300">
              <CommentIcon className="mr-2 w-5" />
              <span className="text-sm sm:text-base">9 comment(s) </span>
            </a>
          </Link>
        </div>
      </div>

      <a className="bl-votes flex flex-col flex-shrink-0 items-center py-1 sm:py-2 px-3 sm:px-4 pb-2 h-16 sm:h-20 bg-charade text-gray-400 text-sm sm:text-xl font-bold rounded-xl border-2 border-gray-800">
        <UpIcon className="text-gray-500 w-4 sm:w-5" />
        <span>14</span>
      </a>
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
