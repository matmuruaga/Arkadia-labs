// src/pages/ContactPage.tsx
import { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { trackPageView, trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } from '@/utils/dataLayer';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MessageSquare } from 'lucide-react';

type ContactFormValues = z.infer<z.ZodObject<any>>;

const backgroundImageUrl = 'https://res.cloudinary.com/dntco2fcz/image/upload/v1764670375/u5837542839_A_surreal_mountain_landscape_graphic_where_the_pe_d8921530-eaa2-40b0-98dc-982620ea5e11_2_1_dimax7.png';

export const ContactPage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    trackPageView(location.pathname, 'Contact - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  const handleFormInteraction = () => {
    if (!formStarted) {
      trackFormStart('contact_form', 'contact_page');
      setFormStarted(true);
    }
  };

  // La lógica del formulario se mantiene intacta
  const contactFormSchema = useMemo(() => z.object({
    fullName: z.string().min(3, { message: t('contactPage.validation.fullName') }),
    email: z.string().email({ message: t('contactPage.validation.email') }),
    companyName: z.string().min(2, { message: t('contactPage.validation.companyName') }),
    role: z.string().optional(),
    companySize: z.string({ required_error: t('contactPage.validation.companySize') }),
    mainChallenge: z.string().min(10, { message: t('contactPage.validation.challenge') }),
  }), [t]);

  const { register, handleSubmit, formState: { errors }, control } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    setServerError(null);

    // Track form submit
    trackFormSubmit('contact_form', {
      companySize: data.companySize,
      role: data.role,
      formLocation: 'contact_page'
    });

    try {
      const webhookUrl = 'https://n8n-elevaitelabs-u48215.vm.elestio.app/webhook/b8866b0b-beb2-4f71-b268-94a9663bfbc8';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formulario: 'contact'
        }),
      });

      if (!response.ok) {
        throw new Error(t('contactPage.errors.server'));
      }

      // Track form success
      trackFormSuccess('contact_form', 'contact_page');

      navigate(`/${lang}/thank-you`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('contactPage.errors.server');
      setServerError(errorMessage);
      trackFormError('contact_form', 'submission', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative flex items-center pt-32 pb-12 md:py-28 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/30" />

      {/* Organic flowing contour lines - topographic map inspired */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 C 20 20, 40 60, 60 40 S 100 20, 120 40' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Cpath d='M0 60 C 30 40, 50 80, 80 60 S 110 40, 120 60' stroke='%2314b8a6' stroke-width='1' fill='none'/%3E%3Cpath d='M0 80 C 25 60, 45 100, 70 80 S 105 60, 120 80' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Ccircle cx='95' cy='25' r='8' stroke='%2314b8a6' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='95' cy='25' r='14' stroke='%230ea5e9' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")
          `,
          backgroundSize: '240px 240px',
        }}
      />

      {/* Floating organic blobs - aurora effect */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-40 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(14, 165, 233, 0.2) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-35 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 80%, rgba(20, 184, 166, 0.18) 0%, transparent 55%)',
        }}
      />
      <div
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)',
        }}
      />

      {/* Scattered organic shapes */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='150' rx='25' ry='15' stroke='%230ea5e9' stroke-width='0.8' fill='none' transform='rotate(-15 30 150)'/%3E%3Cellipse cx='170' cy='40' rx='20' ry='12' stroke='%2314b8a6' stroke-width='0.8' fill='none' transform='rotate(20 170 40)'/%3E%3Cpath d='M80 100 Q 100 70, 120 100 T 160 100' stroke='%230ea5e9' stroke-width='0.6' fill='none'/%3E%3C/svg%3E")
          `,
          backgroundSize: '400px 400px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div
          className="max-w-5xl mx-auto relative rounded-3xl md:rounded-none p-3 md:p-0 bg-cover bg-center bg-no-repeat md:bg-none"
          style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
        >

          {/* Framed content area */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background image frame - desktop only */}
            <div
              className="hidden md:block absolute -inset-12 rounded-[3rem] bg-cover bg-center bg-no-repeat opacity-90"
              style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
            />

            {/* Outer decorative frame - desktop only */}
            <div className="hidden md:block absolute -inset-8 border border-slate-200/40 rounded-[2.5rem] pointer-events-none" />

            {/* Main content */}
            <div className="relative rounded-2xl md:rounded-[2rem] p-5 md:p-12 lg:p-16 bg-white/70 md:bg-white/75 backdrop-blur-xl border border-white/50 shadow-xl md:shadow-2xl shadow-slate-900/15 ring-1 ring-white/20">

              {/* Floating badge - breaks out of frame */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2"
              >
                <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg border border-slate-100">
                  <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4 text-sky-500" />
                  <span className="text-xs md:text-sm font-semibold text-slate-700">
                    {t('contactPage.badge', 'Get in Touch')}
                  </span>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-4 md:mt-0">
                {/* Left column: Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col justify-center"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                    {t('contactPage.title')}
                  </h1>
                  <p className="text-lg text-slate-600 mb-8">
                    {t('contactPage.subtitle')}
                  </p>

                  {/* Decorative line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full mb-8" />

                  <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {t('contactPage.whyInfoTitle')}
                    </h3>
                    <p className="text-slate-600">
                      {t('contactPage.whyInfoBody')}
                    </p>
                  </div>
                </motion.div>

                {/* Right column: Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100"
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <Label htmlFor="fullName" className="text-slate-700 font-medium">{t('contactPage.labels.fullName')}</Label>
                        <Input
                          id="fullName"
                          {...register("fullName")}
                          onFocus={handleFormInteraction}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? "fullName-error" : undefined}
                          className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 mt-2 focus:border-sky-400 focus:ring-sky-400"
                        />
                        {errors.fullName && <p id="fullName-error" role="alert" className="text-red-500 font-medium text-sm mt-1">{errors.fullName.message}</p>}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.55 }}
                      >
                        <Label htmlFor="email" className="text-slate-700 font-medium">{t('contactPage.labels.workEmail')}</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          onFocus={handleFormInteraction}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 mt-2 focus:border-sky-400 focus:ring-sky-400"
                        />
                        {errors.email && <p id="email-error" role="alert" className="text-red-500 font-medium text-sm mt-1">{errors.email.message}</p>}
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <Label htmlFor="companyName" className="text-slate-700 font-medium">{t('contactPage.labels.companyName')}</Label>
                        <Input
                          id="companyName"
                          {...register("companyName")}
                          onFocus={handleFormInteraction}
                          aria-invalid={!!errors.companyName}
                          aria-describedby={errors.companyName ? "companyName-error" : undefined}
                          className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 mt-2 focus:border-sky-400 focus:ring-sky-400"
                        />
                        {errors.companyName && <p id="companyName-error" role="alert" className="text-red-500 font-medium text-sm mt-1">{errors.companyName.message}</p>}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.65 }}
                      >
                        <Label htmlFor="role" className="text-slate-700 font-medium">{t('contactPage.labels.role')}</Label>
                        <Input
                          id="role"
                          {...register("role")}
                          onFocus={handleFormInteraction}
                          className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 mt-2 focus:border-sky-400 focus:ring-sky-400"
                        />
                        {errors.role && <p className="text-red-500 font-medium text-sm mt-1">{errors.role.message}</p>}
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <Label className="text-slate-700 font-medium">{t('contactPage.labels.companySize')}</Label>
                      <Controller
                        control={control}
                        name="companySize"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger
                              className="bg-white border-slate-200 text-slate-900 mt-2 focus:border-sky-400 focus:ring-sky-400"
                              onFocus={handleFormInteraction}
                            >
                              <SelectValue placeholder={t('contactPage.placeholders.companySize')} className="text-slate-400" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-slate-900 border-slate-200">
                              <SelectItem value={t('contactPage.options.size1')}>{t('contactPage.options.size1')}</SelectItem>
                              <SelectItem value={t('contactPage.options.size2')}>{t('contactPage.options.size2')}</SelectItem>
                              <SelectItem value={t('contactPage.options.size3')}>{t('contactPage.options.size3')}</SelectItem>
                              <SelectItem value={t('contactPage.options.size4')}>{t('contactPage.options.size4')}</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.companySize && <p id="companySize-error" role="alert" className="text-red-500 font-medium text-sm mt-1">{errors.companySize.message}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.75 }}
                    >
                      <Label htmlFor="mainChallenge" className="text-slate-700 font-medium">{t('contactPage.labels.challenge')}</Label>
                      <Textarea
                        id="mainChallenge"
                        {...register("mainChallenge")}
                        rows={4}
                        onFocus={handleFormInteraction}
                        aria-invalid={!!errors.mainChallenge}
                        aria-describedby={errors.mainChallenge ? "mainChallenge-error" : undefined}
                        className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 mt-2 focus:border-sky-400 focus:ring-sky-400"
                      />
                      {errors.mainChallenge && <p id="mainChallenge-error" role="alert" className="text-red-500 font-medium text-sm mt-1">{errors.mainChallenge.message}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-lg py-6 shadow-lg shadow-sky-500/25 transition-all duration-300"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" aria-hidden="true" />
                            <span className="sr-only">{t('contactPage.button.submitting', 'Submitting...')}</span>
                          </>
                        ) : t('contactPage.button.submit')}
                      </Button>
                    </motion.div>
                    {serverError && <p role="alert" aria-live="assertive" className="text-red-500 text-center">{serverError}</p>}
                  </form>
                </motion.div>
              </div>

            </div>

            {/* Corner decorations - desktop only */}
            <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-sky-300/50 rounded-tl-xl" />
            <div className="hidden md:block absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-teal-300/50 rounded-tr-xl" />
            <div className="hidden md:block absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-sky-300/50 rounded-bl-xl" />
            <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-teal-300/50 rounded-br-xl" />

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
