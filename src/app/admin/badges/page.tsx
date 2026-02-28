'use client';
import { useState } from 'react';
import { allCertificates } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

export default function BadgeManagementPage() {
    const [badges, setBadges] = useState(allCertificates);
    const { toast } = useToast();

    const handleSave = (badgeId: string) => {
        const badge = badges.find(b => b.id === badgeId);
        toast({
            title: 'Changes Saved (Simulated)',
            description: `Rules for "${badge?.name}" would be updated in the database.`,
        });
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-8 animate-slide-in-from-bottom">
            <div className="text-center mb-12">
              <h1 className="text-2xl font-bold tracking-tight flex items-center justify-center gap-3">
                <Shield className="h-6 w-6" /> Badge Management
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
                This admin panel allows you to define the rules for how badges are awarded. Changes made here are for demonstration and are not yet connected to a live database.
              </p>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-lg shadow-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="p-6">Badge</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Rule</TableHead>
                            <TableHead className="w-[120px] text-right p-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {badges.map((badge) => (
                            <TableRow key={badge.id} className="[&_td]:!py-4">
                                <TableCell className="p-6">
                                    <div className="font-semibold">{badge.name}</div>
                                    <div className="text-xs text-muted-foreground">{badge.description}</div>
                                </TableCell>
                                <TableCell>
                                    <Select defaultValue={badge.level || 'Bronze'}>
                                        <SelectTrigger className="w-[120px] bg-background/50">
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Bronze">Bronze</SelectItem>
                                            <SelectItem value="Silver">Silver</SelectItem>
                                            <SelectItem value="Gold">Gold</SelectItem>
                                            <SelectItem value="Platinum">Platinum</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        defaultValue={badge.rule}
                                        placeholder="e.g., 'Complete 5 events'"
                                        className="bg-background/50"
                                    />
                                </TableCell>
                                <TableCell className="text-right p-6">
                                    <Button onClick={() => handleSave(badge.id)} size="sm">Save</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
