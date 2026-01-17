import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from '@/components/shared/event-card';
import { featuredEvents, howItWorks, testimonials } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-volunteers');

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-accent overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground">
              Make a Difference, One Connection at a Time
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              ConnectSphere is your bridge to meaningful volunteer opportunities. Find causes you love, connect with NGOs, and build a better community together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/events">
                  Find Opportunities <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/signup">
                  Register your NGO
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            {heroImage && (
               <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover rounded-2xl shadow-2xl"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Events</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get involved in upcoming activities and make an impact in your community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/events">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Volunteering has never been this easy. Follow these simple steps to get started.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {howItWorks.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <div className="bg-primary text-primary-foreground rounded-full p-4">
                  {index === 0 && <Heart className="h-8 w-8" />}
                  {index === 1 && <Users className="h-8 w-8" />}
                  {index === 2 && <CheckCircle className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
           <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Voices of Our Community</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear what volunteers and NGOs have to say about their experience with ConnectSphere.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
              return (
              <Card key={index} className="flex flex-col">
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    {avatar && (
                      <Avatar>
                        <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint}/>
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>
      </section>
    </div>
  );
}
