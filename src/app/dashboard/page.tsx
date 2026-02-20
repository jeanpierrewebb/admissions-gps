"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="font-bold text-xl">Admissions GPS</span>
          </div>
          <nav className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Welcome, Student!</span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Log out</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-slate-600">Class of 2026 • Junior Year</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Journey Progress" value="35%" subtitle="On track for junior year" />
          <StatCard title="Activities Logged" value="8" subtitle="Building your profile" />
          <StatCard title="Schools Researched" value="12" subtitle="4 reach, 5 match, 3 safety" />
          <StatCard title="Deadlines This Month" value="3" subtitle="Next: SAT registration" />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Journey Roadmap */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📅</span> Your Journey Roadmap
              </CardTitle>
              <CardDescription>Upcoming milestones for junior year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MilestoneItem
                  status="completed"
                  title="Set up account"
                  date="Completed"
                />
                <MilestoneItem
                  status="current"
                  title="Take PSAT / Practice ACT"
                  date="March 2026"
                />
                <MilestoneItem
                  status="upcoming"
                  title="Start building college list"
                  date="April 2026"
                />
                <MilestoneItem
                  status="upcoming"
                  title="Register for SAT/ACT"
                  date="April 2026"
                />
                <MilestoneItem
                  status="upcoming"
                  title="Plan summer activities"
                  date="May 2026"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚡</span> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <span className="mr-2">🎨</span> Log an Activity
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <Link href="/schools">
                  <span className="mr-2">🏫</span> Research Schools
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <span className="mr-2">📝</span> Start Essay Brainstorm
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <span className="mr-2">📊</span> View Full Timeline
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>🎨</span> Recent Activities
            </CardTitle>
            <CardDescription>Your extracurriculars and experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">No activities logged yet.</p>
              <Button>
                <span className="mr-2">+</span> Add Your First Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function MilestoneItem({ status, title, date }: { status: "completed" | "current" | "upcoming"; title: string; date: string }) {
  const icons = {
    completed: "✅",
    current: "🔵",
    upcoming: "⚪",
  };
  
  const styles = {
    completed: "text-slate-500 line-through",
    current: "text-blue-600 font-medium",
    upcoming: "text-slate-700",
  };

  return (
    <div className="flex items-center gap-3 py-2 border-b last:border-0">
      <span>{icons[status]}</span>
      <div className="flex-1">
        <p className={styles[status]}>{title}</p>
      </div>
      <span className="text-sm text-slate-400">{date}</span>
    </div>
  );
}
