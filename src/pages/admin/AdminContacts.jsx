// src/pages/admin/AdminContacts.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  MessageSquare,
  Mail,
  User,
  Clock,
  CheckCircle,
  Trash2,
  Search,
  Phone,
} from "lucide-react";
import { toast } from "sonner";

async function fetchContacts() {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

async function markContactAsRead(id) {
  const { error } = await supabase
    .from("contacts")
    .update({ is_read: true })
    .eq("id", id);

  if (error) throw error;
  return id;
}

async function deleteContact(id) {
  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) throw error;
  return id;
}

export default function AdminContacts() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedMsgId, setSelectedMsgId] = useState(null);

  // Fetch messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  // Mark as read
  const markAsReadMutation = useMutation({
    mutationFn: markContactAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (err) => {
      toast.error("Failed to mark as read: " + err.message);
    },
  });

  // Delete — ✅ معدّل
  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      // ✅ امسح الـ selected message الأول
      setSelectedMsgId(null);
      // ✅ بعدين اعمل invalidate
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Message deleted");
    },
    onError: (err) => {
      toast.error("Failed to delete: " + err.message);
    },
  });

  const handleSelectMessage = (msg) => {
    setSelectedMsgId(msg.id);
    if (!msg.is_read) {
      markAsReadMutation.mutate(msg.id);
    }
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const selectedMsg = messages.find((m) => m.id === selectedMsgId);

  const filteredMessages = messages.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase()),
  );

  const unreadCount = messages.filter((m) => !m.is_read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <MessageSquare size={20} className="text-teal-600" />
            </div>
            Messages
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-3 max-h-[70vh] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <MessageSquare
                  size={40}
                  className="mx-auto text-gray-300 mb-3"
                />
                <p className="text-gray-500">No messages</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`bg-white rounded-2xl shadow-sm border p-4 cursor-pointer hover:shadow-md transition-all ${
                    selectedMsgId === msg.id
                      ? "border-teal-500 ring-1 ring-teal-500"
                      : "border-gray-100"
                  } ${!msg.is_read ? "bg-teal-50/50" : ""}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <User size={14} className="text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {msg.name}
                        </p>
                        <p className="text-xs text-gray-500">{msg.email}</p>
                      </div>
                    </div>
                    {!msg.is_read && (
                      <div className="w-2.5 h-2.5 bg-teal-500 rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-700 font-medium truncate">
                    {msg.subject || "No Subject"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(msg.created_at).toLocaleDateString("en-EG")}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMsg ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {selectedMsg.subject || "No Subject"}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {selectedMsg.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} />
                        {selectedMsg.email}
                      </span>
                      {selectedMsg.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          {selectedMsg.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMsg.id)}
                    disabled={deleteMutation.isPending}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 mb-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMsg.message}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(selectedMsg.created_at).toLocaleString("en-EG")}
                  </span>
                  {selectedMsg.is_read ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle size={14} />
                      Read
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Clock size={14} />
                      Unread
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <MessageSquare
                  size={48}
                  className="mx-auto text-gray-300 mb-4"
                />
                <p className="text-gray-500">
                  Select a message to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
