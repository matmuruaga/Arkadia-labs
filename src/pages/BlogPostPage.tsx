// src/pages/BlogPostPage.tsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug } from '@/data/blogPostsData';
import { trackPageView, trackBlogPostView, trackBlogCtaClick } from '@/utils/dataLayer';

const BlogPostPage = () => {
  const { t } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();
  const navigate = useNavigate();

  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;
    trackPageView(`/${lang}/blog/${post.slug}`, t(`${post.translationKey}.title`), lang || 'en');
    trackBlogPostView(post.slug, t(`${post.translationKey}.title`), post.category, lang || 'en');
  }, [post, lang, t]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-4">{t('blog.notFound.title')}</h1>
        <Link to={`/${lang}/blog`} className="text-[var(--site-accent-blue)] underline">
          {t('blog.notFound.back')}
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Render blog body: each paragraph is a separate translation key
  const bodyKeys: string[] = t(`${post.translationKey}.body`, { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-[var(--site-bg-light)]">
      {/* Back nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(`/${lang}/blog`)}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0D1B2A] transition-colors"
          >
            <ArrowLeft size={16} />
            {t('blog.post.backToBlog')}
          </button>
        </div>
      </div>

      {/* Article header */}
      <header className="bg-[#0D1B2A] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--site-accent-blue)]">
              {t(`blog.categories.${post.categoryKey}`)}
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-sm text-gray-400">{formatDate(post.publishDate)}</span>
            <span className="text-gray-500">·</span>
            <span className="text-sm text-gray-400">
              {t('blog.index.readTime', { count: post.readTime })}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight mb-6"
          >
            {t(`${post.translationKey}.title`)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            {t(`${post.translationKey}.excerpt`)}
          </motion.p>
        </div>
      </header>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose-custom"
        >
          {Array.isArray(bodyKeys) &&
            bodyKeys.map((para, i) => {
              // Detect headings: lines starting with ##
              if (para.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className="text-xl md:text-2xl font-bold text-[#0D1B2A] mt-10 mb-4 leading-snug"
                  >
                    {para.replace('## ', '')}
                  </h2>
                );
              }
              // Detect stat callout: lines starting with **
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <div
                    key={i}
                    className="my-6 border-l-4 border-[var(--site-accent-blue)] pl-5 py-2"
                  >
                    <p className="text-[#0D1B2A] font-semibold text-lg">
                      {para.replace(/\*\*/g, '')}
                    </p>
                  </div>
                );
              }
              return (
                <p key={i} className="text-gray-700 leading-relaxed mb-5 text-base">
                  {para}
                </p>
              );
            })}

          {/* In-article CTA */}
          <div className="mt-12 rounded-2xl bg-[#0D1B2A] p-8 text-center">
            <h3 className="text-white text-xl font-bold mb-3">{t('blog.post.ctaTitle')}</h3>
            <p className="text-gray-300 mb-6 text-sm">{t('blog.post.ctaSubtitle')}</p>
            <button
              onClick={() => {
                trackBlogCtaClick(post.slug, t('blog.post.ctaButton'), 'blog_post_inline');
                navigate(`/${lang}/contact`);
              }}
              className="inline-flex items-center gap-2 bg-[var(--site-accent-blue)] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              {t('blog.post.ctaButton')}
            </button>
          </div>
        </motion.div>

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate(`/${lang}/blog`)}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0D1B2A] transition-colors"
          >
            <ArrowLeft size={16} />
            {t('blog.post.backToBlog')}
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
