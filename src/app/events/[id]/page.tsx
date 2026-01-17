import Image from "next/image";
import { notFound } from "next/navigation";
import { allEvents, allNgos } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Target, UserPlus, Users } from "lucide-react";
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
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-3">
          <div className="relative aspect-video w-full mb-6">
            {eventImage && (
              <Image
                src={eventImage.imageUrl}
                alt={event.title}
                fill
                className="object-cover rounded-lg shadow-lg"
                data-ai-hint={eventImage.imageHint}
              />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="prose max-w-none text-foreground/90">
            <p>{event.description}</p>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-center">
            <Button size="lg" className="w-full text-base">
              <UserPlus className="mr-2 h-5 w-5" />
              Sign Up for this Event
            </Button>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
             {ngo && (
                <div className="flex items-center gap-4">
                   {ngoLogo && (
                       <Avatar className="h-16 w-16">
                           <AvatarImage src={ngoLogo.imageUrl} alt={ngo.name} data-ai-hint={ngoLogo.imageHint}/>
                           <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                   )}
                   <div>
                       <p className="text-sm text-muted-foreground">Hosted by</p>
                       <Link href={`/ngos/${ngo.id}`} className="text-lg font-bold hover:underline">{ngo.name}</Link>
                   </div>
                </div>
            )}
            
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
        </div>
      </div>
    </div>
  );
}
