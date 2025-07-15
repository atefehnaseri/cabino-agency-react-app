import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. load the authenticated user
  const { isLoading: isUserLoading, isAuthenticated } = useUser();

  //2. if the user is NOT authenticated, redirect to the login page
  useEffect(
    function () {
      if (!isAuthenticated && !isUserLoading) navigate("/login");
    },
    [isAuthenticated, isUserLoading, navigate]
  );

  //3. while loading, show a spinner or placeholder
  if (isUserLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. if the user is authenticated, render the children (AppLayout)
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
