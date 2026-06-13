"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Send,
  Plus,
  Search,
  ChevronDown,
  Zap,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    amount: 5200,
    dueDate: "2026-06-15",
    status: "overdue",
    daysOverdue: 7,
    lastReminder: "2026-06-10",
    aiAction: "Send firm reminder tomorrow",
  },
  {
    id: "INV-002",
    client: "TechStart Inc",
    amount: 3800,
    dueDate: "2026-06-18",
    status: "due_soon",
    daysOverdue: 0,
    lastReminder: "-",
    aiAction: "Schedule polite reminder in 2 days",
  },
  {
    id: "INV-003",
    client: "Design Studio Co",
    amount: 2100,
    dueDate: "2026-06-05",
    status: "paid",
    daysOverdue: 0,
    lastReminder: "2026-06-03",
    aiAction: "Payment received — no action",
  },
  {
    id: "INV-004",
    client: "Global Marketing",
    amount: 7500,
    dueDate: "2026-06-20",
    status: "pending",
    daysOverdue: 0,
    lastReminder: "-",
    aiAction: "Monitor — client pays early historically",
  },
  {
    id: "INV-005",
    client: "StartupXYZ",
    amount: 1200,
    dueDate: "2026-06-01",
    status: "overdue",
    daysOverdue: 11,
    lastReminder: "2026-06-08",
    aiAction: "Escalate to phone call",
  },
];

const aiInsights = [
  {
    type: "prediction",
    message:
      "TechStart Inc typically pays 3 days late. Consider early reminder.",
    confidence: 89,
  },
  {
    type: "alert",
    message:
      "Acme Corporation's payment pattern changed — historically pays on time.",
    confidence: 94,
  },
  {
    type: "suggestion",
    message:
      "Send SMS reminder to StartupXYZ — email open rate is only 12%.",
    confidence: 76,
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [filterStatus, setFilterStatus] = useState("all");

  const totalOutstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalOverdue = invoices
    .filter((i) => i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  const filteredInvoices =
    filterStatus === "all"
      ? invoices
      : invoices.filter((i) => i.status === filterStatus);

  const statusColors: Record<string, string> = {
    paid: "bg-emerald-500",
    overdue: "bg-red-500",
    due_soon: "bg-amber-500",
    pending: "bg-blue-500",
  };

  const statusLabels: Record<string, string> = {
    paid: "Paid",
    overdue: "Overdue",
    due_soon: "Due Soon",
    pending: "Pending",
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 hidden lg:block">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              PayPrompt
            </span>
          </Link>
        </div>

        <nav className="px-4 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "invoices", label: "Invoices", icon: FileText },
            { id: "reminders", label: "AI Reminders", icon: Bell },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white">
            <p className="text-sm font-semibold mb-1">Pro Plan</p>
            <p className="text-xs opacity-80 mb-3">19 invoices this month</p>
            <button className="w-full py-2 bg-white/20 rounded-lg text-xs font-medium hover:bg-white/30 transition-colors">
              Upgrade to Agency
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <p className="text-sm text-gray-500">
              Selamat datang, {session.user?.name}! Anda memiliki 2 invoice
              yang terlambat.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold">
                {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {session.user?.name}
                </p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Outstanding",
                value: `$${totalOutstanding.toLocaleString()}`,
                change: "+12%",
                trend: "up",
                icon: DollarSign,
              },
              {
                label: "Overdue Amount",
                value: `$${totalOverdue.toLocaleString()}`,
                change: "-8%",
                trend: "down",
                icon: AlertCircle,
              },
              {
                label: "Avg DSO",
                value: "24 days",
                change: "-40%",
                trend: "down",
                icon: Clock,
              },
              {
                label: "Active Clients",
                value: "12",
                change: "+2",
                trend: "up",
                icon: Users,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <stat.icon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <div
                  className={`flex items-center gap-1 mt-1 text-sm text-emerald-600`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change} vs last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-emerald-600" />
              <h2 className="font-semibold text-gray-900">AI Insights</h2>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-lg p-3"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      insight.type === "prediction"
                        ? "bg-emerald-500"
                        : insight.type === "alert"
                        ? "bg-amber-500"
                        : "bg-teal-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{insight.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      AI confidence: {insight.confidence}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-semibold text-gray-900">Invoices</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="due_soon">Due Soon</option>
                    <option value="overdue">Overdue</option>
                    <option value="paid">Paid</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  New Invoice
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Invoice
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Client
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Due Date
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      AI Action
                    </th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">
                        {invoice.id}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">
                        {invoice.client}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                        ${invoice.amount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {invoice.dueDate}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            invoice.status === "paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : invoice.status === "overdue"
                              ? "bg-red-50 text-red-700"
                              : invoice.status === "due_soon"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              statusColors[invoice.status]
                            }`}
                          />
                          {statusLabels[invoice.status]}
                          {invoice.status === "overdue" && (
                            <span className="text-red-500">
                              ({invoice.daysOverdue}d)
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{invoice.aiAction}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                            title="Send reminder now"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                            title="Mark as paid"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: "Send Bulk Reminders",
                desc: "AI-optimized for 5 overdue invoices",
                icon: Send,
              },
              {
                label: "Generate Report",
                desc: "Monthly DSO & payment analysis",
                icon: TrendingUp,
              },
              {
                label: "Configure AI",
                desc: "Adjust tone & reminder schedule",
                icon: Settings,
              },
            ].map((action, i) => (
              <button
                key={i}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all text-left"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <action.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-500">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

