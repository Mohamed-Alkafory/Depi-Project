// src/pages/OrderDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useOrder, useMyOrders } from "@/features/orders/hooks/useOrders";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Phone,
  User,
  MapPin,
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

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrder(id);
  const { data: allOrders } = useMyOrders();

  // ✅ نلاقي رقم الطلب
  const orderIndex = allOrders?.findIndex((o) => o.id === id);
  const orderNumber = allOrders ? allOrders.length - orderIndex : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                {/* ✅ الترقيم الصح */}
                <h1 className="text-xl font-bold text-gray-900">
                  Order #{orderNumber}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on{" "}
                  {new Date(order.created_at).toLocaleDateString("en-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${status.bg} ${status.color} border ${status.border}`}
              >
                <StatusIcon size={16} />
                {status.label}
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  {/* ✅ صورة الـ Plan من الـ API */}
                  <div className="w-20 h-20 rounded-lg bg-white flex-shrink-0 overflow-hidden">
                    {item.plans?.cover_image ? (
                      <img
                        src={item.plans.cover_image}
                        alt={item.plan_title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.plan_title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    {item.plans?.area && (
                      <p className="text-xs text-gray-400">
                        {item.plans.area} m²
                      </p>
                    )}
                  </div>
                  <p className="font-bold text-teal-600">
                    EGP {item.plan_price?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-gray-400" />
                <span className="text-gray-600">{order.full_name}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-600">{order.phone}</span>
              </div>
              {order.address && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-600">{order.address}</span>
                </div>
              )}
              {order.notes && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                  <span className="font-medium">Notes:</span> {order.notes}
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium text-gray-900 uppercase">
                  {order.payment_method}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-teal-600">
                  EGP {order.total_amount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
