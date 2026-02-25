
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { completedEvents, earnedCertificates } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MyImpactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">
      <div>
        <h1 className="text-xl font-bold">My Impact</h1>
        <p className="text-muted-foreground text-sm">
          Track your progress, view your achievements, and see the difference you're making.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-bold mb-4">My Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {earnedCertificates.map((cert) => (
            <Card key={cert.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <cert.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-sm font-semibold">{cert.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4">Event History</h2>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y">
              {completedEvents.length > 0 ? (
                completedEvents.map((event) => {
                  const eventImage = PlaceHolderImages.find(p => p.id === event.imageUrl);
                  return (
                    <li key={event.id} className="p-4">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-4">
                          {eventImage && (
                            <Avatar className="h-12 w-12 rounded-md">
                              <AvatarImage src={eventImage.imageUrl} alt={event.title} className="rounded-md" data-ai-hint={eventImage.imageHint} />
                              <AvatarFallback className="rounded-md">{event.title.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="font-semibold text-sm">{event.title}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/events/${event.id}`}>
                            View Impact <ArrowRight className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p className="text-muted-foreground text-sm p-6 text-center">You haven't completed any events yet.</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
