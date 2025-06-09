// src/components/TestimonialsSection.tsx
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Quote, ArrowRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  imageUrl?: string;         // URL de la imagen de la persona
  clientLogoUrl?: string;    // URL para el logo del cliente
  quote: string;
  author: string;
  title: string;
  company: string;
  caseStudyLink?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749459204/u5837542839_Candid_photograph_of_a_professional_woman_in_her__579c3a09-4f04-4fb7-8518-2cd8a34fc4e8_1_q9hdbc.png',
    clientLogoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749461442/ApexConect_gqq3o4.png', // Deja en blanco o pon la URL si tienes un logo para ApexConnect
    quote: "Before ElevAIte, our sales team was drowning in unqualified leads. The AI agent they built doesn't just filter; it learns and adapts to our ideal customer profile. Our team's morale is through the roof because they're finally focused on what they do best: building relationships and closing deals.",
    author: 'Jessica Miller',
    title: 'Head of Sales',
    company: 'ApexConnect',
    caseStudyLink: '#',
  },
  {
    id: 2,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749459204/u5837542839_Realistic_corporate_portrait_of_an_experienced_ma_1c8e39d8-321c-43a8-ac0b-222e2ccfd90c_2_apgygi.png',
    clientLogoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749461442/ScaleOps_ujom22.png', // Deja en blanco o pon la URL si tienes un logo para ScaleOps
    quote: "Our month-end reporting used to be a week-long, error-prone nightmare. The automation agent ElevAIte crafted for us now handles it in under an hour, with zero errors. It's not just a time-saver; it's given us back our sanity and lets us focus on strategy, not spreadsheets.",
    author: 'Michael Carter',
    title: 'Chief Operating Officer',
    company: 'ScaleOps',
    caseStudyLink: '#',
  },
  {
    id: 3,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749459204/u5837542839_A_warm_natural_light_photograph_of_a_friendly_and_d7e6cb72-e828-40c9-b4a9-36e3522b79d8_2_hrsjzi.png',
    clientLogoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749461442/BrightDesk_kopq8r.png', // Deja en blanco o pon la URL si tienes un logo para Bright-Desk
    quote: "We were worried an AI would feel impersonal, but it's been the opposite. The support agent handles all routine queries instantly, 24/7, which frees up our human experts to tackle complex issues with more care. Our customers now get faster answers for simple things and better support for big problems. It's a win-win.",
    author: 'Sofia Rossi',
    title: 'Director of Customer Experience',
    company: 'Bright-Desk',
    caseStudyLink: '#',
  },
];

// Placeholder for main client logos shown above the slider
const mainClientLogos = ['Global Innovate', 'NextGen Corp', 'Alpha Solutions', 'Peak Dynamics', 'Core Systems'];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F1F3F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">
            Trusted by Innovative Businesses
          </h2>
          <p className="text-lg text-[#0D1B2A]/75 max-w-2xl mx-auto">
            Hear how our crafted AI solutions are making a real difference.
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
            {mainClientLogos.map((logoText, index) => (
              <span key={index} className="text-lg font-medium text-[#0D1B2A]/50 italic"> 
                {logoText}
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
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden md:flex">
                  {/* Columna Izquierda: Imagen del Cliente */}
                  <div className="w-full md:w-2/5 lg:w-1/3 min-h-[280px] md:min-h-0 bg-slate-100">
                    <img 
                      src={testimonial.imageUrl} 
                      alt={`Portrait of ${testimonial.author}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Columna Derecha: Contenido del Testimonio */}
                  <div className="w-full md:w-3/5 lg:w-2/3 p-6 py-8 md:p-8 lg:p-10 flex flex-col justify-center">
                    {testimonial.clientLogoUrl ? (
                      <img 
                        src={testimonial.clientLogoUrl} 
                        alt={`${testimonial.company} logo`} 
                        className="h-8 md:h-9 mb-5 object-contain self-start"
                      />
                    ) : (
                      <div className="mb-5 text-xl font-bold text-[#0D1B2A]/70 self-start">
                        {testimonial.company}
                      </div>
                    )}
                    <Quote className="text-[#D0BFFF] w-7 h-7 md:w-8 md:h-8 mb-4" strokeWidth={1.5}/>
                    <p className="text-md md:text-lg text-[#0D1B2A]/90 mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-[#0D1B2A]">{testimonial.author}</p>
                    <p className="text-sm text-[#0D1B2A]/70 mb-6">{testimonial.title}, {testimonial.company}</p>
                    
                    {testimonial.caseStudyLink && (
                      <a
                        href={testimonial.caseStudyLink}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-[#1C7ED6] hover:text-[#1565C0] group"
                      >
                        Read Full Story 
                        <ArrowRight size={16} className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;