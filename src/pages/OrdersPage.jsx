// src/pages/OrdersPage.jsx
import { useNavigate } from "react-router-dom";
import { useMyOrders, useDeleteOrder } from "@/features/orders/hooks/useOrders";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  ShoppingBag,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";

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

export default function OrdersPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading, refetch } = useMyOrders(); // ✅ أضفنا refetch
  const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder();
  const [deleteModal, setDeleteModal] = useState(null);

  // ✅ Refetch لما الصفحة تفتح
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteClick = (e, order) => {
    e.stopPropagation();
    const orderIndex = orders.findIndex((o) => o.id === order.id);
    const orderNumber = orders.length - orderIndex;
    setDeleteModal({ id: order.id, orderNumber });
  };

  const confirmDelete = () => {
    if (deleteModal) {
      deleteOrder(deleteModal.id);
      setDeleteModal(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Orders Yet
          </h2>
          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => navigate("/plans")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
            <Package size={20} className="text-teal-600" />
          </div>
          My Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order, index) => {
            const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            const StatusIcon = status.icon;
            const orderNumber = orders.length - index;

            return (
              <div
                key={order.id}
                onClick={() => navigate(`/orders/${order.id}`)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow relative group"
              >
                <button
                  onClick={(e) => handleDeleteClick(e, order)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                  // ❌ شيل: md:opacity-0 md:group-hover:opacity-100
                  title="Delete order"
                >
                  <Trash2 size={16} />
                </button>

                <div className="flex items-center justify-between mb-4 pr-8">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Order #{orderNumber}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString("en-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.color} border ${status.border}`}
                  >
                    <StatusIcon size={14} />
                    {status.label}
                  </div>
                </div>

                {/* Order Items with Images */}
                <div className="space-y-3">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.plans?.cover_image ? (
                          <img
                            src={item.plans.cover_image}
                            alt={item.plan_title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={20} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.plan_title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          EGP {item.plan_price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-teal-600">
                      EGP {order.total_amount?.toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Order?
                </h3>
                <p className="text-sm text-gray-500">
                  Order #{deleteModal.orderNumber} will be permanently deleted.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 bg-gray-50 rounded-lg p-3">
              This action cannot be undone. Are you sure you want to continue?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
