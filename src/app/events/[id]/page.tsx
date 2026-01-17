import Image from "next/image";
import { notFound } from "next/navigation";
import { allEvents, allNgos } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Target, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = allEvents.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  const ngo = allNgos.find((n) => n.id === event.ngoId);
  const eventImage = PlaceHolderImages.find((p) => p.id === event.imageUrl);
  const ngoLogo = ngo ? PlaceHolderImages.find((p) => p.id === ngo.logoUrl) : undefined;

  return (
    <div className="bg-background text-foreground -m-4 lg:-m-6">
      <div className="relative h-64 md:h-80 w-full">
        {eventImage && (
          <Image
            src={eventImage.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            data-ai-hint={eventImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                 <CardTitle>About this Event</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-foreground/90">
                <p>{event.description}</p>
              </CardContent>
            </Card>

             {ngo && (
                <Card>
                    <CardHeader>
                        <CardTitle>About the Organizer</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        {ngoLogo && (
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={ngoLogo.imageUrl} alt={ngo.name} data-ai-hint={ngoLogo.imageHint}/>
                                <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="flex-1">
                            <Link href={`/ngos/${ngo.id}`} className="text-xl font-bold hover:underline">{ngo.name}</Link>
                            <p className="text-sm text-muted-foreground mt-1">{ngo.mission}</p>
                        </div>
                    </CardContent>
                </Card>
             )}
          </div>
          
          <aside className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <Button size="lg" className="w-full text-base mb-6">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Sign Up for this Event
                  </Button>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Date & Time</h3>
                        <p className="text-muted-foreground">{event.date} at {event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-2"><Target className="h-5 w-5 text-primary"/> Skills Needed</h3>
                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-2"><Users className="h-5 w-5 text-primary"/> Event Cause</h3>
                      <Badge>{event.cause}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
