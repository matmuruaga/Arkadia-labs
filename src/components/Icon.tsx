// src/components/Icon.tsx
import React from 'react';
// Añade todos los iconos que estamos usando en el proyecto
import {
  TrendingUp,
  CalendarDays,
  UserCheck,
  Shield,
  Clock,
  DollarSign,
  Lightbulb,
  Calendar,
  Users,
  UserX,
  Search,
  Rocket,
  ShieldCheck,
  Infinity,
  LucideProps,
  Briefcase,
  Target,
  Award,
  Settings2,
  Home,
  MessageSquareWarning,
  Star,
  Moon,
  Send,
  MessageCircle,
  Smile,
  Zap,
  Phone,
  CheckCircle2,
} from 'lucide-react';

// Mapeo completo de nombres a componentes de icono
const icons = {
  TrendingUp,
  CalendarDays,
  UserCheck,
  Shield,
  Clock,
  DollarSign,
  Lightbulb,
  Calendar,
  Users,
  UserX,
  Search,
  Rocket,
  ShieldCheck,
  Infinity,
  Briefcase,
  Target,
  Award,
  Settings2,
  Home,
  MessageSquareWarning,
  Star,
  Moon,
  Send,
  MessageCircle,
  Smile,
  Zap,
  Phone,
  CheckCircle2,
};

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    // Si un icono no se encuentra, no se rompe la app
    return null;
  }
  return <LucideIcon {...props} />;
};

export default Icon;