
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { volunteer } from "@/lib/placeholder-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function SettingsPage() {
  const volunteerAvatar = PlaceHolderImages.find(p => p.id === volunteer.avatarUrl);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Public Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              {volunteerAvatar && (
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={volunteerAvatar.imageUrl} alt={volunteer.name} data-ai-hint={volunteerAvatar.imageHint} />
                    <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
              )}
              <Button variant="outline">Change Photo</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={volunteer.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={volunteer.email} disabled />
              <p className="text-xs text-muted-foreground">Your email address is not displayed publicly.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">My Skills</Label>
              <Textarea
                id="skills"
                defaultValue={volunteer.skills.join(', ')}
                placeholder="e.g., Web Development, Event Planning, Public Speaking"
              />
                <p className="text-xs text-muted-foreground">Enter skills separated by commas.</p>
            </div>
              <div className="space-y-2">
              <Label htmlFor="interests">My Interests</Label>
              <Textarea
                id="interests"
                defaultValue={volunteer.interests.join(', ')}
                placeholder="e.g., Education, Environment, Animal Welfare"
              />
              <p className="text-xs text-muted-foreground">Enter interests separated by commas.</p>
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
