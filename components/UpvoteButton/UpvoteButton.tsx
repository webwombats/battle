import { UpIcon } from "@components/Icon";

type Props = {
  onClick: () => void;
};

const UpvoteButton = ({ onClick }: Props) => (
  <div
    className={`upvote items-center py-1 sm:py-2 px-3 sm:px-4 pb-2 h-16 
                sm:h-20 bg-charade text-gray-400 text-sm sm:text-xl font-bold 
                rounded-xl border-2 border-gray-800`}
    onClick={onClick}
  >
    <UpIcon className="text-gray-500 w-4 sm:w-5" />
    <span>14</span>
  </div>
);

export default UpvoteButton;
