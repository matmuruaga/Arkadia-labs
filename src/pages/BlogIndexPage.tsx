// src/pages/BlogIndexPage.tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blogPostsData';
import { trackPageView, trackBlogCtaClick, trackBlogCategoryFilter } from '@/utils/dataLayer';

const BlogIndexPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    trackPageView(`/${lang}/blog`, t('blog.index.title'), lang || 'en');
  }, [lang, t]);

  const categories = ['all', ...Array.from(new Set(blogPosts.map((p) => p.categoryKey)))];

  const filteredPosts =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.categoryKey === activeCategory);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    trackBlogCategoryFilter(cat);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[var(--site-bg-light)]">
      {/* Hero */}
      <section className="bg-[#0D1B2A] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[var(--site-accent-blue)] text-sm font-medium uppercase tracking-widest mb-4"
          >
            {t('blog.index.eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          >
            {t('blog.index.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl"
          >
            {t('blog.index.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Category filters */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-20 px-4">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto py-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#0D1B2A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? t('blog.index.allCategories') : t(`blog.categories.${cat}`)}
            </button>
          ))}
        </div>
      </section>

      {/* Posts list */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-8 cursor-pointer group hover:shadow-md transition-shadow border border-gray-100"
              onClick={() => navigate(`/${lang}/blog/${post.slug}`)}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--site-accent-blue)]">
                  {t(`blog.categories.${post.categoryKey}`)}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-400">{formatDate(post.publishDate)}</span>
                <span className="text-gray-300">·</span>
                <span className="text-sm text-gray-400">
                  {t('blog.index.readTime', { count: post.readTime })}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#0D1B2A] mb-3 group-hover:text-[var(--site-accent-blue)] transition-colors leading-snug">
                {t(`${post.translationKey}.title`)}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                {t(`${post.translationKey}.excerpt`)}
              </p>

              <span className="text-sm font-semibold text-[var(--site-accent-blue)] group-hover:underline">
                {t('blog.index.readMore')} →
              </span>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D1B2A] text-white py-16 px-4 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('blog.cta.title')}</h2>
          <p className="text-gray-300 mb-8">{t('blog.cta.subtitle')}</p>
          <button
            onClick={() => {
              trackBlogCtaClick('blog-index', t('blog.cta.button'), 'blog_index_footer');
              navigate(`/${lang}/contact`);
            }}
            className="inline-flex items-center gap-2 bg-[var(--site-accent-blue)] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            {t('blog.cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogIndexPage;
