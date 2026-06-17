import type { Order } from "../types/order";
import type { StatusFilter } from "../components/OrderFilters";

export function filterOrders(
  orders: Order[],
  searchQuery: string,
  statusFilter: StatusFilter
): Order[] {
  const query = searchQuery.trim().toLowerCase();

  return orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    const matchesQuery =
      query === "" ||
      order.customerName.toLowerCase().includes(query) ||
      order.orderNumber.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });
}
