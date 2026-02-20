/**
 * College Scorecard API Client
 * Fetches real college data from the U.S. Department of Education
 * 
 * Get a FREE API key at: https://api.data.gov/signup/
 */

import type {
  ScorecardAPIResponse,
  ScorecardSchool,
  NormalizedCollege,
  SchoolSearchFilters,
} from './types/scorecard-types';
import { REGION_MAP } from './types/scorecard-types';

const API_BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';

const REQUESTED_FIELDS = [
  'id',
  'school.name',
  'school.city',
  'school.state',
  'school.zip',
  'school.school_url',
  'school.region_id',
  'school.locale',
  'school.ownership',
  'school.carnegie_basic',
  'latest.student.size',
  'latest.admissions.admission_rate.overall',
  'latest.admissions.sat_scores.average.overall',
  'latest.admissions.act_scores.midpoint.cumulative',
  'latest.cost.avg_net_price.overall',
  'latest.cost.tuition.in_state',
  'latest.cost.tuition.out_of_state',
  'latest.student.demographics.student_faculty_ratio',
  'latest.completion.rate_suppressed.overall',
  'latest.earnings.10_yrs_after_entry.median',
  'latest.academics.program_percentage.computer',
  'latest.academics.program_percentage.engineering',
  'latest.academics.program_percentage.business_marketing',
  'latest.academics.program_percentage.health',
  'latest.academics.program_percentage.biological',
].join(',');

function getApiKey(): string {
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
  if (!apiKey || apiKey === 'your-api-key-here') {
    throw new Error(
      'COLLEGE_SCORECARD_API_KEY is not set. Get a free key at https://api.data.gov/signup/'
    );
  }
  return apiKey;
}

/**
 * Search colleges by name
 */
export async function searchByName(name: string, limit: number = 20): Promise<NormalizedCollege[]> {
  const apiKey = getApiKey();

  const params = new URLSearchParams();
  params.set('api_key', apiKey);
  params.set('fields', REQUESTED_FIELDS);
  params.set('school.name', name);
  params.set('per_page', String(limit));
  params.set('school.carnegie_basic__range', '14..23'); // 4-year colleges only

  const url = `${API_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: ScorecardAPIResponse = await response.json();
  return data.results
    .map(normalizeSchool)
    .filter((school): school is NormalizedCollege => school !== null);
}

/**
 * Search colleges with filters
 */
export async function searchColleges(filters: SchoolSearchFilters): Promise<{
  colleges: NormalizedCollege[];
  total: number;
}> {
  const apiKey = getApiKey();

  const params = new URLSearchParams();
  params.set('api_key', apiKey);
  params.set('fields', REQUESTED_FIELDS);
  params.set('per_page', String(filters.perPage || 20));
  params.set('page', String(filters.page || 0));
  params.set('school.carnegie_basic__range', '14..23');

  // Name search
  if (filters.query) {
    params.set('school.name', filters.query);
  }

  // State filter
  if (filters.states && filters.states.length > 0) {
    params.set('school.state', filters.states.join(','));
  }

  // Size filter
  if (filters.minEnrollment !== undefined || filters.maxEnrollment !== undefined) {
    const min = filters.minEnrollment || 0;
    const max = filters.maxEnrollment || 100000;
    params.set('latest.student.size__range', `${min}..${max}`);
  }

  // School type filter
  if (filters.schoolType && filters.schoolType.length > 0) {
    const ownership = filters.schoolType.map(t => t === 'Public' ? 1 : 2);
    params.set('school.ownership', ownership.join(','));
  }

  const url = `${API_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.text();
    console.error('Scorecard API error:', error);
    throw new Error(`API error: ${response.status}`);
  }

  const data: ScorecardAPIResponse = await response.json();
  
  const colleges = data.results
    .map(normalizeSchool)
    .filter((school): school is NormalizedCollege => school !== null);

  return {
    colleges,
    total: data.metadata.total,
  };
}

/**
 * Get a specific college by Scorecard ID
 */
export async function getCollegeById(scorecardId: number): Promise<NormalizedCollege | null> {
  const apiKey = getApiKey();

  const params = new URLSearchParams();
  params.set('api_key', apiKey);
  params.set('fields', REQUESTED_FIELDS);
  params.set('id', String(scorecardId));

  const url = `${API_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) return null;

  const data: ScorecardAPIResponse = await response.json();
  if (data.results.length === 0) return null;

  return normalizeSchool(data.results[0]);
}

/**
 * Normalize raw Scorecard data to our application format
 */
function normalizeSchool(raw: ScorecardSchool): NormalizedCollege | null {
  const enrollment = raw['latest.student.size'];
  if (!enrollment || enrollment < 100) return null;

  const name = raw['school.name'];
  if (!name) return null;

  // Determine location type
  const locale = raw['school.locale'];
  let locationType: 'Urban' | 'Suburban' | 'Town' | 'Rural' = 'Suburban';
  if (locale >= 11 && locale <= 13) locationType = 'Urban';
  else if (locale >= 21 && locale <= 23) locationType = 'Suburban';
  else if (locale >= 31 && locale <= 33) locationType = 'Town';
  else if (locale >= 41 && locale <= 43) locationType = 'Rural';

  // Determine school type
  const ownership = raw['school.ownership'];
  let schoolType: 'Public' | 'Private' | 'Private For-Profit' = 'Private';
  if (ownership === 1) schoolType = 'Public';
  else if (ownership === 2) schoolType = 'Private';
  else if (ownership === 3) schoolType = 'Private For-Profit';

  // Get region name
  const regionId = raw['school.region_id'];
  const region = REGION_MAP[regionId] || 'Unknown';

  // Identify strong programs (> 10% of students)
  const strongPrograms: string[] = [];
  const threshold = 0.10;
  if ((raw['latest.academics.program_percentage.computer'] || 0) > threshold) strongPrograms.push('Computer Science');
  if ((raw['latest.academics.program_percentage.engineering'] || 0) > threshold) strongPrograms.push('Engineering');
  if ((raw['latest.academics.program_percentage.business_marketing'] || 0) > threshold) strongPrograms.push('Business');
  if ((raw['latest.academics.program_percentage.health'] || 0) > threshold) strongPrograms.push('Health Sciences');
  if ((raw['latest.academics.program_percentage.biological'] || 0) > threshold) strongPrograms.push('Biology');

  return {
    scorecardId: raw.id,
    name,
    city: raw['school.city'] || '',
    state: raw['school.state'] || '',
    region,
    websiteUrl: raw['school.school_url'] || null,
    locationType,
    schoolType,
    enrollmentSize: enrollment,
    acceptanceRate: raw['latest.admissions.admission_rate.overall'],
    avgSAT: raw['latest.admissions.sat_scores.average.overall'],
    avgACT: raw['latest.admissions.act_scores.midpoint.cumulative'],
    estimatedCost: raw['latest.cost.avg_net_price.overall'],
    inStateTuition: raw['latest.cost.tuition.in_state'],
    outOfStateTuition: raw['latest.cost.tuition.out_of_state'],
    strongPrograms,
    graduationRate: raw['latest.completion.rate_suppressed.overall'],
    medianEarnings: raw['latest.earnings.10_yrs_after_entry.median'],
    studentFacultyRatio: raw['latest.student.demographics.student_faculty_ratio'],
  };
}
