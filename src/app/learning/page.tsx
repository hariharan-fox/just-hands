
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock } from "lucide-react";
import { learningSegments } from "@/lib/placeholder-data";

const totalProgress = learningSegments.reduce((acc, segment) => acc + segment.progress, 0) / (learningSegments.length > 0 ? learningSegments.length : 1);


export default function LearningPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Path to Conscious Living</h1>
        <p className="mt-2 text-base text-muted-foreground">
          A guided journey to empower your mind, nurture your relationships, and contribute to community wellbeing.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>You've completed {Math.round(totalProgress)}% of your learning journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={totalProgress} />
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {learningSegments.map((segment, index) => {
          const Icon = segment.icon;
          return (
            <AccordionItem key={segment.id} value={`item-${segment.id}`} disabled={segment.isLocked}>
              <AccordionTrigger className="hover:no-underline disabled:opacity-50">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{segment.title}</h3>
                    <p className="text-sm text-muted-foreground">Module {index + 1}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                    {segment.progress === 100 ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="mr-1 h-4 w-4"/> Completed
                        </Badge>
                    ) : (
                        <div className="w-24 text-right">
                           <p className="text-sm font-medium text-muted-foreground">{segment.progress}% complete</p>
                           <Progress value={segment.progress} className="h-2 mt-1" />
                        </div>
                    )}
                  {segment.isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-16 pr-8 pt-4 space-y-6">
                <p className="text-base">{segment.summary}</p>
                <div>
                  <h4 className="font-semibold mb-3">10 Key Actionable Points</h4>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {segment.id === 1 ? segment.actionPoints.map(point => <li key={point}>{point}</li>) : (
                      <>
                        <li>This is a placeholder for an actionable point.</li>
                        <li>This is another placeholder for an actionable point.</li>
                        <li>You would list 10 points here.</li>
                      </>
                    )}
                  </ul>
                </div>
                 <div>
                  <h4 className="font-semibold mb-3">Reflection Questions</h4>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {segment.id === 1 ? segment.reflectionQuestions.map(q => <li key={q}>{q}</li>) : (
                      <>
                        <li>This is a placeholder for a reflection question.</li>
                        <li>This is another placeholder for a reflection question.</li>
                      </>
                    )}
                  </ul>
                </div>
                <Button>Start Learning</Button>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  );
}
