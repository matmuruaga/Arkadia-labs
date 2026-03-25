---
paths: src/**/*.tsx
---

# Form Handling Rules

## Stack

- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration

## Basic Form Setup

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } from '@/utils/dataLayer';

// 1. Define schema with i18n messages
const createFormSchema = (t: TFunction) => z.object({
  fullName: z.string().min(3, { message: t('validation.fullName') }),
  email: z.string().email({ message: t('validation.email') }),
  companyName: z.string().min(2, { message: t('validation.companyName') }),
  role: z.string().optional(),
  companySize: z.string({ required_error: t('validation.companySize') }),
  message: z.string().min(10, { message: t('validation.message') }),
});

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

// 2. Component
const ContactForm = () => {
  const { t } = useTranslation();
  const formSchema = createFormSchema(t);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      role: '',
      companySize: '',
      message: '',
    },
  });

  // 3. Analytics tracking
  const handleFormStart = () => {
    trackFormStart('contact_form', 'contact_page');
  };

  const onSubmit = async (data: FormData) => {
    trackFormSubmit('contact_form', 'contact_page');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');

      trackFormSuccess('contact_form', 'contact_page');
      reset();
      // Navigate to thank you page
    } catch (error) {
      trackFormError('contact_form', 'contact_page', error.message);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

## Form Field Components

### Text Input

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="fullName">{t('form.fullName')}</Label>
  <Input
    id="fullName"
    {...register('fullName')}
    onFocus={handleFormStart}
    placeholder={t('form.fullNamePlaceholder')}
    className={cn(errors.fullName && 'border-red-500')}
  />
  {errors.fullName && (
    <p className="text-sm text-red-500">{errors.fullName.message}</p>
  )}
</div>
```

### Textarea

```tsx
import { Textarea } from '@/components/ui/textarea';

<div className="space-y-2">
  <Label htmlFor="message">{t('form.message')}</Label>
  <Textarea
    id="message"
    {...register('message')}
    placeholder={t('form.messagePlaceholder')}
    rows={4}
    className={cn(errors.message && 'border-red-500')}
  />
  {errors.message && (
    <p className="text-sm text-red-500">{errors.message.message}</p>
  )}
</div>
```

### Select (with Controller)

```tsx
import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Controller
  name="companySize"
  control={control}
  render={({ field }) => (
    <div className="space-y-2">
      <Label>{t('form.companySize')}</Label>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className={cn(errors.companySize && 'border-red-500')}>
          <SelectValue placeholder={t('form.selectPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1-10">{t('form.size1to10')}</SelectItem>
          <SelectItem value="11-50">{t('form.size11to50')}</SelectItem>
          <SelectItem value="51-200">{t('form.size51to200')}</SelectItem>
          <SelectItem value="200+">{t('form.size200plus')}</SelectItem>
        </SelectContent>
      </Select>
      {errors.companySize && (
        <p className="text-sm text-red-500">{errors.companySize.message}</p>
      )}
    </div>
  )}
/>
```

## Validation Patterns

### Common Zod Schemas

```typescript
// Email
email: z.string().email({ message: t('validation.invalidEmail') })

// Phone (optional)
phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: t('validation.invalidPhone') }).optional()

// Required string with min length
name: z.string().min(2, { message: t('validation.nameTooShort') })

// URL
website: z.string().url({ message: t('validation.invalidUrl') }).optional()

// Enum/select
role: z.enum(['developer', 'manager', 'executive'], {
  errorMap: () => ({ message: t('validation.selectRole') })
})

// Checkbox (must be checked)
acceptTerms: z.literal(true, {
  errorMap: () => ({ message: t('validation.mustAcceptTerms') })
})
```

### Custom Validation

```typescript
const schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: t('validation.passwordsMustMatch'),
  path: ['confirmPassword'],
});
```

## Form Submission

### Webhook Integration

```typescript
const WEBHOOK_URL = 'https://your-webhook-endpoint.com/webhook/form';

const onSubmit = async (data: FormData) => {
  trackFormSubmit('form_name', 'form_location');

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: window.location.href,
        language: i18n.language,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    trackFormSuccess('form_name', 'form_location');
    navigate(`/${lang}/thank-you`);

  } catch (error) {
    trackFormError('form_name', 'form_location', error instanceof Error ? error.message : 'Unknown error');
    setServerError(t('form.submitError'));
  }
};
```

## Loading States

```tsx
import { Loader2 } from 'lucide-react';

<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {t('form.submitting')}
    </>
  ) : (
    t('form.submit')
  )}
</Button>
```

## Error Handling

### Field-Level Errors

Display directly below each field (as shown above).

### Server Errors

```tsx
const [serverError, setServerError] = useState<string | null>(null);

// In JSX
{serverError && (
  <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
    {serverError}
  </div>
)}
```

## Accessibility Requirements

1. **Labels**: Every input must have an associated label
2. **Error announcements**: Use `role="alert"` for error messages
3. **Focus management**: Focus first error field on validation failure
4. **Keyboard navigation**: Ensure all form controls are keyboard accessible

```tsx
{errors.email && (
  <p role="alert" className="text-sm text-red-500">
    {errors.email.message}
  </p>
)}
```

## Analytics Requirements

Every form MUST track:

1. **Form Start**: When user focuses first field
2. **Form Submit**: When user clicks submit
3. **Form Success**: On successful submission
4. **Form Error**: On validation or server errors

```typescript
import {
  trackFormStart,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
} from '@/utils/dataLayer';
```
