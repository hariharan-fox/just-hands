import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { List, CheckCircle, Clock, Award, Users } from "lucide-react";
import Link from "next/link";
import { volunteer, upcomingCommitments } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Event } from "@/lib/types";

export default function DashboardPage() {
  const volunteerAvatar = PlaceHolderImages.find(p => p.id === 'avatar-priya-sharma');
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        {volunteerAvatar && (
            <Avatar className="h-20 w-20">
              <AvatarImage src={volunteerAvatar.imageUrl} alt={volunteer.name} data-ai-hint={volunteerAvatar.imageHint} />
              <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
            </Avatar>
        )}
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {volunteer.name}!</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {volunteer.skills.map(skill => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">in the last 3 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Events Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Community Leader</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Causes Supported</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Education, Environment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Commitments</CardTitle>
            <CardDescription>Your scheduled volunteer activities.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingCommitments.map((event: Event) => {
                 const eventImage = PlaceHolderImages.find(p => p.id === event.imageUrl);
                 return (
                  <li key={event.id} className="flex items-center gap-4">
                    {eventImage && (
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src={eventImage.imageUrl} alt={event.title} className="rounded-md" data-ai-hint={eventImage.imageHint} />
                        <AvatarFallback className="rounded-md">{event.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <Link href={`/events/${event.id}`} className="font-semibold hover:underline">{event.title}</Link>
                      <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                    </div>
                  </li>
                 )
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
