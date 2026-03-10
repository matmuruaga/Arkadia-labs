---
paths: src/**/*.tsx, src/**/*.ts
---

# Security Rules

## Data Protection

### Never Expose Sensitive Data

```typescript
// NEVER log or track PII
console.log(userEmail);           // WRONG
trackEvent({ email: userEmail }); // WRONG

// CORRECT - Log only non-sensitive metadata
console.log('Form submitted');
trackEvent({ formType: 'contact', location: 'page' });
```

### Environment Variables

```typescript
// Sensitive keys should be in .env (not committed)
const API_KEY = import.meta.env.VITE_API_KEY;

// .env.example should have placeholders
// VITE_API_KEY=your-api-key-here
```

### Never Commit

- `.env` files with real credentials
- API keys or tokens
- Database connection strings
- Private keys or certificates

## Input Validation

### Always Validate User Input

```typescript
import { z } from 'zod';

// Define strict schemas
const contactSchema = z.object({
  email: z.string().email().max(254),
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s]+$/),
  message: z.string().min(10).max(5000),
  companySize: z.enum(['1-10', '11-50', '51-200', '200+']),
});

// Validate before processing
const result = contactSchema.safeParse(formData);
if (!result.success) {
  // Handle validation errors
}
```

### Sanitize HTML Content

If displaying user-generated content (rare in this project):

```typescript
import DOMPurify from 'dompurify';

// Sanitize before rendering
const cleanHTML = DOMPurify.sanitize(userContent);
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
```

## XSS Prevention

### Avoid dangerouslySetInnerHTML

```typescript
// AVOID unless absolutely necessary
<div dangerouslySetInnerHTML={{ __html: content }} />

// PREFER React's automatic escaping
<div>{content}</div>

// If you must use it, sanitize first
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
```

### URL Validation

```typescript
// Validate URLs before using
const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// Never use javascript: URLs
if (url.startsWith('javascript:')) {
  return; // Reject
}
```

## API Security

### HTTPS Only

```typescript
// All external requests must use HTTPS
const WEBHOOK_URL = 'https://secure-endpoint.com/webhook'; // CORRECT
const WEBHOOK_URL = 'http://endpoint.com/webhook';         // WRONG
```

### Error Handling

```typescript
// Don't expose internal errors to users
try {
  await submitForm(data);
} catch (error) {
  // Log detailed error internally
  console.error('Form submission failed:', error);

  // Show generic message to user
  setError(t('form.genericError'));

  // Track error (without sensitive details)
  trackFormError('contact', 'page', 'submission_failed');
}
```

### Rate Limiting Awareness

```typescript
// Disable submit button during processing
const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmit = async () => {
  if (isSubmitting) return;
  setIsSubmitting(true);

  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};
```

## Third-Party Integrations

### Calendly

```typescript
// Use official embed, don't expose API keys client-side
import { InlineWidget } from 'react-calendly';

<InlineWidget
  url="https://calendly.com/your-link"
  prefill={{ email: undefined }} // Don't prefill sensitive data
/>
```

### ElevenLabs

```typescript
// Widget key is public, but monitor usage
<ElevenLabsWidget agentId={ELEVENLABS_AGENT_ID} />
```

### Analytics

```typescript
// Never track PII
trackEvent({
  event: 'form_submit',
  formType: 'contact',
  // NO: email, name, phone, company details
});
```

## Content Security

### External Links

```typescript
// Always use noopener for external links
<a
  href={externalUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  External Link
</a>
```

### User-Generated URLs

```typescript
// Validate before using in href
const safeUrl = isValidUrl(userUrl) ? userUrl : '#';
<a href={safeUrl}>Link</a>
```

## Authentication (Future)

When implementing auth:

```typescript
// Store tokens securely
// - Use httpOnly cookies for refresh tokens
// - Use memory/state for access tokens
// - Never store in localStorage

// Always validate tokens server-side
// Use short expiration times
// Implement proper logout (clear all tokens)
```

## Security Checklist

Before deploying:

- [ ] No hardcoded API keys or secrets
- [ ] All forms use Zod validation
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No PII in analytics events
- [ ] Error messages don't expose internals
- [ ] All API calls use HTTPS
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] Dependencies are up to date (no known vulnerabilities)

## Dependency Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Update dependencies regularly
npm update
```

## Reporting Security Issues

If you discover a security vulnerability:

1. Do NOT commit the fix publicly
2. Document the issue privately
3. Notify the team immediately
4. Create a fix in a private branch
5. Deploy the fix before public disclosure
