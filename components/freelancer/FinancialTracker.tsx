"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Download,
  Upload,
  Plus,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Send,
  Printer,
  CreditCard,
  PieChart,
  BarChart3,
  Target,
  Wallet,
  Receipt,
  Building,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ExternalLink
} from "lucide-react"
import type { Invoice, Payment, Project, Client, InvoiceItem } from "@/types/freelancer"

interface FinancialTrackerProps {
  invoices: Invoice[]
  payments: Payment[]
  projects: Project[]
  clients: Client[]
  onInvoiceUpdate: (invoiceId: string, updates: Partial<Invoice>) => void
  onCreateInvoice: () => void
  onSendInvoice: (invoiceId: string) => void
  className?: string
}

export function FinancialTracker({ 
  invoices, 
  payments,
  projects,
  clients,
  onInvoiceUpdate, 
  onCreateInvoice,
  onSendInvoice,
  className = "" 
}: FinancialTrackerProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "invoices" | "payments" | "reports">("overview")
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "quarter" | "year">("month")
  const [selectedStatus, setSelectedStatus] = useState<"all" | "draft" | "sent" | "paid" | "overdue">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const financialMetrics = useMemo(() => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Current month metrics
    const currentMonthInvoices = invoices.filter(inv => 
      new Date(inv.issueDate) >= startOfMonth
    )
    const currentMonthPayments = payments.filter(pay => 
      pay.paidDate && new Date(pay.paidDate) >= startOfMonth
    )

    // Last month metrics
    const lastMonthInvoices = invoices.filter(inv => {
      const issueDate = new Date(inv.issueDate)
      return issueDate >= startOfLastMonth && issueDate <= endOfLastMonth
    })
    const lastMonthPayments = payments.filter(pay => {
      if (!pay.paidDate) return false
      const paidDate = new Date(pay.paidDate)
      return paidDate >= startOfLastMonth && paidDate <= endOfLastMonth
    })

    const totalRevenue = currentMonthPayments.reduce((sum, pay) => sum + pay.amount, 0)
    const lastMonthRevenue = lastMonthPayments.reduce((sum, pay) => sum + pay.amount, 0)
    const revenueGrowth = lastMonthRevenue > 0 ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0

    const totalInvoiced = currentMonthInvoices.reduce((sum, inv) => sum + inv.total, 0)
    const lastMonthInvoiced = lastMonthInvoices.reduce((sum, inv) => sum + inv.total, 0)
    const invoicedGrowth = lastMonthInvoiced > 0 ? ((totalInvoiced - lastMonthInvoiced) / lastMonthInvoiced) * 100 : 0

    const pendingAmount = invoices
      .filter(inv => inv.status === "sent" || inv.status === "viewed")
      .reduce((sum, inv) => sum + inv.total, 0)

    const overdueAmount = invoices
      .filter(inv => (inv.status === "sent" || inv.status === "viewed") && new Date(inv.dueDate) < now)
      .reduce((sum, inv) => sum + inv.total, 0)

    const overdueCount = invoices.filter(inv => 
      (inv.status === "sent" || inv.status === "viewed") && new Date(inv.dueDate) < now
    ).length

    const avgInvoiceValue = invoices.length > 0 ? 
      invoices.reduce((sum, inv) => sum + inv.total, 0) / invoices.length : 0

    const collectionRate = totalInvoiced > 0 ? (totalRevenue / totalInvoiced) * 100 : 0

    return {
      totalRevenue,
      revenueGrowth,
      totalInvoiced,
      invoicedGrowth,
      pendingAmount,
      overdueAmount,
      overdueCount,
      avgInvoiceValue,
      collectionRate
    }
  }, [invoices, payments])

  const filteredInvoices = useMemo(() => {
    return invoices
      .filter(invoice => {
        const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus
        const client = clients.find(c => c.id === invoice.clientId)
        const matchesSearch = 
          invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (client?.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesStatus && matchesSearch
      })
      .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
  }, [invoices, clients, selectedStatus, searchTerm])

  const getStatusColor = (status: Invoice["status"]) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800 border-gray-200",
      sent: "bg-blue-100 text-blue-800 border-blue-200",
      viewed: "bg-yellow-100 text-yellow-800 border-yellow-200",
      paid: "bg-green-100 text-green-800 border-green-200",
      overdue: "bg-red-100 text-red-800 border-red-200",
      cancelled: "bg-gray-100 text-gray-800 border-gray-200"
    }
    return colors[status]
  }

  const getStatusIcon = (status: Invoice["status"]) => {
    switch (status) {
      case "draft": return <Edit className="w-4 h-4" />
      case "sent": return <Send className="w-4 h-4" />
      case "viewed": return <Eye className="w-4 h-4" />
      case "paid": return <CheckCircle className="w-4 h-4" />
      case "overdue": return <AlertCircle className="w-4 h-4" />
      case "cancelled": return <MoreVertical className="w-4 h-4" />
    }
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "reports", label: "Reports", icon: PieChart }
  ]

  const statusOptions = [
    { value: "all" as const, label: "All", count: invoices.length },
    { value: "draft" as const, label: "Draft", count: invoices.filter(i => i.status === "draft").length },
    { value: "sent" as const, label: "Sent", count: invoices.filter(i => i.status === "sent").length },
    { value: "paid" as const, label: "Paid", count: invoices.filter(i => i.status === "paid").length },
    { value: "overdue" as const, label: "Overdue", count: invoices.filter(i => i.status === "overdue").length }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Management</h2>
          <p className="text-gray-600">Track revenue, manage invoices, and monitor financial performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-gray-600">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={onCreateInvoice} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Revenue This Month</p>
                    <p className="text-2xl font-bold text-green-900">
                      ${financialMetrics.totalRevenue.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {financialMetrics.revenueGrowth >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${financialMetrics.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {Math.abs(financialMetrics.revenueGrowth).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Invoiced This Month</p>
                    <p className="text-2xl font-bold text-blue-900">
                      ${financialMetrics.totalInvoiced.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      {financialMetrics.invoicedGrowth >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-blue-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${financialMetrics.invoicedGrowth >= 0 ? "text-blue-600" : "text-red-600"}`}>
                        {Math.abs(financialMetrics.invoicedGrowth).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-700">Pending</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      ${financialMetrics.pendingAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">
                      {invoices.filter(i => i.status === "sent" || i.status === "viewed").length} invoices
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-700">Overdue</p>
                    <p className="text-2xl font-bold text-red-900">
                      ${financialMetrics.overdueAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      {financialMetrics.overdueCount} invoices
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/70 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg">Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{financialMetrics.collectionRate.toFixed(1)}%</span>
                    <Target className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min(financialMetrics.collectionRate, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">Revenue vs Invoiced</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg">Avg Invoice Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${financialMetrics.avgInvoiceValue.toLocaleString()}</span>
                    <Receipt className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-sm text-gray-600">Across {invoices.length} invoices</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{projects.filter(p => p.status === "active").length}</span>
                    <Building className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600">Generating revenue</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === "invoices" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <div className="flex items-center space-x-1">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedStatus(option.value)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedStatus === option.value
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option.label} ({option.count})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoices List */}
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => {
              const client = clients.find(c => c.id === invoice.clientId)
              const project = projects.find(p => p.id === invoice.projectId)
              const isOverdue = invoice.status === "sent" && new Date(invoice.dueDate) < new Date()
              
              return (
                <Card key={invoice.id} className="bg-white/70 backdrop-blur-md border border-white/20 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">#{invoice.number}</h3>
                            <Badge className={getStatusColor(isOverdue && invoice.status === "sent" ? "overdue" : invoice.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(isOverdue && invoice.status === "sent" ? "overdue" : invoice.status)}
                                <span>{isOverdue && invoice.status === "sent" ? "overdue" : invoice.status}</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{client?.name}</span>
                            {project && <span>• {project.name}</span>}
                            <span>• Issued {new Date(invoice.issueDate).toLocaleDateString()}</span>
                            <span>• Due {new Date(invoice.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${invoice.total.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{invoice.items.length} items</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {invoice.status === "draft" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onSendInvoice(invoice.id)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Send className="w-4 h-4 mr-1" />
                              Send
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredInvoices.length === 0 && (
            <Card className="bg-white/70 backdrop-blur-md border border-white/20">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedStatus !== "all" 
                    ? "Try adjusting your filters or search terms" 
                    : "Create your first invoice to start billing clients"}
                </p>
                <Button onClick={onCreateInvoice} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Management</h3>
              <p className="text-gray-600">Payment tracking and management features coming soon</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          <Card className="bg-white/70 backdrop-blur-md border border-white/20">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h3>
              <p className="text-gray-600">Advanced reporting and analytics features coming soon</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}