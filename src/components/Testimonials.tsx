import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import AnimatedLines from '../components/AnimatedLines';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  const testimonials = [
    {
      text: "The AI sales team integration doubled our pipeline within months. Their system works 24/7, never misses a lead, and consistently delivers quality conversations.",
      name: "Sarah Chen",
      role: "Sales Director, TechCorp",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      text: "The automation of our sales processes has freed up our team to focus on strategic relationships. Our conversion rates have never been better.",
      name: "Lisa Thompson",
      role: "VP Sales, CloudTech",
      image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      text: "Partnering with AIAgents has been transformative for our team. Their clear and timely communication, along with tailor-made AI solutions, keeps us at the cutting edge.",
      name: "Eugene Mann",
      role: "Product Lead, Stripe",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      text: "We've seen a 300% increase in qualified meetings since implementing AIAgents. The ROI is clear, and the ongoing optimization keeps improving results.",
      name: "Marcus Rodriguez",
      role: "CEO, GrowthX",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
  ];

  return (
    <section id="testimonials" className="relative px-4 py-20 overflow-hidden bg-[#0C0F3F]">
      <AnimatedLines />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.h2>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="testimonials-slider"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="text-center px-4 py-12">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center justify-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]"
                      />
                      <div className="ml-4 text-left">
                        <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-[var(--accent)]">{testimonial.role}</p>
                      </div>
                    </div>
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

export default Testimonials;
