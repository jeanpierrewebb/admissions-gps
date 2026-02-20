import { NextRequest, NextResponse } from 'next/server';
import { searchColleges, searchByName } from '@/lib/college-scorecard';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const query = searchParams.get('q') || '';
  const states = searchParams.get('states')?.split(',').filter(Boolean) || [];
  const schoolType = searchParams.get('type')?.split(',').filter(Boolean) as ('Public' | 'Private')[] || [];
  const page = parseInt(searchParams.get('page') || '0');
  const perPage = parseInt(searchParams.get('perPage') || '20');

  try {
    // If just a simple name search
    if (query && states.length === 0 && schoolType.length === 0) {
      const colleges = await searchByName(query, perPage);
      return NextResponse.json({
        colleges,
        total: colleges.length,
        page: 0,
      });
    }

    // Full search with filters
    const result = await searchColleges({
      query: query || undefined,
      states: states.length > 0 ? states : undefined,
      schoolType: schoolType.length > 0 ? schoolType : undefined,
      page,
      perPage,
    });

    return NextResponse.json({
      colleges: result.colleges,
      total: result.total,
      page,
    });
  } catch (error) {
    console.error('School search error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Search failed' },
      { status: 500 }
    );
  }
}
