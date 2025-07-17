import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      toast.success("User updated successfully");
      // Update the user in the query cache
      // This ensures that the user data is up-to-date across the application without any flash for refetching and immidiate ui update
      const user = data.user;

      queryClient.setQueryData(["user"], user);

      // queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update user");
    },
  });

  return { updateUser, isUpdating: isPending };
}
