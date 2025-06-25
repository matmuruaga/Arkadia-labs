// src/components/IntegrationsList.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allIntegrations, categories } from "../data/integrations";
import { motion } from 'framer-motion';

export const IntegrationsList = () => {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Explora por Categoría</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            Encuentra las herramientas que usas y descubre nuevas formas de automatizar tu trabajo.
          </p>
        </motion.div>

        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="py-2.5">{category}</TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                {allIntegrations
                  .filter((integration) => integration.category === category)
                  .map((integration) => (
                    <div key={integration.id} className="border border-slate-200 bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3 aspect-square hover:bg-white hover:shadow-md transition-all">
                      <img src={integration.logoUrl} alt={`${integration.name} logo`} className="h-10 w-10 object-contain" />
                      <p className="text-sm font-semibold text-gray-700">{integration.name}</p>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};