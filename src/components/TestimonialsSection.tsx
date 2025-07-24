// src/components/TestimonialsSection.tsx
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Quote, ArrowRight, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Datos actualizados con `caseStudySlug` y `linkedinUrl`
const testimonialsData = [
  {
    id: 1,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1753270636/Cosma_Musacchio_q92fdb.avif',
    clientLogoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752340022/Captura_de_pantalla_2025-07-12_a_la_s_19.05.47_ymuenu.png',
    quoteKey: 'testimonials.cards.t2.quote',
    authorKey: 'testimonials.cards.t2.author',
    titleKey: 'testimonials.cards.t2.title',
    companyKey: 'testimonials.cards.t2.company',
    caseStudySlug: 'domus-labs', // Slug para la URL
    linkedinUrl: 'https://www.linkedin.com/in/cosmamusacchio', // URL de LinkedIn
  },
  {
    id: 2,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1753272756/Karel-Duchon_f0bmib.jpg',
    clientLogoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751619752/zytlyn_logo_wotmqi.svg',
    quoteKey: 'testimonials.cards.t3.quote',
    authorKey: 'testimonials.cards.t3.author',
    titleKey: 'testimonials.cards.t3.title',
    companyKey: 'testimonials.cards.t3.company',
    caseStudySlug: 'zytlyn', // Slug para la URL
    linkedinUrl: 'https://www.linkedin.com/in/karelduchon/', // URL de ejemplo
  },
  {
    id: 3,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1753272440/Tom%C3%A1%C5%A1_Ustohal_gnvg9j.jpg',
    clientLogoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1753270034/Recurso_1_bfq5cn.svg',
    quoteKey: 'testimonials.cards.t1.quote',
    authorKey: 'testimonials.cards.t1.author',
    titleKey: 'testimonials.cards.t1.title',
    companyKey: 'testimonials.cards.t1.company',
    caseStudySlug: 'goodnite', // Slug para la URL
    linkedinUrl: 'https://www.linkedin.com/in/tom%C3%A1%C5%A1-ustohal-b09746212', // URL de ejemplo
  },
];

const mainClientLogoKeys = [
  'testimonials.mainLogos.logo1',
  'testimonials.mainLogos.logo2',
  'testimonials.mainLogos.logo3',
  'testimonials.mainLogos.logo4',
  'testimonials.mainLogos.logo5',
];

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F1F3F5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-[#0D1B2A]/75 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-14 gap-y-4">
            {mainClientLogoKeys.map((key, index) => (
              <span key={index} className="text-lg font-medium text-[#0D1B2A]/50 italic"> 
                {t(key)}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="testimonials-slider"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            className="pb-12 md:pb-16"
          >
            {testimonialsData.map((testimonial) => {
              const author = t(testimonial.authorKey);
              const company = t(testimonial.companyKey);
              
              return (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden md:flex">
                    
                    {/* --- INICIO DE LA CORRECCIÓN --- */}
                    <div className="w-full md:w-2/5 lg:w-1/3 bg-slate-100 aspect-square md:aspect-auto">
                      <img 
                        src={testimonial.imageUrl} 
                        alt={t('testimonials.altText.portrait', { author })} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    {/* --- FIN DE LA CORRECCIÓN --- */}

                    <div className="w-full md:w-3/5 lg:w-2/3 p-6 py-8 md:p-8 lg:p-10 flex flex-col justify-center">
                      {testimonial.clientLogoUrl ? (
                        <img 
                          src={testimonial.clientLogoUrl} 
                          alt={t('testimonials.altText.logo', { company })} 
                          className="h-8 md:h-9 mb-5 object-contain self-start"
                        />
                      ) : (
                        <div className="mb-5 text-xl font-bold text-[#0D1B2A]/70 self-start">
                          {company}
                        </div>
                      )}
                      <Quote className="text-[#D0BFFF] w-7 h-7 md:w-8 md:h-8 mb-4" strokeWidth={1.5}/>
                      <p className="text-md md:text-lg text-[#0D1B2A]/90 mb-6 leading-relaxed italic">
                        "{t(testimonial.quoteKey)}"
                      </p>
                      
                      <div className="flex items-center gap-2 mb-1">
                        <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0D1B2A] hover:text-[#1C7ED6] transition-colors">{author}</a>
                        <a href={testimonial.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1C7ED6] transition-colors">
                          <Linkedin size={16} />
                        </a>
                      </div>
                      <p className="text-sm text-[#0D1B2A]/70 mb-6">{t(testimonial.titleKey)}, {company}</p>
                      
                      {testimonial.caseStudySlug && (
                        <Link
                          to={`/${i18n.language}/case-studies/${testimonial.caseStudySlug}`}
                          className="inline-flex items-center text-sm font-semibold text-[#1C7ED6] hover:text-[#1565C0] group"
                        >
                          {t('testimonials.caseStudyButton')}
                          <ArrowRight size={16} className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;