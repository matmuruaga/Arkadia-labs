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
  imagePlaceholder?: string; // For the large image on the left, e.g., 'bg-purple-100'
  clientLogoUrl?: string;    // NEW: URL for the small client logo within the testimonial text
  quote: string;
  author: string;
  title: string;
  company: string;
  caseStudyLink?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    imagePlaceholder: 'bg-purple-100',
    // Replace with actual logo URLs or your generated placeholders
    clientLogoUrl: 'https://via.placeholder.com/120x40/E9ECEF/0D1B2A?text=Innovatech+Ltd', 
    quote: "ElevAIte's custom AI agents have transformed our lead qualification. We've tripled our MQLs, and our sales team now focuses purely on closing, not sifting.",
    author: 'Sarah Jennings',
    title: 'VP of Sales',
    company: 'Innovatech Ltd.',
    caseStudyLink: '#',
  },
  {
    id: 2,
    imagePlaceholder: 'bg-green-100',
    clientLogoUrl: 'https://via.placeholder.com/130x45/E9ECEF/0D1B2A?text=Momentum+Corp',
    quote: "The automation agent from ElevAIte cut our manual data processing by over 70%. It's like gaining an extra, flawless team member working 24/7.",
    author: 'David Miller',
    title: 'Chief Operating Officer',
    company: 'Momentum Corp.',
    caseStudyLink: '#',
  },
  {
    id: 3,
    imagePlaceholder: 'bg-blue-100',
    clientLogoUrl: 'https://via.placeholder.com/110x50/E9ECEF/0D1B2A?text=Synergy+Solutions',
    quote: "Our customer support response times are down by half, and CSAT scores hit an all-time high after implementing ElevAIte's personalized AI support agents.",
    author: 'Lisa Chen',
    title: 'Head of Customer Success',
    company: 'Synergy Solutions',
    caseStudyLink: '#',
  },
];

// Placeholder for main client logos shown above the slider
const mainClientLogos = ['Global Innovate', 'NextGen Corp', 'Alpha Solutions', 'Peak Dynamics', 'Core Systems'];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F1F3F5]"> {/* Base light gray background */}
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

        {/* Optional: Row of Main Client Logos */}
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-14 gap-y-4">
            {mainClientLogos.map((logoText, index) => (
              // Replace this span with <img> tags if you have image files for these main logos
              <span key={index} className="text-lg font-medium text-[#0D1B2A]/50 italic"> 
                {logoText}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="testimonials-slider" // Your custom class from index.css for Swiper styling if needed
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation // Enables Swiper's default navigation arrows
            pagination={{ clickable: true }} // Enables Swiper's default pagination
            loop={true}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            className="pb-12 md:pb-16" // Padding for pagination
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl shadow-xl overflow-hidden md:flex">
                  {/* Left Column: Image Placeholder */}
                  <div className={`w-full md:w-2/5 lg:w-1/3 ${testimonial.imagePlaceholder || 'bg-slate-200'} min-h-[280px] md:min-h-0 bg-cover bg-center flex items-center justify-center`}>
                    {/* Example: <img src={testimonial.imageUrl} alt={testimonial.company} className="w-full h-full object-cover" /> */}
                    <span className="text-slate-500 text-lg opacity-50 hidden">Client Image</span>
                  </div>

                  {/* Right Column: Testimonial Content */}
                  <div className="w-full md:w-3/5 lg:w-2/3 p-6 py-8 md:p-8 lg:p-10 flex flex-col justify-center">
                    {testimonial.clientLogoUrl ? (
                      <img 
                        src={testimonial.clientLogoUrl} 
                        alt={`${testimonial.company} logo`} 
                        className="h-8 md:h-9 mb-5 object-contain self-start" // Adjusted height
                      />
                    ) : ( // Fallback if no logo URL
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