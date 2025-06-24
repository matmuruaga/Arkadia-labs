// src/pages/ContactPage.tsx
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// CAMBIO 1: Importamos useParams para obtener el idioma de la URL
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

const contactFormSchema = z.object({
  fullName: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  companyName: z.string().min(2, { message: "El nombre de la empresa es requerido." }),
  role: z.string().optional(),
  companySize: z.string({ required_error: "Por favor, selecciona un tamaño de empresa."}),
  mainChallenge: z.string().min(10, { message: "Tu descripción debe tener al menos 10 caracteres." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  // CAMBIO 2: Obtenemos el parámetro 'lang' de la URL
  const { lang } = useParams<{ lang: string }>();

  const { register, handleSubmit, formState: { errors }, control } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    setServerError(null);

    try {
      // Usamos la URL del webhook de n8n que ya te funcionaba
      const webhookUrl = 'https://n8n-elevaitelabs-u48215.vm.elestio.app/webhook/b8866b0b-beb2-4f71-b268-94a9663bfbc8';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.');
      }

      // CAMBIO 3: Usamos una redirección a nivel de navegador para máxima fiabilidad
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
        <h1 className="text-3xl font-bold mb-2">Hablemos de tu Proyecto</h1>
        <p className="text-gray-600 mb-6">Completa este formulario para agendar una reunión con nuestro equipo.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input id="fullName" {...register("fullName")} />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email de Trabajo</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input id="companyName" {...register("companyName")} />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
            </div>
            <div>
              <Label htmlFor="role">Cargo (Opcional)</Label>
              <Input id="role" {...register("role")} />
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
            </div>
          </div>
          <div>
            <Label>Tamaño de la Empresa</Label>
            <Controller
              control={control}
              name="companySize"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rango" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10 empleados">1-10 empleados</SelectItem>
                    <SelectItem value="11-50 empleados">11-50 empleados</SelectItem>
                    <SelectItem value="51-200 empleados">51-200 empleados</SelectItem>
                    <SelectItem value="+201 empleados">+201 empleados</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>}
          </div>
          <div>
            <Label htmlFor="mainChallenge">¿Cuál es tu principal desafío o necesidad?</Label>
            <Textarea id="mainChallenge" {...register("mainChallenge")} rows={4} />
            {errors.mainChallenge && <p className="text-red-500 text-sm mt-1">{errors.mainChallenge.message}</p>}
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Agendar Reunión'}
            </Button>
          </div>
          {serverError && <p className="text-red-500 text-center">{serverError}</p>}
        </form>
      </div>
    </div>
  );
};