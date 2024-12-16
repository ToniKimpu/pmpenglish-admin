import { patternList } from "@/services/spokenPattern";
import { useQuery } from "react-query";

export const useSpokenPatterns = () => {
  const {
    data: patterns,
    error,
    isLoading,
  } = useQuery(["pattern-list"], patternList, {
    staleTime: 1000 * 60 * 5,
  });

  return {
    patterns,
    error,
    isLoading,
  };
};
