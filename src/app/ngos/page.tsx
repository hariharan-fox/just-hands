import { allNgos } from "@/lib/placeholder-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NgoCard from "@/components/shared/ngo-card";

export default function NgosPage() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Meet the Change-Makers</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Discover and connect with organizations dedicated to creating a positive impact.
          </p>
        </div>

        <div className="mb-8 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for NGOs by name or cause..." className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allNgos.map((ngo) => (
            <NgoCard key={ngo.id} ngo={ngo} />
          ))}
        </div>
      </div>
    </div>
  );
}
