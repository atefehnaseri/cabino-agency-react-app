import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" }; //method can be any methods of supabase like "gt", "gte" (grather than equal an etc.)

  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter], //like dependancy array if the filter object changed the fetch will be run again
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, error, bookings };
}
