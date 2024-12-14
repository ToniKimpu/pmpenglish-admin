import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addPremiumUser,
  allStudents,
  premiumStudents,
  removePremiumUser,
} from "../../../services/user";

export const useStudents = () => {
  return useQuery(["students"], () => allStudents());
};

export const usePremiumStudents = () => {
  return useQuery(["premium-students"], () => premiumStudents());
};
// Add player
export const useAddPremiumStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(addPremiumUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("premium-students");
      queryClient.invalidateQueries("students");
    },
  });
};

export const useRemovePremiumStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(removePremiumUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("premium-students");
      queryClient.invalidateQueries("students");
    },
  });
};
