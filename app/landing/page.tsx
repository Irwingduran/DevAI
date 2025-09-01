"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LeadCaptureForm } from "@/components/forms/lead-capture-form"
import { LeadCaptureModal } from "@/components/forms/lead-capture-modal"
import {
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  MessageSquare,
  BarChart3,
  Clock,
  Rocket,
  Heart,
  Brain,
  Target,
  Eye,
  Headphones,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const steps = [
    {
      icon: MessageSquare,
      title: "Describe tu negocio",
      description: "Cuéntanos sobre tus desafíos y objetivos",
    },
    {
      icon: Target,
      title: "Elige tus prioridades",
      description: "Selecciona lo que más importa para tu éxito",
    },
    {
      icon: Brain,
      title: "Obtén una solución inteligente personalizada",
      description: "La IA genera tu hoja de ruta personalizada",
    },
    {
      icon: Rocket,
      title: "Construye tú mismo o déjanos hacerlo",
      description: "Elige tu camino de implementación",
    },
  ]

  const userTypes = [
    {
      emoji: "👩‍🎤",
      role: "Emprendedores",
      useCase: "Automatiza mensajes a clientes y generación de leads",
    },
    {
      emoji: "👨‍⚕️",
      role: "Dueños de pequeños negocios",
      useCase: "Rastrea pedidos con transparencia blockchain",
    },
    {
      emoji: "📚",
      role: "Educadores",
      useCase: "Crea experiencias de aprendizaje con IA",
    },
    {
      emoji: "💼",
      role: "Freelancers",
      useCase: "Optimiza flujos de trabajo de gestión de proyectos",
    },
  ]

  const templates = [
    {
      title: "Soporte al Cliente con IA",
      description: "Asistente de chat inteligente 24/7",
      price: "$29",
      category: "IA",
    },
    {
      title: "Inventario Blockchain",
      description: "Seguimiento transparente de cadena de suministro",
      price: "$49",
      category: "Blockchain",
    },
    {
      title: "Analíticas Inteligentes",
      description: "Información empresarial potenciada por IA",
      price: "$39",
      category: "IA",
    },
    {
      title: "Pagos Seguros",
      description: "Procesamiento de pagos con blockchain",
      price: "$59",
      category: "Blockchain",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Dueña de E-commerce",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      quote: "Incrementé la satisfacción del cliente en 40% con soporte de chat con IA",
      result: "40% más de satisfacción",
    },
    {
      name: "Marcus Rodriguez",
      role: "Cadena de Restaurantes",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      quote: "El inventario blockchain redujo el desperdicio de comida en 60% en todas las ubicaciones",
      result: "60% menos desperdicio",
    },
    {
      name: "Emily Watson",
      role: "Firma de Consultoría",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      quote: "Las analíticas de IA nos ayudaron a identificar $2M en oportunidades de ahorro",
      result: "$2M en ahorros identificados",
    },
  ]

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Fondo de Partículas Flotantes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Sección Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Sin Código Requerido
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Convierte tus ideas de negocio en{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  soluciones inteligentes con IA
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Sin código. Sin habilidades técnicas. Solo dinos tus problemas - nosotros hacemos el resto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Comenzar Gratis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button></Link>
         

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 px-8 py-4 text-lg rounded-full transition-all duration-300 bg-transparent"
                onClick={() => scrollToSection("how-it-works")}
              >
                <Play className="mr-2 w-5 h-5" />
                Cómo funciona
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10k+</div>
                <div className="text-sm text-gray-600">Soluciones Construidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Tasa de Éxito</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Soporte Experto</div>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=800&text=Futuristic+AI+Assistant+Interface"
                alt="Interfaz de Asistente de IA"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Cómo Funciona */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-700 mb-4">Proceso Simple</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Cómo Funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              De idea a implementación en solo 4 simples pasos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index

              return (
                <Card
                  key={index}
                  className={`relative transition-all duration-500 hover:shadow-lg ${
                    isActive ? "ring-2 ring-blue-500 shadow-lg scale-105" : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <LeadCaptureModal
              triggerText="Prueba la experiencia guiada"
              formOrigin="Cómo Funciona CTA"
              trigger={
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full"
                >
                  Prueba la experiencia guiada
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* Sección Para Quién Es */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-700 mb-4">Perfecto Para</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Para Quién Es</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diseñado para profesionales ambiciosos listos para adoptar tecnología inteligente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((user, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {user.emoji}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{user.role}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{user.useCase}</p>
                  <div className="mt-4 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Seguimiento de Proyecto */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-700 mb-4">Seguimiento en Tiempo Real</Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Mira tu solución cobrar vida</h2>
              <p className="text-xl text-gray-600 mb-8">
                Transparencia total con actualizaciones de proyecto en tiempo real y comunicación con expertos
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Eye,
                    title: "Ve tu solución cobrar vida paso a paso",
                    description: "Seguimiento de progreso con hitos detallados",
                  },
                  {
                    icon: BarChart3,
                    title: "Actualizaciones de desarrollo transparentes",
                    description: "Notificaciones y cambios de estado en tiempo real",
                  },
                  {
                    icon: Headphones,
                    title: "Comunicación integrada con expertos",
                    description: "Chat directo con tu equipo de solución dedicado",
                  },
                ].map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Bot de Soporte al Cliente con IA</h3>
                    <Badge className="bg-green-100 text-green-700">En Progreso</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Recopilación de requisitos completada</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Entrenamiento del modelo de IA en progreso</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Pruebas de integración - 2 días restantes</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progreso</span>
                      <span className="font-semibold">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Beneficios PRO */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4">Hazte PRO</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Desbloquea todo el potencial</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Obtén acceso ilimitado a funciones avanzadas y soporte prioritario
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Gratis */}
            <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Gratis</h3>
                  <div className="text-4xl font-bold mb-4">
                    $0<span className="text-lg text-gray-600">/mes</span>
                  </div>
                  <p className="text-gray-600">Perfecto para comenzar</p>
                </div>

                <div className="space-y-3 mb-8">
                  {["3 soluciones por mes", "Plantillas básicas", "Soporte comunitario", "Tiempo de procesamiento estándar"].map(
                    (feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ),
                  )}
                </div>

                <LeadCaptureModal
                  triggerText="Comienza Gratis"
                  formOrigin="Plan Gratis CTA"
                  trigger={
                    <Button variant="outline" className="w-full bg-transparent">
                      Comienza Gratis
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            {/* Plan PRO */}
            <Card className="border-2 border-purple-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold">
                Más Popular
              </div>

              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">PRO</h3>
                  <div className="text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      $49
                    </span>
                    <span className="text-lg text-gray-600">/mes</span>
                  </div>
                  <p className="text-gray-600">Para emprendedores serios</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    "Soluciones ilimitadas",
                    "Plantillas premium y marketplace",
                    "Soporte experto prioritario",
                    "Recomendaciones avanzadas de IA",
                    "Integraciones personalizadas",
                    "Opciones white-label",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                      <span className="text-sm">{feature}</span>
                      {index >= 3 && <Badge className="bg-purple-100 text-purple-700 text-xs ml-auto">PRO</Badge>}
                    </div>
                  ))}
                </div>

                <LeadCaptureModal
                  triggerText="Prueba 7 Días Gratis"
                  formOrigin="Plan PRO CTA"
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Prueba 7 Días Gratis
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección Plantillas/Marketplace */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 mb-4">Listo para Usar</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Herramientas plug-and-play para ir más rápido</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Salta la configuración con nuestras soluciones y plantillas pre-construidas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      className={`${
                        template.category === "IA" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {template.category}
                    </Badge>
                    <div className="text-lg font-bold text-gray-900">{template.price}</div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all bg-transparent"
                  >
                    Vista Previa e Instalar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full bg-transparent"
            >
              Explorar Todos los Recursos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Sección Testimonios */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 mb-4">Historias de Éxito</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Resultados Reales de Negocios Reales</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Mira cómo nuestra plataforma transformó estos negocios</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 mb-6 italic">"{testimonial.quote}"</blockquote>

                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Badge className="bg-green-100 text-green-700">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {testimonial.result}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección CTA Final con Formulario Integrado */}
      <section id="wizard" className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lado izquierdo - Contenido CTA */}
            <div className="text-white">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                ¿Listo para comenzar a construir{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  de manera más inteligente?
                </span>
              </h2>

              <p className="text-xl mb-8 opacity-90 max-w-2xl">
                Únete a miles de emprendedores que ya han transformado sus negocios con soluciones de IA y blockchain
              </p>

              <div className="flex flex-wrap gap-8 text-sm opacity-75 mb-8">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  No se requiere tarjeta de crédito
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Configuración en 5 minutos
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Cancela en cualquier momento
                </div>
              </div>

              <div className="lg:hidden mb-8">
                <LeadCaptureModal
                  triggerText="Obtén Mi Solución Inteligente"
                  formOrigin="CTA Final Móvil"
                  trigger={
                    <Button
                      size="lg"
                      className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                    >
                      <Rocket className="mr-2 w-5 h-5" />
                      Obtén Mi Solución Inteligente
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Lado derecho - Formulario Integrado (solo escritorio) */}
            <div className="hidden lg:block">
              <LeadCaptureForm formOrigin="CTA Final Integrado" className="shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SmartSolutions</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empoderando negocios con soluciones de IA y blockchain, sin necesidad de conocimientos técnicos.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Cómo funciona</div>
                <div>Plantillas</div>
                <div>Precios</div>
                <div>Empresa</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Centro de Ayuda</div>
                <div>Contáctanos</div>
                <div>Soporte Experto</div>
                <div>Estado</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Acerca de</div>
                <div>Blog</div>
                <div>Carreras</div>
                <div>Privacidad</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2024 SmartSolutions. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}