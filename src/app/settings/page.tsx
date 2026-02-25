'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { volunteer } from "@/lib/placeholder-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth } from "@/lib/auth-context";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const volunteerAvatar = PlaceHolderImages.find(p => p.id === 'avatar-priya-sharma');
  const volunteerName = user?.name || volunteer.name;
  const volunteerEmail = user?.email || volunteer.email;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-lg font-bold">Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Public Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              {volunteerAvatar && (
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={volunteerAvatar.imageUrl} alt={volunteerName} data-ai-hint={volunteerAvatar.imageHint} />
                    <AvatarFallback>{volunteerName.charAt(0)}</AvatarFallback>
                  </Avatar>
              )}
              <Button variant="outline">Change Photo</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={volunteerName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={volunteerEmail} disabled />
              <p className="text-xs text-muted-foreground">Your email address is not displayed publicly.</p>
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Button variant="ghost" onClick={logout} className="w-full justify-start px-0 -ml-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
                <Button variant="outline" className="mt-4">Change Password</Button>
                <p className="text-xs text-muted-foreground">You will be sent an email to reset your password.</p>
            </div>
            <Separator />
              <div className="space-y-4">
              <h3 className="text-base font-medium">Danger Zone</h3>
                <div className="rounded-lg border border-destructive p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                          <h4 className="font-semibold">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all of your content.</p>
                      </div>
                        <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
