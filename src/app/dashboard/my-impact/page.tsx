'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { allCertificates } from "@/lib/placeholder-data";
import { CheckCircle, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function BadgesPage() {
  const earnedBadges = allCertificates.filter(c => c.isEarned);
  const unearnedBadges = allCertificates.filter(c => !c.isEarned);
  const { toast } = useToast();

  const handleShare = (badgeName: string) => {
    const shareText = `I just earned the "${badgeName}" badge on Just Hands for my volunteer work! #JustHands #Volunteering`;
    navigator.clipboard.writeText(shareText);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share your achievement.",
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">
      <div>
        <h1 className="text-xl font-bold">My Badges</h1>
        <p className="text-muted-foreground text-sm">
          Recognizing your dedication and impact. Keep up the great work!
        </p>
      </div>

      <section>
        <h2 className="text-lg font-bold mb-4">Earned Badges ({earnedBadges.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {earnedBadges.map((cert) => (
            <Card key={cert.id} className="border-primary/50 border-2 shadow-lg bg-primary/5 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold">{cert.name}</CardTitle>
                <CheckCircle className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <cert.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </div>
              </CardContent>
              <CardFooter className="pt-2 justify-end">
                <Button size="sm" variant="ghost" className="text-primary hover:text-primary -mr-2" onClick={() => handleShare(cert.name)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-lg font-bold mb-4">Badges to Unlock ({unearnedBadges.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {unearnedBadges.map((cert) => (
            <Card key={cert.id} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">{cert.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-muted text-muted-foreground">
                    <cert.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
