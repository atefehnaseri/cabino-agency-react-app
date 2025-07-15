import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../../services/apiAuth";
import { useEffect } from "react";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending: isLogingIn,
    mutate: login,
    data: user,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
      console.log("Eror", err.message);
    },
  });

  // //new version of ReactQuery is no longer support setQueryData directly in useMutation's event handlers
  // useEffect(() => {
  //   queryClient.setQueryData(["user"], user);
  // }, [user, queryClient]);

  return { isLogingIn, login };
}
