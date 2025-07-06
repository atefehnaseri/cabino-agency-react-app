import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(name) {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success(`Cabin ${name} deleted successfully!`);
      //refetch data and invalidating cache
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(`Error on deleting cabin: ${error.message}`);
    },
  });
  return { isDeleting, deleteCabin };
}
