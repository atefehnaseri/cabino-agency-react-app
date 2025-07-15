import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      toast.success(`Booking successfully deleted.`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () =>
      toast.error("There was an error while deleting the booking."),
  });

  return { isDeleting, deleteBooking };
}
