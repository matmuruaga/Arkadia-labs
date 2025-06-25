// src/pages/ContactPage.tsx
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

type ContactFormValues = z.infer<z.ZodObject<any>>;

const backgroundImageUrl = 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1750796289/Gradient__42_klhn8c.jpg';

export const ContactPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { lang } = useParams<{ lang: string }>();

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
      window.location.href = `/${lang}/thank-you`;
    } catch (error: any) {
      setServerError(error.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 pt-32 pb-12 sm:px-8"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Columna Izquierda con texto mejorado para legibilidad */}
        <div className="text-white text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
            {t('contactPage.title')}
          </h1>
          <p className="text-lg lg:text-xl text-white drop-shadow-md">
            {t('contactPage.subtitle')}
          </p>
          
          <div className="mt-10 pt-6 border-t border-white/20">
            <h3 className="text-2xl font-semibold mb-3 drop-shadow-md">
              {t('contactPage.whyInfoTitle')}
            </h3>
            <p className="text-white drop-shadow-md">
              {t('contactPage.whyInfoBody')}
            </p>
          </div>
        </div>

        {/* Columna Derecha con tarjeta de formulario más opaca */}
        <div className="bg-black/30 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-white font-medium">{t('contactPage.labels.fullName')}</Label>
                <Input id="fullName" {...register("fullName")} className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 mt-2" />
                {errors.fullName && <p className="text-red-400 font-medium text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-white font-medium">{t('contactPage.labels.workEmail')}</Label>
                <Input id="email" type="email" {...register("email")} className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 mt-2" />
                {errors.email && <p className="text-red-400 font-medium text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName" className="text-white font-medium">{t('contactPage.labels.companyName')}</Label>
                <Input id="companyName" {...register("companyName")} className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 mt-2" />
                {errors.companyName && <p className="text-red-400 font-medium text-sm mt-1">{errors.companyName.message}</p>}
              </div>
              <div>
                <Label htmlFor="role" className="text-white font-medium">{t('contactPage.labels.role')}</Label>
                <Input id="role" {...register("role")} className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 mt-2" />
                {errors.role && <p className="text-red-400 font-medium text-sm mt-1">{errors.role.message}</p>}
              </div>
            </div>
            <div>
              <Label className="text-white font-medium">{t('contactPage.labels.companySize')}</Label>
              <Controller
                control={control}
                name="companySize"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white mt-2">
                      <SelectValue placeholder={t('contactPage.placeholders.companySize')} />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-white/20">
                      <SelectItem value={t('contactPage.options.size1')}>{t('contactPage.options.size1')}</SelectItem>
                      <SelectItem value={t('contactPage.options.size2')}>{t('contactPage.options.size2')}</SelectItem>
                      <SelectItem value={t('contactPage.options.size3')}>{t('contactPage.options.size3')}</SelectItem>
                      <SelectItem value={t('contactPage.options.size4')}>{t('contactPage.options.size4')}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.companySize && <p className="text-red-400 font-medium text-sm mt-1">{errors.companySize.message}</p>}
            </div>
            <div>
              <Label htmlFor="mainChallenge" className="text-white font-medium">{t('contactPage.labels.challenge')}</Label>
              <Textarea id="mainChallenge" {...register("mainChallenge")} rows={4} className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 mt-2" />
              {errors.mainChallenge && <p className="text-red-400 font-medium text-sm mt-1">{errors.mainChallenge.message}</p>}
            </div>
            <div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 font-bold text-lg py-6" disabled={loading}>
                {loading ? <Loader2 className="animate-spin text-black" /> : t('contactPage.button.submit')}
              </Button>
            </div>
            {serverError && <p className="text-red-500 text-center">{serverError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};