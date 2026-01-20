
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Heart, Brain, Users, HeartHandshake, DollarSign, Baby, Landmark, Library, Sprout, Network, ShieldAlert, Sparkles, Wind, Lightbulb } from "lucide-react";

// Data for learning segments
const learningSegments = [
    { id: 1, title: 'Self-Care', icon: Heart, summary: 'Nurturing your body and mind is the foundation of wellbeing. This segment explores practical ways to integrate self-care into your daily life.', actionPoints: ['Dedicate 15 minutes daily to a relaxing activity.', 'Ensure you get 7-8 hours of sleep per night.', 'Practice mindful eating without distractions.', 'Engage in a physical activity you enjoy for 30 minutes.', 'Set boundaries to protect your energy and time.', 'Journal your thoughts and feelings regularly.', 'Connect with a friend or loved one.', 'Spend time in nature, even if it\'s just a short walk.', 'Learn to say "no" to commitments that drain you.', 'Celebrate your small wins and achievements.'], reflectionQuestions: ['What does self-care mean to you?', 'What are your biggest barriers to practicing self-care?'], progress: 75, isLocked: false },
    { id: 2, title: 'Psychology & Self-Understanding', icon: Brain, summary: 'Gain insights into your own mind. Understand your emotions, thoughts, and behaviors to foster self-awareness and personal growth.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 40, isLocked: false },
    { id: 3, title: 'Influences', icon: Users, summary: 'Become aware of the external factors that shape you, from social circles to media, and learn to navigate them consciously.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 4, title: 'Family & Parenting', icon: Baby, summary: 'Explore the dynamics of family life and develop skills for conscious parenting and building strong, supportive family bonds.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 5, title: 'Relationship Management', icon: HeartHandshake, summary: 'Learn to cultivate healthy, meaningful relationships with partners, friends, and colleagues through effective communication and empathy.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 6, title: 'Finance & Money', icon: DollarSign, summary: 'Achieve financial wellbeing by understanding money management, budgeting, and conscious spending.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 7, title: 'Human Rights & Law', icon: Landmark, summary: 'Understand your rights and the legal frameworks that protect them, empowering you to be an informed and active citizen.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 8, title: 'Government Schemes & Social Support', icon: Library, summary: 'Learn about the social support systems and government schemes available to you and your community.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 9, title: 'Environmental & Animal Care', icon: Sprout, summary: 'Discover how your actions impact the planet and learn to live more sustainably and compassionately towards all beings.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 10, title: 'Systems & Patterns', icon: Network, summary: 'Recognize the larger systems and patterns at play in society and learn how to contribute to positive systemic change.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 11, title: 'Disaster Management', icon: ShieldAlert, summary: 'Prepare yourself and your community for unexpected events with practical knowledge in disaster preparedness and response.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 12, title: 'Spirituality', icon: Sparkles, summary: 'Explore your inner world and connect with your sense of purpose and meaning, regardless of your beliefs.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
    { id: 13, title: 'Being Conscious/Mindfulness', icon: Wind, summary: 'Cultivate a state of present-moment awareness to reduce stress, improve focus, and live more intentionally.', actionPoints: ['...'], reflectionQuestions: ['...'], progress: 0, isLocked: true },
];


const totalProgress = learningSegments.reduce((acc, segment) => acc + segment.progress, 0) / (learningSegments.length * 100) * 100;


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
