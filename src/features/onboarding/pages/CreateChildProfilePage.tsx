import { useState } from 'react';
import { Check, Eye, EyeOff, Loader2, Upload, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';
import { Label } from '../../../app/components/ui/label';
import { CHILD_PROFILE_LIMIT } from '../../../shared/constants/limits';
import { createChildProfileContent as c } from '../content';
import { PasswordStrength } from '../components/PasswordStrength';

export function CreateChildProfilePage() {
  const [searchParams] = useSearchParams();
  const childNumber = parseInt(searchParams.get('childNumber') || '1', 10);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [schoolYear, setSchoolYear] = useState('');
  const [region, setRegion] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const isFirstChild = childNumber === 1;
  const isLastChild = childNumber === CHILD_PROFILE_LIMIT;
  const firstName = fullName.trim() ? fullName.split(' ')[0] : '';

  function checkUsername(value: string) {
    if (value.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);
    setTimeout(() => {
      setUsernameAvailable(value !== 'emma' && value !== 'test');
      setCheckingUsername(false);
    }, 500);
  }

  function generateUsername() {
    const name = firstName.toLowerCase() || 'user';
    const generated = `${name}_${Math.floor(1000 + Math.random() * 9000)}`;
    setUsername(generated);
    checkUsername(generated);
  }

  const isFormValid =
    fullName.trim() !== '' &&
    username.trim() !== '' &&
    usernameAvailable === true &&
    password.length >= 8 &&
    schoolYear !== '' &&
    region !== '';

  const pageTitle = isFirstChild
    ? c.titles.firstChild
    : isLastChild
    ? c.titles.lastChild
    : c.titles.otherChild;

  const pageSubtitle = isFirstChild
    ? c.subtitles.firstChild
    : isLastChild
    ? ''
    : c.subtitles.otherChild;

  const ctaLabel = isFirstChild
    ? c.navigation.continueFirstChild
    : isLastChild
    ? c.navigation.saveLast
    : c.navigation.saveOther;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-subtle)' }}>
      {/* HEADER */}
      <header
        style={{
          background: 'var(--surface-raised)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '20px 0',
        }}
      >
        <div
          className="max-w-[1280px] mx-auto px-4 lg:px-8"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '2px dashed var(--brand-muted)',
                background: 'var(--brand-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 8, color: 'var(--text-subtle)', fontWeight: 500, letterSpacing: '0.05em' }}>
                {c.logoLabel}
              </span>
            </div>
            <span style={{ color: 'var(--text-heading)', fontSize: 16, fontWeight: 600 }}>{c.brandName}</span>
          </Link>

          {isFirstChild ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'var(--brand)',
                    color: 'var(--brand-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  1
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-heading)', fontWeight: 500 }}>
                  {c.stepper.step1Label}
                </span>
              </div>
              <div style={{ width: 32, height: 2, background: 'var(--border-subtle)', borderRadius: 1 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid var(--border-subtle)',
                    background: 'var(--surface-raised)',
                    color: 'var(--text-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  2
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-subtle)', fontWeight: 500 }}>
                  {c.stepper.step2Label}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
              <Link to="/parent" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                {c.breadcrumb.dashboardLabel}
              </Link>
              <span style={{ margin: '0 8px' }}>›</span>
              <span style={{ color: 'var(--text-heading)', fontWeight: 500 }}>{c.breadcrumb.addChildLabel}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                background: isLastChild ? 'var(--warning-subtle)' : 'var(--surface-muted)',
                border: `1px solid ${isLastChild ? 'var(--warning)' : 'var(--border-subtle)'}`,
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 500,
                color: isLastChild ? 'var(--warning-foreground)' : 'var(--text-muted)',
              }}
            >
              {c.childCounter.prefix} {childNumber} {c.childCounter.suffix}
              {isLastChild ? ` ${c.childCounter.lastWarning}` : ''}
            </div>
            <Link
              to={isFirstChild ? '/login' : '/parent'}
              style={{ color: 'var(--text-subtle)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}
            >
              <X size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Title Block */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 12 }}>
              {pageTitle}
            </h2>
            {pageSubtitle && (
              <p style={{ fontSize: 16, color: 'var(--text-body)', marginBottom: 8 }}>{pageSubtitle}</p>
            )}
            {isLastChild && (
              <div
                style={{
                  display: 'inline-block',
                  background: 'var(--warning-subtle)',
                  border: '1px solid var(--warning)',
                  borderRadius: 8,
                  padding: '10px 16px',
                  marginBottom: 8,
                }}
              >
                <p style={{ fontSize: 14, color: 'var(--warning-foreground)', fontWeight: 500 }}>
                  {c.lastChildWarning}
                </p>
              </div>
            )}
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 12 }}>{c.personaliseNote}</p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--brand-subtle)',
                border: '1px solid var(--brand-muted)',
                borderRadius: 20,
                padding: '4px 12px',
              }}
            >
              <span style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 500 }}>{c.timeNote}</span>
            </div>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 12,
              padding: 40,
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            {/* Child Information */}
            <div style={{ marginBottom: 32 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-subtle)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                {c.childInfoLabel}
              </p>

              {/* Full Name */}
              <div style={{ marginBottom: 20 }}>
                <Label htmlFor="fullname" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
                  {c.fields.fullName.label} <span style={{ color: 'var(--danger)' }}>*</span>
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder={c.fields.fullName.placeholder}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoFocus
                  className="h-12 rounded-[8px] border-border-subtle text-text-heading placeholder:text-text-subtle focus:border-brand focus:ring-[3px] focus:ring-brand/12"
                />
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{c.fields.fullName.helper}</p>
              </div>

              {/* Username */}
              <div style={{ marginBottom: 20 }}>
                <Label htmlFor="username" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
                  {c.fields.username.label} <span style={{ color: 'var(--danger)' }}>*</span>
                </Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    id="username"
                    type="text"
                    placeholder={c.fields.username.placeholder}
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); checkUsername(e.target.value); }}
                    className="h-12 rounded-[8px] border-border-subtle text-text-heading placeholder:text-text-subtle pr-24 focus:border-brand focus:ring-[3px] focus:ring-brand/12"
                  />
                  {checkingUsername && (
                    <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
                      <Loader2 size={16} style={{ color: 'var(--text-subtle)' }} className="animate-spin" />
                    </div>
                  )}
                  {!checkingUsername && usernameAvailable === true && (
                    <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Check size={14} style={{ color: 'var(--success)' }} />
                      <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 500 }}>{c.fields.username.availableText}</span>
                    </div>
                  )}
                  {!checkingUsername && usernameAvailable === false && (
                    <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <X size={14} style={{ color: 'var(--danger)' }} />
                      <span style={{ fontSize: 12, color: 'var(--danger)', fontWeight: 500 }}>{c.fields.username.takenText}</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {firstName
                      ? `${c.fields.username.helperPrefix} ${firstName} ${c.fields.username.helperSuffix}`
                      : c.fields.username.helperFallback}
                  </p>
                  <button
                    type="button"
                    onClick={generateUsername}
                    style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', whiteSpace: 'nowrap' }}
                  >
                    {c.fields.username.generateLabel}
                  </button>
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 20 }}>
                <Label htmlFor="password" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
                  {c.fields.password.label} <span style={{ color: 'var(--danger)' }}>*</span>
                </Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={c.fields.password.placeholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-[8px] border-border-subtle text-text-heading placeholder:text-text-subtle pr-12 focus:border-brand focus:ring-[3px] focus:ring-brand/12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', padding: 0 }}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  {firstName
                    ? `${c.fields.password.helperPrefix} ${firstName} ${c.fields.password.helperSuffix}`
                    : c.fields.password.helperFallback}
                </p>
                <PasswordStrength password={password} />
              </div>

              {/* School Year */}
              <div style={{ marginBottom: 20 }}>
                <Label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
                  {c.fields.schoolYear.label} <span style={{ color: 'var(--danger)' }}>*</span>
                </Label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {c.fields.schoolYear.options.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setSchoolYear(year)}
                      style={{
                        flex: 1,
                        height: 44,
                        border: `2px solid ${schoolYear === year ? 'var(--brand)' : 'var(--border-subtle)'}`,
                        borderRadius: 8,
                        background: schoolYear === year ? 'var(--brand)' : 'var(--surface-raised)',
                        color: schoolYear === year ? 'var(--brand-foreground)' : 'var(--text-body)',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{c.fields.schoolYear.helper}</p>
              </div>

              {/* Region */}
              <div style={{ marginBottom: 0 }}>
                <Label htmlFor="region" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
                  {c.fields.region.label} <span style={{ color: 'var(--danger)' }}>*</span>
                </Label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '0 16px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 8,
                    fontSize: 15,
                    color: region ? 'var(--text-heading)' : 'var(--text-subtle)',
                    background: 'var(--surface-raised)',
                    cursor: 'pointer',
                  }}
                  className="focus:border-brand focus:ring-[3px] focus:ring-brand/12 focus:outline-none"
                >
                  <option value="">{c.fields.region.placeholder}</option>
                  {c.fields.region.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{c.fields.region.helper}</p>
              </div>
            </div>

            {/* Optional */}
            <div style={{ borderTop: '1px solid var(--surface-muted)', paddingTop: 32 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-subtle)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                {c.optionalLabel}
              </p>

              <div>
                <Label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
                  {c.fields.photo.label}
                </Label>
                <div
                  style={{
                    border: '2px dashed var(--brand-muted)',
                    borderRadius: 8,
                    padding: 32,
                    textAlign: 'center',
                    background: 'var(--surface-raised)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand)';
                    e.currentTarget.style.background = 'var(--brand-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-muted)';
                    e.currentTarget.style.background = 'var(--surface-raised)';
                  }}
                >
                  <Upload size={24} style={{ color: 'var(--brand)', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 14, color: 'var(--text-body)', marginBottom: 4 }}>{c.fields.photo.uploadText}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{c.fields.photo.uploadSubtext}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {firstName
                      ? `${c.fields.photo.helperPrefix} ${firstName} ${c.fields.photo.helperSuffix}`
                      : c.fields.photo.helperFallback}
                  </p>
                  <button
                    type="button"
                    style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', whiteSpace: 'nowrap' }}
                  >
                    {c.fields.photo.skipLabel}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 4 }}>{c.fields.photo.fallbackNote}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
            <Link to={isFirstChild ? '/login' : '/parent'}>
              <Button variant="ghost" style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                {isFirstChild ? c.navigation.backFirstChild : c.navigation.cancelLabel}
              </Button>
            </Link>
            <Link to={isLastChild ? '/parent' : '/onboarding/select-schools'}>
              <Button
                disabled={!isFormValid}
                style={{
                  background: isFormValid ? 'var(--brand)' : 'var(--border-subtle)',
                  color: isFormValid ? 'var(--brand-foreground)' : 'var(--text-subtle)',
                  height: 48,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
                className={isFormValid ? 'hover:bg-brand-hover' : ''}
              >
                {ctaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
