import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  side: "left" | "right";
  onClick: () => void;
  show: boolean;
};

const MovieRowControls = ({ side, onClick, show }: Props) => {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 -translate-y-1/2 z-20
        ${side === "left" ? "left-4" : "right-4"}
        h-13 w-13 text-white bg-black/40 rounded-lg
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${show ? "md:flex" : "md:hidden"}
      `}
    >
      <Icon className="h-12 w-12" />
    </button>
  );
};

export default MovieRowControls;
