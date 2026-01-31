import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  side: "left" | "right";
  onClick: () => void;
};

const MovieRowControls = ({ side, onClick }: Props) => {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`
        absolute object-cover top-1/2 -translate-y-1/2 z-20
        ${side === "left" ? "left-4" : "right-4"}
        h-13 w-13  text-white bg-auto bg-black/40 rounded-lg py-15.5
        flex items-center justify-center
        opacity-70 hover:opacity-100 transition
      `}
    >
      <Icon className="h-12 w-12" />
    </button>
  );
};

export default MovieRowControls;
