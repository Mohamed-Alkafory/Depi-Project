// src/pages/admin/AdminOverview.jsx
import { useAllOrders } from "@/features/orders/hooks/useOrders";
import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function AdminOverview() {
  const { data: orders } = useAllOrders();
  const { data: plans } = usePlansAdmin();

  const totalOrders = orders?.length || 0;
  const totalRevenue =
    orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
  const pendingOrders =
    orders?.filter((o) => o.status === "pending").length || 0;
  const completedOrders =
    orders?.filter((o) => o.status === "completed").length || 0;
  const totalPlans = plans?.length || 0;

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Revenue",
      value: `EGP ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: CheckCircle,
      color: "bg-teal-100 text-teal-600",
    },
    {
      label: "Total Plans",
      value: totalPlans,
      icon: Package,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recent Orders
          </h2>
          <div className="space-y-3">
            {orders?.slice(0, 5).map((order, i) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    Order #{orders.length - i}
                  </p>
                  <p className="text-sm text-gray-500">{order.full_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-teal-600">
                    EGP {order.total_amount?.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs ${
                      order.status === "pending"
                        ? "text-yellow-600"
                        : order.status === "completed"
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
