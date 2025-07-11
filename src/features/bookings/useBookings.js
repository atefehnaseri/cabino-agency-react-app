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

  //Sort
  const sortByParam = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByParam.split("-");
  const sortBy = { field, direction };

  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy], //like dependancy array if the filter object changed the fetch will be run again
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, error, bookings };
}
