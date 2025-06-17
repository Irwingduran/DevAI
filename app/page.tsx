import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Process } from "@/components/process"
import { CaseStudies } from "@/components/case-studies"
import { Portfolio } from "@/components/portfolio"
import { IndustryFocus } from "@/components/industry-focus"
import { GlobalReach } from "@/components/global-reach"
import { Availability } from "@/components/availability"
import { Partnership } from "@/components/partnership"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Process />
      <CaseStudies />
      <Portfolio />
      <IndustryFocus />
      <GlobalReach />
      <Availability />
      <Partnership />
      <Contact />
      <Footer />
    </div>
  )
}
