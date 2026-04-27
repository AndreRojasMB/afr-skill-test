'use client';

import { Bell, User, LogOut, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/lib/language-context';
import { useMunicipality } from '@/lib/municipality-context';
import { getTranslation } from '@/lib/translations';

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { selectedMunicipality, setSelectedMunicipality, allMunicipalities } = useMunicipality();
  const t = (key: string) => getTranslation(language, key);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border lg:left-64">
      <div className="flex items-center justify-between px-6 py-4 h-16">
        {/* Left spacer for mobile menu button */}
        <div className="lg:hidden w-10" />

        {/* Center title - visible on mobile only */}
        <div className="lg:hidden flex-1 text-center">
          <h2 className="text-sm font-semibold text-foreground">AFR Energia</h2>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Municipality Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hidden md:flex"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-xs truncate max-w-[120px]">{selectedMunicipality.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {allMunicipalities.map((municipality) => (
                <DropdownMenuItem
                  key={municipality.id}
                  onClick={() => setSelectedMunicipality(municipality)}
                  className={municipality.id === selectedMunicipality.id ? 'bg-primary/20' : ''}
                >
                  {municipality.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
              >
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => setLanguage('es')}
                className={language === 'es' ? 'bg-primary/20' : ''}
              >
                Español
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-primary/20' : ''}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 bg-primary/20 hover:bg-primary/30"
              >
                <User className="w-5 h-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                {t('common.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
