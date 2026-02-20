/**
 * College Scorecard API Types
 * Based on U.S. Department of Education's College Scorecard API
 * https://collegescorecard.ed.gov/data/documentation/
 */

export interface ScorecardAPIResponse {
  metadata: {
    total: number;
    page: number;
    per_page: number;
  };
  results: ScorecardSchool[];
}

export interface ScorecardSchool {
  id: number;
  'school.name': string;
  'school.city': string;
  'school.state': string;
  'school.zip': string;
  'school.school_url': string;
  'school.region_id': number;
  'school.locale': number;
  'school.ownership': number;
  'school.carnegie_basic': number | null;
  'latest.student.size': number | null;
  'latest.admissions.admission_rate.overall': number | null;
  'latest.admissions.sat_scores.average.overall': number | null;
  'latest.admissions.act_scores.midpoint.cumulative': number | null;
  'latest.cost.avg_net_price.overall': number | null;
  'latest.cost.tuition.in_state': number | null;
  'latest.cost.tuition.out_of_state': number | null;
  'latest.student.demographics.student_faculty_ratio': number | null;
  'latest.completion.rate_suppressed.overall': number | null;
  'latest.earnings.10_yrs_after_entry.median': number | null;
  'latest.academics.program_percentage.computer': number | null;
  'latest.academics.program_percentage.engineering': number | null;
  'latest.academics.program_percentage.business_marketing': number | null;
  'latest.academics.program_percentage.health': number | null;
  'latest.academics.program_percentage.biological': number | null;
}

export interface NormalizedCollege {
  scorecardId: number;
  name: string;
  city: string;
  state: string;
  region: string;
  websiteUrl: string | null;
  locationType: 'Urban' | 'Suburban' | 'Town' | 'Rural';
  schoolType: 'Public' | 'Private' | 'Private For-Profit';
  enrollmentSize: number;
  acceptanceRate: number | null;
  avgSAT: number | null;
  avgACT: number | null;
  estimatedCost: number | null;
  inStateTuition: number | null;
  outOfStateTuition: number | null;
  strongPrograms: string[];
  graduationRate: number | null;
  medianEarnings: number | null;
  studentFacultyRatio: number | null;
}

export interface SchoolSearchFilters {
  query?: string;
  states?: string[];
  minEnrollment?: number;
  maxEnrollment?: number;
  schoolType?: ('Public' | 'Private')[];
  page?: number;
  perPage?: number;
}

export const REGION_MAP: Record<number, string> = {
  1: 'New England',
  2: 'Mid East',
  3: 'Great Lakes',
  4: 'Plains',
  5: 'Southeast',
  6: 'Southwest',
  7: 'Rocky Mountains',
  8: 'Far West',
  9: 'Outlying Areas',
};

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];
