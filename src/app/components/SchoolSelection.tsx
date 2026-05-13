import { useState } from 'react';
import { X, Search, Check, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';

const FF = 'DM Sans, sans-serif';

interface School {
  id: string;
  name: string;
  location: string;
  gender: 'Boys' | 'Girls' | 'Co-ed';
  examBoard: 'GL Assessment' | 'CEM' | 'ISEB' | 'Kent Test';
  region: string;
  popular?: boolean;
}

const SCHOOLS: School[] = [
  { id: '1', name: 'Tonbridge Grammar School', location: 'Tonbridge, Kent', gender: 'Boys', examBoard: 'GL Assessment', region: 'kent', popular: true },
  { id: '2', name: 'The Judd School', location: 'Tonbridge, Kent', gender: 'Boys', examBoard: 'GL Assessment', region: 'kent', popular: true },
  { id: '3', name: 'Invicta Grammar School', location: 'Maidstone, Kent', gender: 'Girls', examBoard: 'GL Assessment', region: 'kent', popular: true },
  { id: '4', name: 'Dartford Grammar School', location: 'Dartford, Kent', gender: 'Boys', examBoard: 'GL Assessment', region: 'kent' },
  { id: '5', name: 'Weald of Kent Grammar School', location: 'Tonbridge, Kent', gender: 'Girls', examBoard: 'Kent Test', region: 'kent' },
  { id: '6', name: 'Simon Langton Grammar School for Boys', location: 'Canterbury, Kent', gender: 'Boys', examBoard: 'Kent Test', region: 'kent', popular: true },
  { id: '7', name: "King Edward's School", location: 'Birmingham', gender: 'Boys', examBoard: 'ISEB', region: 'birmingham' },
  { id: '8', name: "Withington Girls' School", location: 'Manchester', gender: 'Girls', examBoard: 'CEM', region: 'other' },
  { id: '9', name: 'Reading School', location: 'Reading, Berkshire', gender: 'Boys', examBoard: 'GL Assessment', region: 'other' },
  { id: '10', name: 'Henrietta Barnett School', location: 'London', gender: 'Girls', examBoard: 'GL Assessment', region: 'other', popular: true },
];

const EXAM_BOARD_COLORS: Record<string, { bg: string; text: string }> = {
  'GL Assessment': { bg: '#EEF2FF', text: '#4F46E5' },
  'CEM': { bg: '#FEF3C7', text: '#92400E' },
  'ISEB': { bg: '#D1FAE5', text: '#065F46' },
  'Kent Test': { bg: '#FEE2E2', text: '#991B1B' },
};

export function SchoolSelection() {
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const addSchool = (school: School) => {
    if (selectedSchools.length < 4 && !selectedSchools.find(s => s.id === school.id)) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  const removeSchool = (schoolId: string) => {
    setSelectedSchools(selectedSchools.filter(s => s.id !== schoolId));
  };

  const isSchoolSelected = (schoolId: string) => {
    return selectedSchools.some(s => s.id === schoolId);
  };

  // Filter and sort schools
  let filteredSchools = SCHOOLS.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !regionFilter || school.region === regionFilter;
    const matchesGender = !genderFilter || school.gender === genderFilter;
    return matchesSearch && matchesRegion && matchesGender;
  });

  if (sortBy === 'popular') {
    filteredSchools = filteredSchools.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  } else if (sortBy === 'az') {
    filteredSchools = filteredSchools.sort((a, b) => a.name.localeCompare(b.name));
  }

  const selectionProgress = (selectedSchools.length / 4) * 100;
  const canContinue = selectedSchools.length >= 1;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F8FAFC',
        fontFamily: FF,
      }}
    >
      {/* ═══ MINIMAL HEADER ═══ */}
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '20px 0',
        }}
      >
        <div
          className="max-w-[1280px] mx-auto px-8"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '2px dashed #C7D2FE',
                background: '#EEF2FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 8,
                  color: '#94A3B8',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                LOGO
              </span>
            </div>
            <span style={{ color: '#1E293B', fontSize: 16, fontWeight: 600 }}>
              Kyros
            </span>
          </Link>

          {/* Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                <Check size={14} strokeWidth={3} />
              </div>
              <span style={{ fontSize: 14, color: '#10B981', fontWeight: 500 }}>
                Create Profile
              </span>
            </div>
            <div
              style={{
                width: 32,
                height: 2,
                background: '#10B981',
                borderRadius: 1,
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#4F46E5',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                2
              </div>
              <span style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>
                Choose Schools
              </span>
            </div>
          </div>

          {/* Close */}
          <Link
            to="/parent"
            style={{
              color: '#94A3B8',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            <X size={20} />
          </Link>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Title Block */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#1E293B',
                marginBottom: 12,
              }}
            >
              Select Target Schools for Emma
            </h2>
            <p style={{ fontSize: 16, color: '#475569', marginBottom: 8 }}>
              Choose up to 4 grammar schools Emma is applying to.
            </p>
            <p style={{ fontSize: 15, color: '#64748B' }}>
              We tailor practice, difficulty, and mock exams based on each school's format.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#EEF2FF',
                border: '1px solid #C7D2FE',
                borderRadius: 20,
                padding: '4px 12px',
                marginTop: 12,
              }}
            >
              <Info size={12} style={{ color: '#4F46E5' }} />
              <span style={{ fontSize: 12, color: '#4F46E5', fontWeight: 500 }}>
                Select at least 1 school (you can update later)
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 12,
              padding: 20,
              marginBottom: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 12 }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                  }}
                />
                <Input
                  type="text"
                  placeholder="Search by school name or town..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    height: 44,
                    paddingLeft: 40,
                    border: '1px solid #E2E8F0',
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                  className="focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
                />
              </div>

              {/* Region */}
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                style={{
                  height: 44,
                  padding: '0 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  fontSize: 14,
                  color: regionFilter ? '#1E293B' : '#94A3B8',
                  fontFamily: FF,
                  background: '#FFFFFF',
                  cursor: 'pointer',
                }}
                className="focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)] focus:outline-none"
              >
                <option value="">All Regions</option>
                <option value="kent">Kent</option>
                <option value="birmingham">Birmingham</option>
                <option value="other">Other</option>
              </select>

              {/* Gender */}
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                style={{
                  height: 44,
                  padding: '0 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  fontSize: 14,
                  color: genderFilter ? '#1E293B' : '#94A3B8',
                  fontFamily: FF,
                  background: '#FFFFFF',
                  cursor: 'pointer',
                }}
                className="focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)] focus:outline-none"
              >
                <option value="">All Genders</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  height: 44,
                  padding: '0 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  fontSize: 14,
                  color: '#1E293B',
                  fontFamily: FF,
                  background: '#FFFFFF',
                  cursor: 'pointer',
                }}
                className="focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)] focus:outline-none"
              >
                <option value="popular">Popular</option>
                <option value="az">A–Z</option>
              </select>
            </div>
          </div>

          {/* Selected Schools */}
          {selectedSchools.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#1E293B',
                      marginBottom: 4,
                    }}
                  >
                    Selected Schools
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748B' }}>
                    {selectedSchools.length} of 4 selected
                  </p>
                </div>
                <div style={{ fontSize: 12, color: '#4F46E5', fontWeight: 500 }}>
                  We'll personalise practice for these schools
                </div>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: 6,
                  background: '#E2E8F0',
                  borderRadius: 3,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: `${selectionProgress}%`,
                    height: '100%',
                    background: '#4F46E5',
                    borderRadius: 3,
                    transition: 'width 0.3s',
                  }}
                />
              </div>

              {/* Selected Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {selectedSchools.map((school) => (
                  <div
                    key={school.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderLeft: '4px solid #4F46E5',
                      borderRadius: 8,
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={12} style={{ color: '#FFFFFF' }} strokeWidth={3} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', marginBottom: 4 }}>
                          {school.name}
                        </h4>
                        <p style={{ fontSize: 13, color: '#64748B' }}>
                          {school.location} · {school.gender} · {school.examBoard}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSchool(school.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: 4,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Schools */}
          <div>
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#1E293B',
                marginBottom: 16,
              }}
            >
              Available Schools
            </h3>

            <div
              style={{
                maxHeight: 500,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {filteredSchools.map((school) => {
                const isSelected = isSchoolSelected(school.id);
                const isFull = selectedSchools.length >= 4;
                const examBoardStyle = EXAM_BOARD_COLORS[school.examBoard];

                return (
                  <div
                    key={school.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: 8,
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <h4 style={{ fontSize: 15, fontWeight: 600, color: '#1E293B' }}>
                          {school.name}
                        </h4>
                        {school.popular && (
                          <span
                            style={{
                              background: '#FEF3C7',
                              color: '#92400E',
                              fontSize: 10,
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: 12,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            Popular
                          </span>
                        )}
                        <span
                          style={{
                            background: examBoardStyle.bg,
                            color: examBoardStyle.text,
                            fontSize: 11,
                            fontWeight: 600,
                            padding: '3px 10px',
                            borderRadius: 12,
                          }}
                        >
                          {school.examBoard}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>
                        {school.location} · {school.gender}
                      </p>
                      <a
                        href="#"
                        style={{
                          fontSize: 12,
                          color: '#4F46E5',
                          fontWeight: 500,
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                      >
                        View exam format →
                      </a>
                    </div>

                    <div>
                      {isSelected ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            color: '#10B981',
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                        >
                          <Check size={16} strokeWidth={2.5} />
                          Added
                        </div>
                      ) : (
                        <Button
                          onClick={() => addSchool(school)}
                          disabled={isFull}
                          style={{
                            background: isFull ? '#F1F5F9' : '#FFFFFF',
                            border: `1px solid ${isFull ? '#E2E8F0' : '#4F46E5'}`,
                            color: isFull ? '#94A3B8' : '#4F46E5',
                            height: 36,
                            paddingLeft: 16,
                            paddingRight: 16,
                            borderRadius: 6,
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: isFull ? 'not-allowed' : 'pointer',
                          }}
                          className={!isFull ? 'hover:bg-[#EEF2FF]' : ''}
                        >
                          + Add
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Empty State */}
          {selectedSchools.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: 32,
                background: '#EEF2FF',
                border: '1px solid #C7D2FE',
                borderRadius: 12,
                marginTop: 24,
              }}
            >
              <p style={{ fontSize: 15, color: '#4F46E5', fontWeight: 500 }}>
                Select at least 1 school to continue
              </p>
            </div>
          )}

          {/* Navigation */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 32,
            }}
          >
            <Link to="/onboarding/create-child">
              <Button
                variant="ghost"
                style={{
                  color: '#64748B',
                  fontSize: 15,
                }}
              >
                ← Back
              </Button>
            </Link>
            <Link to="/parent" style={{ pointerEvents: canContinue ? 'auto' : 'none' }}>
              <Button
                disabled={!canContinue}
                style={{
                  background: canContinue ? '#4F46E5' : '#E2E8F0',
                  color: canContinue ? '#FFFFFF' : '#94A3B8',
                  height: 48,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: canContinue ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
                className={canContinue ? 'hover:bg-[#4338CA]' : ''}
              >
                Continue to dashboard →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
