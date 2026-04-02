// src/components/assessment/AssessmentForm.tsx
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } from '@/utils/dataLayer';

export interface AssessmentContactData {
  fullName: string;
  email: string;
  company: string;
  country: string;
}

interface AssessmentFormProps {
  onSubmitSuccess: (data: AssessmentContactData) => void;
  assessmentMeta: {
    score: number;
    level: string;
    painPoint: string | null;
    answers: Record<number, number>;
  };
}

const COUNTRY_KEYS = [
  'guatemala', 'honduras', 'el_salvador', 'costa_rica',
  'panama', 'nicaragua', 'belice', 'other',
] as const;

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmitSuccess, assessmentMeta }) => {
  const { t, i18n } = useTranslation('assessment');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  const formSchema = useMemo(() => z.object({
    fullName: z.string().min(3, { message: t('form.validation.fullName') }),
    email: z.string().email({ message: t('form.validation.email') }),
    company: z.string().min(2, { message: t('form.validation.company') }),
    country: z.string({ required_error: t('form.validation.country') }).min(1, { message: t('form.validation.country') }),
  }), [t]);

  const { register, handleSubmit, formState: { errors }, control } = useForm<AssessmentContactData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormInteraction = () => {
    if (!formStarted) {
      trackFormStart('bpo_assessment', 'assessment_form');
      setFormStarted(true);
    }
  };

  const onSubmit = async (data: AssessmentContactData) => {
    setLoading(true);
    setServerError(null);

    trackFormSubmit('bpo_assessment', {
      formLocation: 'assessment_form',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formulario: 'bpo-assessment',
          language: i18n.language,
          source: window.location.href,
          assessmentScore: assessmentMeta.score,
          assessmentLevel: assessmentMeta.level,
          assessmentPainPoint: assessmentMeta.painPoint,
        }),
      });

      if (!response.ok) {
        throw new Error(t('form.error'));
      }

      // Fire n8n webhook (fire-and-forget)
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
            company: data.company,
            country: data.country,
            score: assessmentMeta.score,
            level: assessmentMeta.level,
            painPoint: assessmentMeta.painPoint,
            answers: assessmentMeta.answers,
            language: i18n.language,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => { /* silently ignore webhook errors */ });
      }

      trackFormSuccess('bpo_assessment', 'assessment_form');
      onSubmitSuccess(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('form.error');
      setServerError(errorMessage);
      trackFormError('bpo_assessment', 'submission', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
        {t('form.title')}
      </h2>
      <p className="text-slate-400 text-center mb-8">
        {t('form.subtitle')}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="fullName" className="text-slate-300">{t('form.labels.fullName')}</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            onFocus={handleFormInteraction}
            placeholder={t('form.placeholders.fullName')}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 mt-2 focus:border-sky-400 focus:ring-sky-400"
          />
          {errors.fullName && <p id="fullName-error" role="alert" className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="email" className="text-slate-300">{t('form.labels.email')}</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            onFocus={handleFormInteraction}
            placeholder={t('form.placeholders.email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 mt-2 focus:border-sky-400 focus:ring-sky-400"
          />
          {errors.email && <p id="email-error" role="alert" className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="company" className="text-slate-300">{t('form.labels.company')}</Label>
          <Input
            id="company"
            {...register('company')}
            onFocus={handleFormInteraction}
            placeholder={t('form.placeholders.company')}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 mt-2 focus:border-sky-400 focus:ring-sky-400"
          />
          {errors.company && <p id="company-error" role="alert" className="text-red-400 text-sm mt-1">{errors.company.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Label className="text-slate-300">{t('form.labels.country')}</Label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className="bg-slate-800 border-slate-600 text-white mt-2 focus:border-sky-400 focus:ring-sky-400"
                  onFocus={handleFormInteraction}
                >
                  <SelectValue placeholder={t('form.labels.country')} className="text-slate-500" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-600">
                  {COUNTRY_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`form.countries.${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && <p role="alert" className="text-red-400 text-sm mt-1">{errors.country.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-lg py-6 shadow-lg shadow-sky-500/25 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                {t('form.submitting')}
              </>
            ) : t('form.submit')}
          </Button>
        </motion.div>

        {serverError && (
          <p role="alert" aria-live="assertive" className="text-red-400 text-center text-sm">
            {serverError}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default AssessmentForm;
