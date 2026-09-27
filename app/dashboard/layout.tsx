import { redirect } from 'next/navigation'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { getDashboardSession } from '@/lib/dashboard/get-dashboard-session'
import { needsOnboarding, ONBOARDING_SETTINGS_PATH } from '@/lib/profile/onboarding'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getDashboardSession()

  if (!user) {
    redirect('/auth/login')
  }

  if (needsOnboarding(profile?.user_type)) {
    redirect(ONBOARDING_SETTINGS_PATH)
  }

  const userType = profile?.user_type ?? 'pyme'

  return <DashboardShell userType={userType}>{children}</DashboardShell>
}
