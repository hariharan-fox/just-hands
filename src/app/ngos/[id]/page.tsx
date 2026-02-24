import Image from "next/image";
import { notFound } from "next/navigation";
import { allNgos, allEvents } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Target, Users, Mail, Phone, Globe, ArrowLeft } from "lucide-react";
import EventCard from "@/components/shared/event-card";
import Link from "next/link";

export default function NgoDetailPage({ params }: { params: { id: string } }) {
  const ngo = allNgos.find((n) => n.id === params.id);

  if (!ngo) {
    notFound();
  }

  const ngoLogo = PlaceHolderImages.find((p) => p.id === ngo.logoUrl);
  const ngoEvents = allEvents.filter(e => e.ngoId === ngo.id);
  const ngoEmail = `contact@${ngo.name.toLowerCase().replace(/\s/g, '')}.org`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <Link href="/ngos" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to all NGOs
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* NGO Header */}
          <div className="flex items-start gap-6">
            {ngoLogo && (
              <div className="relative h-24 w-24 rounded-lg border shadow-sm">
                <Image
                  src={ngoLogo.imageUrl}
                  alt={ngo.name}
                  fill
                  className="object-cover rounded-lg"
                  data-ai-hint={ngoLogo.imageHint}
                />
              </div>
            )}
            <div className="flex-1">
              <Badge>{ngo.cause.join(', ')}</Badge>
              <h1 className="text-xl font-bold mt-2">{ngo.name}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{ngo.location}</span>
              </div>
            </div>
          </div>
          
          {/* Mission & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="prose max-w-none text-foreground/90">
                <h2 className="text-base font-semibold mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-primary"/> Our Mission</h2>
                <p className="text-sm">{ngo.mission}</p>
            </div>
            <div className="prose max-w-none text-foreground/90">
                <h2 className="text-base font-semibold mb-2 flex items-center gap-2"><Users className="h-4 w-4 text-primary"/> Our Impact</h2>
                <p className="text-sm">{ngo.impact}</p>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-lg font-bold mb-4">Upcoming Events</h2>
             {ngoEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {ngoEvents.map(event => (
                        <EventCard key={event.id} event={event}/>
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground bg-accent p-8 rounded-lg">
                    <p className="text-sm">There are no upcoming events scheduled. Check back soon!</p>
                </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact & Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                 <div className="space-y-3">
                    <a href={`mailto:${ngoEmail}`} className="flex items-center gap-3 group">
                        <Mail className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary"/>
                        <span className="text-muted-foreground group-hover:text-primary break-all">{ngoEmail}</span>
                    </a>
                    <a href="tel:+919876543210" className="flex items-center gap-3 group">
                        <Phone className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary"/>
                        <span className="text-muted-foreground group-hover:text-primary">+91-987-654-3210</span>
                    </a>
                     <div className="flex items-start gap-3">
                        <Globe className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground"/>
                        <span className="text-muted-foreground">123 Mission Street, Puducherry</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <Button asChild size="sm"><a href={`mailto:${ngoEmail}`}><Mail className="mr-2 h-4 w-4"/>Email Us</a></Button>
                    <Button asChild size="sm" variant="secondary"><a href="tel:+919876543210"><Phone className="mr-2 h-4 w-4"/>Call Us</a></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
