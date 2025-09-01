"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  Sparkles,
  DollarSign,
  MessageCircle,
  Repeat,
  Bot,
  Blocks,
  CheckCircle,
  Users,
  TrendingUp,
  Rocket,
  ChevronLeft,
  Mail,
  ExternalLink,
  Upload,
  Mic,
  FileText,
  ImageIcon,
  Clock,
  BarChart3,
  Workflow,
  Eye,
  Compass,
  Calendar,
  Settings,
  Pause,
} from "lucide-react"
import Link from "next/link"

type Step =
  | "hero"
  | "business-profile"
  | "pain-points"
  | "process-mapping"
  | "priorities"
  | "solution-generator"
  | "final-cta"

interface UserData {
  businessType: string
  teamSize: string
  usesDigitalTools: boolean | null
  digitalTools: string
  painPoints: string[]
  processDescription: string
  priorities: string[]
  email: string
}

interface Solution {
  name: string
  description: string
  benefits: string[]
  addOns: { name: string; description: string; enabled: boolean }[]
  type: "AI" | "Blockchain" | "Hybrid"
}

const businessTypes = [
  "Servicios (Consultoría, Legal, etc.)",
  "E-commerce y Retail",
  "Salud y Bienestar",
  "Educación y Capacitación",
  "Creativo y Diseño",
  "Manufactura",
  "Bienes Raíces",
  "Otro",
]

const teamSizes = ["Solo yo", "2-5 personas", "6-20 personas", "21-50 personas", "50+ personas"]

const painPointOptions = [
  {
    id: "manual-tasks",
    title: "Demasiadas tareas manuales",
    description: "Trabajo repetitivo que consume tu tiempo",
    icon: <Repeat className="w-6 h-6" />,
  },
  {
    id: "organization",
    title: "Falta de organización",
    description: "Dificultad para mantener todo en orden",
    icon: <Settings className="w-6 h-6" />,
  },
  {
    id: "client-overload",
    title: "Saturación de mensajes de clientes",
    description: "Demasiados canales, mensajes perdidos",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    id: "finance-tracking",
    title: "Dificultad para rastrear finanzas",
    description: "Gestión de flujo de caja y gastos",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: "not-sure",
    title: "No estoy seguro todavía",
    description: "Todavía explorando posibilidades",
    icon: <Compass className="w-6 h-6" />,
  },
]

const priorityOptions = [
  { id: "save-time", label: "Ahorrar tiempo", icon: <Clock className="w-5 h-5" /> },
  { id: "increase-sales", label: "Aumentar ventas", icon: <TrendingUp className="w-5 h-5" /> },
  { id: "automate-workflows", label: "Automatizar flujos de trabajo", icon: <Workflow className="w-5 h-5" /> },
  { id: "better-insights", label: "Obtener mejores insights", icon: <BarChart3 className="w-5 h-5" /> },
  { id: "exploring", label: "Solo explorando", icon: <Eye className="w-5 h-5" /> },
]



export default function FuturisticBusinessGuide() {
  const [currentStep, setCurrentStep] = useState<Step>("hero")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    businessType: "",
    teamSize: "",
    usesDigitalTools: null,
    digitalTools: "",
    painPoints: [],
    processDescription: "",
    priorities: [],
    email: "",
  })
  const [isRecording, setIsRecording] = useState(false)
  const [assistantVisible, setAssistantVisible] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const steps: Step[] = [
    "hero",
    "business-profile",
    "pain-points",
    "process-mapping",
    "priorities",
    "solution-generator",
    "final-cta",
  ]
  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const navigateToStep = (step: Step) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(step)
      setIsTransitioning(false)
      if (step === "business-profile") {
        setAssistantVisible(true)
      }
    }, 300)
  }

  const goBack = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      navigateToStep(steps[currentIndex - 1])
    }
  }

  const togglePainPoint = (pointId: string) => {
    setUserData((prev) => ({
      ...prev,
      painPoints: prev.painPoints.includes(pointId)
        ? prev.painPoints.filter((p) => p !== pointId)
        : [...prev.painPoints, pointId],
    }))
  }

  const togglePriority = (priorityId: string) => {
    setUserData((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priorityId)
        ? prev.priorities.filter((p) => p !== priorityId)
        : [...prev.priorities, priorityId],
    }))
  }

  const generateSolution = (): Solution => {
    const hasFinanceIssues = userData.painPoints.includes("finance-tracking")
    const hasClientOverload = userData.painPoints.includes("client-overload")
    const wantsAutomation = userData.priorities.includes("automate-workflows")

    if (hasClientOverload || wantsAutomation) {
      return {
        name: "Smart Inbox AI",
        description: "AI-powered communication hub that manages all client interactions across channels",
        benefits: [
          "Automatically categorize and prioritize messages",
          "Generate smart replies and follow-ups",
          "Track client sentiment and satisfaction",
        ],
        addOns: [
          { name: "AI Data Analysis", description: "Advanced analytics on client patterns", enabled: false },
          { name: "Blockchain Verification", description: "Secure message authentication", enabled: false },
          { name: "Auto-billing Module", description: "Automatic invoice generation", enabled: hasFinanceIssues },
        ],
        type: "AI",
      }
    } else if (hasFinanceIssues) {
      return {
        name: "Blockchain Certifier",
        description: "Transparent financial tracking with blockchain-verified transactions",
        benefits: ["Immutable financial records", "Real-time cash flow insights", "Automated compliance reporting"],
        addOns: [
          { name: "AI Forecasting", description: "Predictive financial analytics", enabled: true },
          { name: "Smart Contracts", description: "Automated payment processing", enabled: false },
          { name: "Tax Optimization", description: "AI-powered tax planning", enabled: false },
        ],
        type: "Blockchain",
      }
    } else {
      return {
        name: "Business Intelligence Suite",
        description: "Hybrid AI-Blockchain platform for comprehensive business optimization",
        benefits: [
          "360° business insights with AI analytics",
          "Secure data management with blockchain",
          "Automated workflow optimization",
        ],
        addOns: [
          { name: "Predictive Analytics", description: "AI-powered business forecasting", enabled: true },
          { name: "Supply Chain Tracking", description: "Blockchain transparency", enabled: false },
          { name: "Customer Journey AI", description: "Personalized customer experiences", enabled: false },
        ],
        type: "Hybrid",
      }
    }
  }

  const solution = generateSolution()

  // Floating particles animation
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )

  // Assistant Avatar Component
  const AssistantAvatar = () => (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${assistantVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm animate-pulse">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -top-12 right-0 bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg border border-white/20 whitespace-nowrap">
          <p className="text-sm text-gray-700">¡Estoy aquí para ayudarte! 👋</p>
        </div>
      </div>
    </div>
  )

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <FloatingParticles />
      <AssistantAvatar />

      {/* Encabezado con Progreso */}
      {currentStep !== "hero" && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={goBack} className="text-gray-600 hover:text-gray-800">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>

            <div className="flex-1 max-w-md mx-8">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>
                  Paso {currentStepIndex + 1} de {steps.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="text-sm text-gray-500">
              {currentStep === "business-profile" && "Perfil Empresarial"}
              {currentStep === "pain-points" && "Puntos Críticos"}
              {currentStep === "process-mapping" && "Mapeo de Procesos"}
              {currentStep === "priorities" && "Prioridades"}
              {currentStep === "solution-generator" && "Tu Solución"}
              {currentStep === "final-cta" && "Siguientes Pasos"}
            </div>
          </div>
        </header>
      )}

      {/* Contenido Principal */}
      <main className={`relative z-10 ${currentStep !== "hero" ? "pt-24" : ""} px-6 pb-12`}>
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-300 ${
              isTransitioning
                ? "opacity-0 transform translate-y-8 scale-95"
                : "opacity-100 transform translate-y-0 scale-100"
            }`}
          >
            {/* Sección Hero */}
            {currentStep === "hero" && (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-12 max-w-3xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl">
                          <Rocket className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 rounded-3xl opacity-20 animate-pulse" />
                      </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                      ¿Listo para{" "}
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        modernizar
                      </span>
                      <br />
                      tu negocio?
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                      Descubre cómo la IA y Blockchain pueden potenciar tus operaciones en 3 minutos.
                      <br />
                      <span className="text-blue-600 font-medium">No se requieren conocimientos técnicos.</span>
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Button
                      size="lg"
                      onClick={() => navigateToStep("business-profile")}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    >
                      Comencemos
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>

                    <Card className="max-w-md mx-auto bg-white/60 backdrop-blur-md border border-white/20 shadow-xl">
                      <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-gray-700 font-medium">Te guiaré a través de unos pasos</p>
                        </div>
                        <p className="text-sm text-gray-500">✨ Recomendaciones personalizadas • No requiere registro</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Perfil Empresarial */}
            {currentStep === "business-profile" && (
              <div className="space-y-12 py-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900">Primero entendamos tu negocio</h2>
                  <p className="text-xl text-gray-600">Esto me ayuda a crear la solución perfecta para ti</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">¿Qué tipo de negocio tienes?</label>
                        <Select
                          value={userData.businessType}
                          onValueChange={(value) => setUserData((prev) => ({ ...prev, businessType: value }))}
                        >
                          <SelectTrigger className="w-full bg-white/50 border-white/30">
                            <SelectValue placeholder="Selecciona tu tipo de negocio" />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">¿Cuántas personas hay en tu equipo?</label>
                        <Select
                          value={userData.teamSize}
                          onValueChange={(value) => setUserData((prev) => ({ ...prev, teamSize: value }))}
                        >
                          <SelectTrigger className="w-full bg-white/50 border-white/30">
                            <SelectValue placeholder="Selecciona tamaño de equipo" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-4">
                        <label className="text-lg font-semibold text-gray-800">¿Utilizas herramientas digitales?</label>
                        <div className="flex gap-4">
                          <Button
                            variant={userData.usesDigitalTools === true ? "default" : "outline"}
                            onClick={() => setUserData((prev) => ({ ...prev, usesDigitalTools: true }))}
                            className="flex-1"
                          >
                            Sí
                          </Button>
                          <Button
                            variant={userData.usesDigitalTools === false ? "default" : "outline"}
                            onClick={() => setUserData((prev) => ({ ...prev, usesDigitalTools: false }))}
                            className="flex-1"
                          >
                            No
                          </Button>
                        </div>
                      </div>

                      {userData.usesDigitalTools === true && (
                        <div className="space-y-4">
                          <label className="text-lg font-semibold text-gray-800">¿Qué herramientas usas?</label>
                          <Input
                            placeholder="Ej: Slack, Google Workspace, Shopify..."
                            value={userData.digitalTools}
                            onChange={(e) => setUserData((prev) => ({ ...prev, digitalTools: e.target.value }))}
                            className="bg-white/50 border-white/30"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {userData.businessType && userData.teamSize && userData.usesDigitalTools !== null && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={() => navigateToStep("pain-points")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl"
                    >
                      Continuar
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Puntos Críticos */}
            {currentStep === "pain-points" && (
              <div className="space-y-12 py-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900">¿Cuál es tu mayor desafío actual?</h2>
                  <p className="text-xl text-gray-600">Selecciona todos los que apliquen - esto me ayuda a priorizar soluciones</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {painPointOptions.map((option) => (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                        userData.painPoints.includes(option.id)
                          ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl shadow-blue-500/20"
                          : "border-white/30 bg-white/70 hover:border-white/50"
                      } backdrop-blur-md group`}
                      onClick={() => togglePainPoint(option.id)}
                    >
                      <CardContent className="p-8 space-y-4">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              userData.painPoints.includes(option.id)
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                            } transition-all duration-200`}
                          >
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{option.title}</h3>
                            <p className="text-gray-600">{option.description}</p>
                          </div>
                          {userData.painPoints.includes(option.id) && <CheckCircle className="w-6 h-6 text-blue-600" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {userData.painPoints.length > 0 && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={() => navigateToStep("process-mapping")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl"
                    >
                      Siguiente paso
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Mapeo de Procesos */}
            {currentStep === "process-mapping" && (
              <div className="space-y-12 py-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900">Cuéntame cómo funciona tu negocio</h2>
                  <p className="text-xl text-gray-600">Desde recibir un cliente hasta entregar un servicio...</p>
                </div>

                <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Describe tu proceso empresarial típico... Por ejemplo: 'Un cliente nos contacta por correo, programamos una consulta, creamos una propuesta, obtenemos aprobación, luego entregamos el servicio y enviamos la factura.'"
                        value={userData.processDescription}
                        onChange={(e) => setUserData((prev) => ({ ...prev, processDescription: e.target.value }))}
                        className="min-h-32 bg-white/50 border-white/30 text-lg"
                      />

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Esto me ayuda a entender qué automatizar o mejorar</span>
                        <span>{userData.processDescription.length} caracteres</span>
                      </div>
                    </div>

                    <div className="border-t border-white/30 pt-6">
                      <p className="text-lg font-semibold text-gray-800 mb-4">O sube contexto adicional:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button
                          variant="outline"
                          className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                          onClick={() => setIsRecording(!isRecording)}
                        >
                          {isRecording ? <Pause className="w-6 h-6 text-red-500" /> : <Mic className="w-6 h-6" />}
                          <span className="text-sm">{isRecording ? "Detener" : "Voz"}</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <FileText className="w-6 h-6" />
                          <span className="text-sm">Documento</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImageIcon className="w-6 h-6" />
                          <span className="text-sm">Imagen</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="flex flex-col items-center space-y-2 h-auto py-4 bg-white/50 border-white/30 hover:bg-white/70"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-6 h-6" />
                          <span className="text-sm">PDF</span>
                        </Button>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      />
                    </div>
                  </CardContent>
                </Card>

                {userData.processDescription.length > 50 && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={() => navigateToStep("priorities")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl"
                    >
                      Continuar
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Prioridades */}
            {currentStep === "priorities" && (
              <div className="space-y-12 py-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900">¿Qué te gustaría lograr primero?</h2>
                  <p className="text-xl text-gray-600">Selecciona tus prioridades principales para personalizar tu solución</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                  {priorityOptions.map((priority) => (
                    <Button
                      key={priority.id}
                      variant={userData.priorities.includes(priority.id) ? "default" : "outline"}
                      size="lg"
                      onClick={() => togglePriority(priority.id)}
                      className={`flex items-center space-x-3 px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-200 ${
                        userData.priorities.includes(priority.id)
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-white/70 border-white/30 hover:bg-white/90 backdrop-blur-md"
                      }`}
                    >
                      {priority.icon}
                      <span>{priority.label}</span>
                      {userData.priorities.includes(priority.id) && <CheckCircle className="w-5 h-5" />}
                    </Button>
                  ))}
                </div>

                {userData.priorities.length > 0 && (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={() => navigateToStep("solution-generator")}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl"
                    >
                      Generar mi solución
                      <Sparkles className="w-5 h-5 ml-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Generador de Soluciones */}
            {currentStep === "solution-generator" && (
              <div className="space-y-12 py-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900">Hemos creado una solución a tu medida</h2>
                  <p className="text-xl text-gray-600">Basada en tu perfil empresarial y prioridades</p>
                </div>

                <Card className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md border border-white/30 shadow-2xl max-w-3xl mx-auto">
                  <CardContent className="p-10 space-y-8">
                    <div className="text-center space-y-4">
                      <div
                        className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-xl ${
                          solution.type === "AI"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                            : solution.type === "Blockchain"
                              ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                              : "bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600"
                        } text-white`}
                      >
                        {solution.type === "AI" ? (
                          <Bot className="w-10 h-10" />
                        ) : solution.type === "Blockchain" ? (
                          <Blocks className="w-10 h-10" />
                        ) : (
                          <Sparkles className="w-10 h-10" />
                        )}
                      </div>

                      <h3 className="text-3xl font-bold text-gray-900">{solution.name}</h3>
                      <p className="text-lg text-gray-600">{solution.description}</p>

                      <Badge
                        variant="secondary"
                        className={`text-lg px-4 py-2 ${
                          solution.type === "AI"
                            ? "bg-blue-100 text-blue-800"
                            : solution.type === "Blockchain"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800"
                        }`}
                      >
                        Solución {solution.type}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-800">Beneficios Clave:</h4>
                      <div className="grid gap-3">
                        {solution.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-gray-800">Complementos Opcionales:</h4>
                      <div className="space-y-3">
                        {solution.addOns.map((addOn, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/30"
                          >
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800">{addOn.name}</h5>
                              <p className="text-sm text-gray-600">{addOn.description}</p>
                            </div>
                            <Button
                              variant={addOn.enabled ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                // Lógica para alternar complementos iría aquí
                              }}
                            >
                              {addOn.enabled ? "Incluido" : "Agregar"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={() => navigateToStep("final-cta")}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl"
                  >
                    Personalizar o Lanzar
                    <ArrowRight className="w-5 h-5 ml-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* CTA Final */}
            {currentStep === "final-cta" && (
              <div className="space-y-12 py-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-gray-900">¿Qué te gustaría hacer ahora?</h2>
                  <p className="text-xl text-gray-600">Elige tu camino - te apoyaremos de cualquier manera</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                   <Link href="/dashboard">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-md">
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform shadow-xl">
                        <Settings className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Construirlo tú mismo</h3>
                      <p className="text-gray-600">
                        Accede a nuestra plataforma sin código con configuración guiada por IA, plantillas y tutoriales paso a paso.
                      </p>
                     
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl">
                        Ir al panel
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                   
                    </CardContent>
                  </Card>   
                  </Link>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 cursor-pointer group backdrop-blur-md">
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform shadow-xl">
                        <Users className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Contrata a nuestro equipo</h3>
                      <p className="text-gray-600">
                        Deja que nuestros expertos diseñen, desarrollen e implementen tu solución personalizada con soporte completo.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Agendar consulta
                        <Calendar className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="max-w-md mx-auto bg-white/70 backdrop-blur-md border border-white/20 shadow-xl">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center space-y-2">
                      <Mail className="w-8 h-8 text-blue-600 mx-auto" />
                      <h3 className="font-semibold text-gray-800">Guardar y volver más tarde</h3>
                      <p className="text-gray-600 text-sm">Recibe tu informe de solución personalizado por correo</p>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Ingresa tu email"
                        value={userData.email}
                        onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                        className="flex-1 bg-white/50 border-white/30"
                      />
                      <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
                        Enviar
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Incluiremos hojas de ruta de implementación y próximos pasos
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
