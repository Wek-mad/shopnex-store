'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, LogOut, Settings, Package, UserPlus } from 'lucide-react'

export function AccountMenu() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout()
    router.push('/')
    setIsLoggingOut(false)
  }

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/account/login">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <User className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">
            {user.firstName || user.email.split('@')[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium">
          {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email}
        </div>
        <div className="px-2 py-1.5 text-xs text-gray-500">{user.email}</div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account#orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Order History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Signing out...' : 'Sign Out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
