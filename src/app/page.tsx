import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { howItWorks, testimonials } from '@/lib/placeholder-data';

export default function LandingPage() {
    
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-20 pb-12 md:pt-32 md:pb-24 bg-transparent text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-in-from-bottom" style={{ animationDelay: '100ms' }}>
                            Your Cause is Calling.
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground mb-8 animate-slide-in-from-bottom" style={{ animationDelay: '200ms' }}>
                            Meet A Cause is the bridge between you and the organizations making a real difference. We're currently building our network of impactful NGOs. Join our waitlist to be the first to know when we launch.
                        </p>
                        <div className="animate-slide-in-from-bottom" style={{ animationDelay: '300ms' }}>
                            <Button size="lg" asChild>
                                <Link href="/waitlist">
                                    Join the Volunteer Waitlist
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <p className="text-sm mt-4 text-muted-foreground">
                                Are you an NGO? <Link href="/signup" className="underline hover:text-primary">Register here</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold">Simple Steps to Make a Big Impact</h2>
                        <p className="text-muted-foreground mt-2">Connecting with your cause has never been easier.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="flex flex-col items-center p-4">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-3xl mb-6 shadow-lg shadow-primary/20">
                                    {index + 1}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-transparent">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold">Hear From Our Community</h2>
                         <p className="text-muted-foreground mt-2">See what others are saying about their experience.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {testimonials.map((testimonial) => {
                            const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
                            return (
                            <Card key={testimonial.name} className="bg-card border-border/50">
                                <CardContent className="p-6">
                                    <p className="text-muted-foreground mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                                    <div className="flex items-center gap-4">
                                        {avatar && (
                                            <Avatar>
                                                <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />
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
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
