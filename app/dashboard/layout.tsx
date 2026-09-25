import { redirect } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { needsOnboarding, ONBOARDING_SETTINGS_PATH } from '@/lib/profile/onboarding'
import { getServerAuthForRedirect } from '@/lib/auth/server-auth-helper'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, userType } = await getServerAuthForRedirect()

  if (!user) {
    redirect('/auth/login')
  }

  if (needsOnboarding(userType)) {
    redirect(ONBOARDING_SETTINGS_PATH)
  }

  return <DashboardShell userType={userType ?? 'pyme'}>{children}</DashboardShell>
}
