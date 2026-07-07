// src/pages/admin/AdminOrders.jsx
import { useState } from "react";
import {
  useAllOrders,
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
  useDeleteOrder,
} from "@/features/orders/hooks/useOrders";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  Search,
  Filter,
  Eye,
  Trash2,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: Clock,
  },
  paid: {
    label: "Paid",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: CheckCircle,
  },
  completed: {
    label: "Completed",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: XCircle,
  },
};

const STATUS_OPTIONS = ["pending", "paid", "completed", "cancelled"];

export default function AdminOrders() {
  const { data: orders, isLoading, error } = useAllOrders();
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { mutate: updatePaymentStatus } = useUpdatePaymentStatus();
  const { mutate: deleteOrder } = useDeleteOrder();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">Error loading orders</p>
          <p className="text-sm text-red-400 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      order.phone?.includes(search);
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const unpaidCount =
    orders?.filter(
      (o) => o.payment_status !== "paid" && o.status !== "cancelled",
    ).length || 0;

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      deleteOrder(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
            <Package size={20} className="text-teal-600" />
          </div>
          Orders Management
        </h1>

        {/* Unpaid Alert */}
        {unpaidCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <AlertTriangle size={20} className="text-yellow-600" />
            <p className="text-yellow-700 font-medium">
              {unpaidCount} order(s) waiting for payment confirmation
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by order ID, name, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_CONFIG[s].label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Order
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Customer
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Items
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Total
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Order Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Payment
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders?.map((order, index) => {
                  const status =
                    STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                  const StatusIcon = status.icon;
                  const isExpanded = expandedOrder === order.id;
                  const orderNumber = filteredOrders.length - index;
                  const isUnpaid = order.payment_status !== "paid";

                  return (
                    <>
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">
                            Order #{orderNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.payment_method?.toUpperCase()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">
                            {order.full_name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.phone || "N/A"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {order.order_items?.length || 0} plan(s)
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-teal-600">
                            EGP {order.total_amount?.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus({
                                id: order.id,
                                status: e.target.value,
                              })
                            }
                            className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${status.bg} ${status.color} ${status.border} cursor-pointer`}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {STATUS_CONFIG[s].label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.payment_status || "unpaid"}
                            onChange={(e) =>
                              updatePaymentStatus({
                                id: order.id,
                                payment_status: e.target.value,
                              })
                            }
                            className={`text-sm font-medium px-3 py-1.5 rounded-lg border cursor-pointer ${
                              isUnpaid
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-green-50 text-green-700 border-green-200"
                            }`}
                          >
                            <option value="unpaid">❌ Unpaid</option>
                            <option value="paid">✅ Paid</option>
                            <option value="refunded">↩️ Refunded</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-EG",
                            )}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setExpandedOrder(isExpanded ? null : order.id)
                              }
                              className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
                            >
                              <Eye size={16} />
                              {isExpanded ? "Hide" : "View"}
                            </button>
                            <button
                              onClick={() => handleDelete(order.id)}
                              className={`flex items-center gap-1 text-sm font-medium ${
                                deleteConfirm === order.id
                                  ? "text-red-600 bg-red-50 px-2 py-1 rounded-lg"
                                  : "text-gray-400 hover:text-red-500"
                              }`}
                            >
                              <Trash2 size={16} />
                              {deleteConfirm === order.id ? "Confirm?" : ""}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="px-6 py-4 bg-gray-50">
                            <div className="space-y-4">
                              <h3 className="font-semibold text-gray-900">
                                Order Items
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {order.order_items?.map((item) => (
                                  <div
                                    key={item.id}
                                    className="bg-white rounded-xl p-4 border border-gray-200 flex gap-3"
                                  >
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                      {item.plans?.cover_image ? (
                                        <img
                                          src={item.plans.cover_image}
                                          alt={item.plan_title}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                          <Package
                                            size={20}
                                            className="text-gray-400"
                                          />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 text-sm">
                                        {item.plan_title}
                                      </h4>
                                      <p className="text-sm text-teal-600 font-semibold">
                                        EGP {item.plan_price?.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Customer Details */}
                              <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">
                                  Customer Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-500">Name</p>
                                    <p className="font-medium">
                                      {order.full_name || "N/A"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Phone</p>
                                    <p className="font-medium">
                                      {order.phone || "N/A"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Address</p>
                                    <p className="font-medium">
                                      {order.address || "N/A"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Notes</p>
                                    <p className="font-medium">
                                      {order.notes || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Payment Info */}
                              <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                  <DollarSign size={16} />
                                  Payment Information
                                </h3>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-500">Method</p>
                                    <p className="font-medium uppercase">
                                      {order.payment_method}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Status</p>
                                    <p
                                      className={`font-medium ${
                                        order.payment_status === "paid"
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }`}
                                    >
                                      {order.payment_status || "unpaid"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Total</p>
                                    <p className="font-bold text-teal-600">
                                      EGP {order.total_amount?.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
