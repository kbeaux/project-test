import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCompareButtonProps {
  onClick: () => void;
  isComparing: boolean;
  disabled?: boolean;
  className?: string;
}

export function PropertyCompareButton({
  onClick,
  isComparing,
  disabled,
  className,
}: PropertyCompareButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        isComparing
          ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <Scale className="h-4 w-4 mr-2" />
      {isComparing ? "Remove from Compare" : "Add to Compare"}
    </button>
  );
}
