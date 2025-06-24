// src/pages/ContactPage.tsx
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Importar

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

// El tipo de los valores del formulario no cambia
type ContactFormValues = z.infer<z.ZodObject<any>>;

export const ContactPage = () => {
  const { t } = useTranslation(); // 2. Inicializar hook
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  // 3. Definir el esquema DENTRO del componente para usar t()
  // Se usa useMemo para evitar que se recree en cada render
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
        body: JSON.stringify(data),
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        {/* 4. Usar t() para todos los textos de la UI */}
        <h1 className="text-3xl font-bold mb-2">{t('contactPage.title')}</h1>
        <p className="text-gray-600 mb-6">{t('contactPage.subtitle')}</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">{t('contactPage.labels.fullName')}</Label>
              <Input id="fullName" {...register("fullName")} />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">{t('contactPage.labels.workEmail')}</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">{t('contactPage.labels.companyName')}</Label>
              <Input id="companyName" {...register("companyName")} />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
            </div>
            <div>
              <Label htmlFor="role">{t('contactPage.labels.role')}</Label>
              <Input id="role" {...register("role")} />
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>
          </div>
          <div>
            <Label>{t('contactPage.labels.companySize')}</Label>
            <Controller
              control={control}
              name="companySize"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('contactPage.placeholders.companySize')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={t('contactPage.options.size1')}>{t('contactPage.options.size1')}</SelectItem>
                    <SelectItem value={t('contactPage.options.size2')}>{t('contactPage.options.size2')}</SelectItem>
                    <SelectItem value={t('contactPage.options.size3')}>{t('contactPage.options.size3')}</SelectItem>
                    <SelectItem value={t('contactPage.options.size4')}>{t('contactPage.options.size4')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>}
          </div>
          <div>
            <Label htmlFor="mainChallenge">{t('contactPage.labels.challenge')}</Label>
            <Textarea id="mainChallenge" {...register("mainChallenge")} rows={4} />
            {errors.mainChallenge && <p className="text-red-500 text-sm mt-1">{errors.mainChallenge.message}</p>}
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : t('contactPage.button.submit')}
            </Button>
          </div>
          {serverError && <p className="text-red-500 text-center">{serverError}</p>}
        </form>
      </div>
    </div>
  );
};