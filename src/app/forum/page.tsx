import { forumPosts } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function ForumPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect, share, and learn with fellow volunteers and NGOs.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Start a New Discussion
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {forumPosts.map((post) => {
              const authorAvatar = PlaceHolderImages.find((p) => p.id.includes(post.authorName.toLowerCase().split(' ')[0]));
              const lastReplyAuthorAvatar = PlaceHolderImages.find((p) => p.id.includes(post.lastReply.authorName.toLowerCase().split(' ')[0]));

              return (
                <li key={post.id} className="p-4 hover:bg-accent transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-12 md:col-span-7 flex items-center gap-4">
                      {authorAvatar && (
                         <Avatar>
                            <AvatarImage src={authorAvatar.imageUrl} alt={post.authorName} data-ai-hint={authorAvatar.imageHint}/>
                            <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                      )}
                      <div>
                        <Link href="#" className="font-semibold text-sm hover:text-primary">{post.title}</Link>
                        <p className="text-sm text-muted-foreground">
                          Started by <span className="font-medium text-foreground">{post.authorName}</span> {post.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-2 text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-bold text-sm text-foreground">{post.replies}</span>
                        <span className="hidden md:inline">replies</span>
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-3 flex items-center gap-2 justify-end text-sm text-muted-foreground">
                       {lastReplyAuthorAvatar && (
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={lastReplyAuthorAvatar.imageUrl} alt={post.lastReply.authorName} data-ai-hint={lastReplyAuthorAvatar.imageHint}/>
                            <AvatarFallback>{post.lastReply.authorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                       )}
                      <div>
                        <p>
                          <span className="font-medium text-foreground">{post.lastReply.authorName}</span> replied
                        </p>
                        <p>{post.lastReply.createdAt}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
