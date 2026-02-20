"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface College {
  scorecardId: number;
  name: string;
  city: string;
  state: string;
  region: string;
  websiteUrl: string | null;
  locationType: string;
  schoolType: string;
  enrollmentSize: number;
  acceptanceRate: number | null;
  avgSAT: number | null;
  avgACT: number | null;
  estimatedCost: number | null;
  strongPrograms: string[];
  graduationRate: number | null;
}

export default function SchoolsPage() {
  const [query, setQuery] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await fetch(`/api/schools?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Search failed');
      }
      
      setColleges(data.colleges || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPercent = (value: number | null) => {
    if (value === null) return "N/A";
    return `${Math.round(value * 100)}%`;
  };

  const formatMoney = (value: number | null) => {
    if (value === null) return "N/A";
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value: number | null) => {
    if (value === null) return "N/A";
    return value.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="font-bold text-xl">Admissions GPS</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🏫 Research Schools</h1>
          <p className="text-slate-600">
            Search and explore colleges using real data from the U.S. Department of Education
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-4">
              <Input
                placeholder="Search by college name (e.g., Duke, Stanford, UNC)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
              {error.includes('API key') && (
                <p className="text-sm text-red-500 mt-2">
                  Get a free API key at{" "}
                  <a href="https://api.data.gov/signup/" target="_blank" rel="noopener noreferrer" className="underline">
                    api.data.gov/signup
                  </a>
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {searched && !loading && !error && (
          <div className="space-y-4">
            <p className="text-slate-600">
              {colleges.length === 0
                ? "No colleges found. Try a different search."
                : `Found ${colleges.length} college${colleges.length === 1 ? "" : "s"}`}
            </p>

            {colleges.map((college) => (
              <Card key={college.scorecardId} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{college.name}</CardTitle>
                      <CardDescription>
                        {college.city}, {college.state} • {college.region}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{college.schoolType}</Badge>
                      <Badge variant="secondary">{college.locationType}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-500">Acceptance Rate</p>
                      <p className="text-lg font-semibold">{formatPercent(college.acceptanceRate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Enrollment</p>
                      <p className="text-lg font-semibold">{formatNumber(college.enrollmentSize)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Avg SAT</p>
                      <p className="text-lg font-semibold">{formatNumber(college.avgSAT)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Est. Cost/Year</p>
                      <p className="text-lg font-semibold">{formatMoney(college.estimatedCost)}</p>
                    </div>
                  </div>

                  {college.strongPrograms.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-500 mb-2">Strong Programs</p>
                      <div className="flex flex-wrap gap-2">
                        {college.strongPrograms.map((program) => (
                          <Badge key={program} variant="outline" className="bg-blue-50">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    {college.websiteUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={college.websiteUrl.startsWith('http') ? college.websiteUrl : `https://${college.websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                        </a>
                      </Button>
                    )}
                    <Button size="sm">
                      Add to My List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!searched && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg text-slate-600 mb-2">Start your college search</p>
              <p className="text-slate-500">
                Search by name to explore colleges, compare stats, and build your list.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
