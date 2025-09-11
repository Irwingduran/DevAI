"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CreditCard, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Filter,
  Download,
  Search,
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Users,
  FileText,
  Wallet,
  RefreshCw
} from "lucide-react"
import type { Payment } from "@/types/freelancer"

interface PaymentCenterProps {
  payments: Payment[]
  fullView?: boolean
  className?: string
}

export function PaymentCenter({ payments, fullView = false, className = "" }: PaymentCenterProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreatePayment, setShowCreatePayment] = useState(false)

  // Calculate payment statistics
  const stats = {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0),
    completed: payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0),
    overdue: payments.filter(p => p.status === "failed" || new Date(p.dueDate) < new Date()).length,
    thisMonth: payments.filter(p => {
      const paymentDate = new Date(p.paidDate || p.dueDate)
      const now = new Date()
      return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
    }).reduce((sum, p) => sum + p.amount, 0)
  }

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus
    const matchesType = filterType === "all" || payment.type === filterType
    const matchesSearch = searchQuery === "" || 
      payment.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesType && matchesSearch
  })

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "processing":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      case "failed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: Payment["type"]) => {
    switch (type) {
      case "milestone":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case "deposit":
        return <Wallet className="w-4 h-4 text-green-600" />
      case "final":
        return <DollarSign className="w-4 h-4 text-purple-600" />
      case "recurring":
        return <RefreshCw className="w-4 h-4 text-orange-600" />
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const handleCreatePayment = () => {
    setShowCreatePayment(true)
  }

  const handleRequestPayment = (paymentId: string) => {
    console.log("Requesting payment:", paymentId)
    // Implement payment request logic
  }

  const handleDownloadReceipt = (paymentId: string) => {
    console.log("Downloading receipt:", paymentId)
    // Implement receipt download logic
  }

  if (!fullView) {
    // Compact view for overview tab
    return (
      <Card className={`bg-white/70 backdrop-blur-md border border-white/20 shadow-lg ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Recent Payments</CardTitle>
            <Button variant="outline" size="sm" onClick={() => window.location.href = "/freelancer?tab=payments"}>
              View All
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.completed)}</p>
              <p className="text-sm text-gray-600">Received</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(stats.pending)}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.thisMonth)}</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </div>

          {/* Recent Payments List */}
          <div className="space-y-3">
            {payments.slice(0, 3).map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-white/30"
              >
                <div className="flex items-center space-x-3">
                  {getTypeIcon(payment.type)}
                  <div>
                    <p className="font-medium text-gray-900">{payment.description}</p>
                    <p className="text-sm text-gray-600">
                      Due: {formatDate(payment.dueDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(payment.amount, payment.currency)}
                  </p>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Full view for payments tab
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Payment Center</h2>
          <p className="text-gray-600">Manage payments, invoices, and financial transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => console.log("Export payments")}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleCreatePayment}>
            <Plus className="w-4 h-4 mr-2" />
            Request Payment
          </Button>
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Total Received</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(stats.completed)}
                </p>
                <p className="text-sm text-gray-500">All time</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(stats.pending)}
                </p>
                <p className="text-sm text-gray-500">Awaiting payment</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(stats.thisMonth)}
                </p>
                <p className="text-sm text-gray-500">Monthly revenue</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Overdue Items</p>
                <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
                <p className="text-sm text-gray-500">Require attention</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40 bg-white/50 border-white/30">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 bg-white/50 border-white/30">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="recurring">Recurring</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white/50 border-white/30">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || filterStatus !== "all" || filterType !== "all"
                  ? "Try adjusting your filters"
                  : "Your payments will appear here once clients make payments"}
              </p>
              <Button onClick={handleCreatePayment}>
                <Plus className="w-4 h-4 mr-2" />
                Request First Payment
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-white/30 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(payment.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{payment.description}</h4>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusIcon(payment.status)}
                          <span className="ml-1">{payment.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Due: {formatDate(payment.dueDate)}
                        </span>
                        {payment.paidDate && (
                          <span className="flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Paid: {formatDate(payment.paidDate)}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {payment.method.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">{payment.type}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {payment.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRequestPayment(payment.id)}
                        >
                          Follow Up
                        </Button>
                      )}
                      {payment.status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadReceipt(payment.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Request Modal (placeholder) */}
      {showCreatePayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Request Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Payment request functionality would be implemented here.</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreatePayment(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreatePayment(false)}>
                  Create Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}