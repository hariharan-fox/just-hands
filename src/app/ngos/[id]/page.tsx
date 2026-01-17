import Image from "next/image";
import { notFound } from "next/navigation";
import { allNgos, allEvents } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Target, Users, Mail, Phone } from "lucide-react";
import EventCard from "@/components/shared/event-card";

export default function NgoDetailPage({ params }: { params: { id: string } }) {
  const ngo = allNgos.find((n) => n.id === params.id);

  if (!ngo) {
    notFound();
  }

  const ngoLogo = PlaceHolderImages.find((p) => p.id === ngo.logoUrl);
  const ngoEvents = allEvents.filter(e => e.ngoId === ngo.id);

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <header className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {ngoLogo && (
                    <div className="relative h-32 w-32 rounded-full border-4 border-background shadow-lg">
                        <Image
                            src={ngoLogo.imageUrl}
                            alt={ngo.name}
                            fill
                            className="object-cover rounded-full"
                            data-ai-hint={ngoLogo.imageHint}
                        />
                    </div>
                )}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">{ngo.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>NGO</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{ngo.location}</span>
                        </div>
                    </div>
                     <div className="flex flex-wrap gap-2 mt-4">
                        {ngo.cause.map((c) => (
                            <Badge key={c}>{c}</Badge>
                        ))}
                    </div>
                </div>
                 <div className="flex gap-2">
                    <Button><Mail className="mr-2 h-4 w-4"/>Contact</Button>
                    <Button variant="secondary"><Phone className="mr-2 h-4 w-4"/>Call</Button>
                </div>
            </div>
        </header>
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-base text-foreground/80">{ngo.mission}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-primary" /> Our Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-base text-foreground/80">{ngo.impact}</p>
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-8">
                 <Card>
                     <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-2 text-muted-foreground">
                        <p><strong>Address:</strong> 123 Mission Street, Puducherry</p>
                        <p><strong>Email:</strong> contact@{ngo.name.toLowerCase().replace(/\s/g, '')}.org</p>
                        <p><strong>Phone:</strong> +91-987-654-3210</p>
                     </CardContent>
                 </Card>
             </div>
        </div>

        <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Upcoming Events by {ngo.name}</h2>
            {ngoEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ngoEvents.map(event => (
                        <EventCard key={event.id} event={event}/>
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground bg-accent p-8 rounded-lg">
                    <p>There are no upcoming events scheduled. Check back soon!</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
