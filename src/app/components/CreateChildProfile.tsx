import { useState } from 'react';
import { Eye, EyeOff, X, Upload, Check, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const FF = 'DM Sans, sans-serif';

/* ══════════════════════════════════════════════
   PASSWORD STRENGTH INDICATOR
══════════════════════════════════════════════ */
function PasswordStrength({ password }: { password: string }) {
  const len = password.length;
  const strength = len === 0 ? 0 : len < 6 ? 1 : len < 8 ? 2 : len < 12 ? 3 : 4;
  const colors = ['#E2E8F0', '#EF4444', '#F59E0B', '#4F46E5', '#10B981'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  if (strength === 0) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i <= strength ? colors[strength] : '#E2E8F0',
            transition: 'background 0.2s',
          }}
        />
      ))}
      <span
        style={{
          fontSize: 11,
          color: colors[strength],
          fontWeight: 500,
          fontFamily: FF,
          whiteSpace: 'nowrap',
        }}
      >
        {labels[strength]}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CREATE CHILD PROFILE PAGE

   STATE 1: First child (onboarding flow)
   STATE 2: Adding child 2–4 (from dashboard)
   STATE 3: Adding child 5 of 5 (final slot)
══════════════════════════════════════════════ */
export function CreateChildProfile() {
  const [searchParams] = useSearchParams();
  const childNumber = parseInt(searchParams.get('childNumber') || '1', 10);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [schoolYear, setSchoolYear] = useState('');
  const [region, setRegion] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  // Determine state
  const isFirstChild = childNumber === 1;
  const isLastChild = childNumber === 5;
  const isFromDashboard = childNumber > 1;

  // Simulate username availability check
  const checkUsername = (value: string) => {
    if (value.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);
    setTimeout(() => {
      setUsernameAvailable(value !== 'emma' && value !== 'test');
      setCheckingUsername(false);
    }, 500);
  };

  const generateUsername = () => {
    const name = fullName.split(' ')[0]?.toLowerCase() || 'user';
    const generated = `${name}_${Math.floor(1000 + Math.random() * 9000)}`;
    setUsername(generated);
    checkUsername(generated);
  };

  const isFormValid =
    fullName.trim() !== '' &&
    username.trim() !== '' &&
    usernameAvailable === true &&
    password.length >= 8 &&
    schoolYear !== '' &&
    region !== '';

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

          {/* Centre: Stepper (STATE 1) or Breadcrumb (STATE 2-3) */}
          {isFirstChild ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                  1
                </div>
                <span style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>
                  Add Child
                </span>
              </div>
              <div
                style={{
                  width: 32,
                  height: 2,
                  background: '#E2E8F0',
                  borderRadius: 1,
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  2
                </div>
                <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 500 }}>
                  Choose Schools
                </span>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 14, color: '#64748B' }}>
              <Link to="/parent" style={{ color: '#64748B', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <span style={{ margin: '0 8px' }}>›</span>
              <span style={{ color: '#1E293B', fontWeight: 500 }}>Add Child</span>
            </div>
          )}

          {/* Right: Child Counter + Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                background: isLastChild ? '#FEF3C7' : '#F1F5F9',
                border: `1px solid ${isLastChild ? '#FDE68A' : '#E2E8F0'}`,
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 500,
                color: isLastChild ? '#92400E' : '#64748B',
              }}
            >
              Child {childNumber} of 5{isLastChild ? ' ⚠' : ''}
            </div>
            <Link
              to={isFirstChild ? '/login' : '/parent'}
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
        </div>
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Title Block */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#1E293B',
                marginBottom: 12,
              }}
            >
              {isFirstChild
                ? "Set up your first child's profile"
                : isLastChild
                ? 'Add your last child'
                : 'Add another child'}
            </h2>
            <p style={{ fontSize: 16, color: '#475569', marginBottom: 8 }}>
              {isFirstChild
                ? "We'll use this to build a personalised learning path."
                : isLastChild
                ? ''
                : 'Each child gets their own learning path and progress.'}
            </p>
            {isLastChild && (
              <div
                style={{
                  display: 'inline-block',
                  background: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  borderRadius: 8,
                  padding: '10px 16px',
                  marginBottom: 8,
                }}
              >
                <p style={{ fontSize: 14, color: '#92400E', fontWeight: 500 }}>
                  ⚠ This is your 5th and final child profile (you can manage profiles anytime in settings).
                </p>
              </div>
            )}
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 12 }}>
              This helps us personalise your child's learning path from day one.
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
              }}
            >
              <span style={{ fontSize: 12, color: '#4F46E5', fontWeight: 500 }}>
                Takes less than 1 minute
              </span>
            </div>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 12,
              padding: 40,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {/* Child Information */}
            <div style={{ marginBottom: 32 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#94A3B8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                Child Information
              </p>

              {/* Full Name */}
              <div style={{ marginBottom: 20 }}>
                <Label
                  htmlFor="fullname"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 7,
                  }}
                >
                  Full Name <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="e.g. Emma Thompson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoFocus
                  className="h-12 rounded-[8px] border-[#E2E8F0] text-[#1E293B] placeholder:text-[#CBD5E1] focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
                />
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
                  First and last name
                </p>
              </div>

              {/* Username */}
              <div style={{ marginBottom: 20 }}>
                <Label
                  htmlFor="username"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 7,
                  }}
                >
                  Username <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    id="username"
                    type="text"
                    placeholder="e.g. emma_t"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      checkUsername(e.target.value);
                    }}
                    className="h-12 rounded-[8px] border-[#E2E8F0] text-[#1E293B] placeholder:text-[#CBD5E1] pr-24 focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
                  />
                  {checkingUsername && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <Loader2
                        size={16}
                        style={{ color: '#94A3B8' }}
                        className="animate-spin"
                      />
                    </div>
                  )}
                  {!checkingUsername && usernameAvailable === true && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Check size={14} style={{ color: '#10B981' }} />
                      <span
                        style={{
                          fontSize: 12,
                          color: '#10B981',
                          fontWeight: 500,
                        }}
                      >
                        Available
                      </span>
                    </div>
                  )}
                  {!checkingUsername && usernameAvailable === false && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <X size={14} style={{ color: '#EF4444' }} />
                      <span
                        style={{
                          fontSize: 12,
                          color: '#EF4444',
                          fontWeight: 500,
                        }}
                      >
                        Taken
                      </span>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 6,
                  }}
                >
                  <p style={{ fontSize: 12, color: '#64748B' }}>
                    {fullName.trim()
                      ? `These details are for ${fullName.split(' ')[0]} to log in and practise`
                      : 'These details are for your child to log in and practise'}
                  </p>
                  <button
                    type="button"
                    onClick={generateUsername}
                    style={{
                      fontSize: 12,
                      color: '#4F46E5',
                      fontWeight: 500,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Generate for me
                  </button>
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 20 }}>
                <Label
                  htmlFor="password"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 7,
                  }}
                >
                  Password <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-[8px] border-[#E2E8F0] text-[#1E293B] placeholder:text-[#CBD5E1] pr-12 focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0,
                    }}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
                  {fullName.trim()
                    ? `Used by ${fullName.split(' ')[0]} to log in. You can reset anytime. Min 8 characters.`
                    : 'Used by your child to log in. You can reset anytime. Min 8 characters.'}
                </p>
                <PasswordStrength password={password} />
              </div>

              {/* School Year */}
              <div style={{ marginBottom: 20 }}>
                <Label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 7,
                  }}
                >
                  School Year <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Year 4', 'Year 5', 'Year 6'].map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setSchoolYear(year)}
                      style={{
                        flex: 1,
                        height: 44,
                        border: `2px solid ${
                          schoolYear === year ? '#4F46E5' : '#E2E8F0'
                        }`,
                        borderRadius: 8,
                        background: schoolYear === year ? '#4F46E5' : '#FFFFFF',
                        color: schoolYear === year ? '#FFFFFF' : '#475569',
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: FF,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
                  Most students start in Year 4 or Year 5
                </p>
              </div>

              {/* Region */}
              <div style={{ marginBottom: 0 }}>
                <Label
                  htmlFor="region"
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 7,
                  }}
                >
                  Region <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '0 16px',
                    border: '1px solid #E2E8F0',
                    borderRadius: 8,
                    fontSize: 15,
                    color: region ? '#1E293B' : '#CBD5E1',
                    fontFamily: FF,
                    background: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                  className="focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)] focus:outline-none"
                >
                  <option value="">Select region</option>
                  <option value="kent">Kent</option>
                  <option value="gloucestershire">Gloucestershire</option>
                  <option value="buckinghamshire">Buckinghamshire</option>
                  <option value="birmingham">Birmingham</option>
                  <option value="lincolnshire">Lincolnshire</option>
                  <option value="trafford">Trafford</option>
                  <option value="wiltshire">Wiltshire</option>
                  <option value="other">Other</option>
                </select>
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
                  Choose where your target schools are located
                </p>
              </div>
            </div>

            {/* Optional Section */}
            <div
              style={{
                borderTop: '1px solid #F1F5F9',
                paddingTop: 32,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#94A3B8',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                Optional
              </p>

              {/* Profile Photo */}
              <div>
                <Label
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#374151',
                    display: 'block',
                    marginBottom: 7,
                  }}
                >
                  Profile Photo
                </Label>
                <div
                  style={{
                    border: '2px dashed #C7D2FE',
                    borderRadius: 8,
                    padding: 32,
                    textAlign: 'center',
                    background: '#FAFBFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4F46E5';
                    e.currentTarget.style.background = '#EEF2FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#C7D2FE';
                    e.currentTarget.style.background = '#FAFBFF';
                  }}
                >
                  <Upload size={24} style={{ color: '#4F46E5', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 14, color: '#475569', marginBottom: 4 }}>
                    Upload a photo or drag and drop
                  </p>
                  <p style={{ fontSize: 12, color: '#94A3B8' }}>
                    JPG or PNG, max 5MB
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 6,
                  }}
                >
                  <p style={{ fontSize: 12, color: '#64748B' }}>
                    {fullName.trim()
                      ? `Add a photo so ${fullName.split(' ')[0]} recognises their account`
                      : 'Add a photo so your child recognises their account'}
                  </p>
                  <button
                    type="button"
                    style={{
                      fontSize: 12,
                      color: '#4F46E5',
                      fontWeight: 500,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Skip for now
                  </button>
                </div>
                <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>
                  A friendly avatar is used if skipped
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 32,
            }}
          >
            <Link to={isFirstChild ? '/login' : '/parent'}>
              <Button
                variant="ghost"
                style={{
                  color: '#64748B',
                  fontSize: 15,
                }}
              >
                {isFirstChild ? '← Back' : 'Cancel'}
              </Button>
            </Link>
            <Link to={isLastChild ? '/parent' : '/onboarding/select-schools'}>
              <Button
                disabled={!isFormValid}
                style={{
                  background: isFormValid ? '#4F46E5' : '#E2E8F0',
                  color: isFormValid ? '#FFFFFF' : '#94A3B8',
                  height: 48,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
                className={isFormValid ? 'hover:bg-[#4338CA]' : ''}
              >
                {isFirstChild
                  ? 'Continue to choose schools →'
                  : isLastChild
                  ? 'Save profile →'
                  : 'Save & choose schools →'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
