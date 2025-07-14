import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //query
  const {
    isLoading,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], //like dependancy array if the (filter/sort/page) object changed the fetch will be run again
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //pre-fetching the pagination data for the next page to better UX
  const pageCount = Math.ceil(count / PAGE_SIZE);

  //next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  //previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, error, bookings, count };
}
