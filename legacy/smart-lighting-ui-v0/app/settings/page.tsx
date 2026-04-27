'use client';

import { useState } from 'react';
import { Settings, Bell, Lock, Users, Database, Globe, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    organizationName: 'City of Metro',
    email: 'admin@smartlighting.city',
    timezone: 'UTC-5',
    theme: 'dark',
    notifications: {
      critical: true,
      warnings: true,
      updates: false,
    },
  });

  return (
    <main className="min-h-screen bg-background lg:ml-64">
      {/* Top navigation spacing */}
      <div className="h-16" />

      {/* Page content */}
      <div className="p-6 space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground">Manage your system configuration and preferences</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">Organization</h2>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Organization Name
                </label>
                <Input
                  value={settings.organizationName}
                  onChange={(e) =>
                    setSettings({ ...settings, organizationName: e.target.value })
                  }
                  placeholder="Your organization name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Admin Email
                </label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Timezone
                </label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-6 (Central Time)</option>
                  <option>UTC-7 (Mountain Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Preferred Theme
                </label>
                <div className="flex gap-3">
                  {['light', 'dark', 'system'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setSettings({ ...settings, theme })}
                      className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                        settings.theme === theme
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </h2>

              <div className="space-y-4">
                {[
                  {
                    id: 'critical',
                    label: 'Critical Alerts',
                    description: 'Receive notifications for critical system failures',
                  },
                  {
                    id: 'warnings',
                    label: 'Warnings',
                    description: 'Receive notifications for warning-level alerts',
                  },
                  {
                    id: 'updates',
                    label: 'System Updates',
                    description: 'Receive notifications for available system updates',
                  },
                ].map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{notif.label}</p>
                      <p className="text-sm text-muted-foreground">{notif.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={settings.notifications[notif.id as keyof typeof settings.notifications]}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Users & Access */}
          <TabsContent value="users" className="space-y-6 mt-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Members
              </h2>

              <div className="space-y-3 mb-6">
                {[
                  { name: 'John Admin', email: 'john@smartlighting.city', role: 'Admin' },
                  { name: 'Sarah Operator', email: 'sarah@smartlighting.city', role: 'Operator' },
                  { name: 'Mike Field Tech', email: 'mike@smartlighting.city', role: 'Technician' },
                ].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                        {user.role}
                      </span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="gap-2">
                <Users className="w-4 h-4" />
                Add Team Member
              </Button>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Advanced Options
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h3 className="font-medium text-foreground mb-2">API Access</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enable API access for third-party integrations
                  </p>
                  <Button variant="outline" size="sm">
                    Manage API Keys
                  </Button>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h3 className="font-medium text-foreground mb-2">Data Export</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Export your organization's data in various formats
                  </p>
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                </div>

                <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                  <h3 className="font-medium text-foreground mb-2">Integrations</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect with external systems and services
                  </p>
                  <Button variant="outline" size="sm">
                    Configure Integrations
                  </Button>
                </div>

                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                  <h3 className="font-medium text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-foreground/70 mb-3">
                    Irreversible actions that may affect your system
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete All Data
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
