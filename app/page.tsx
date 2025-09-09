"use client"

import { AuthProvider } from "@/contexts/auth-context"
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard"

export default function Page() {
  return (
    <AuthProvider>
      <OnboardingWizard />
    </AuthProvider>
  )
}