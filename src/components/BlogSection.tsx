import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, X, Sparkles, Share2, Check } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectProductCategory?: (category: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="blog-section" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold uppercase tracking-widest mb-3 border border-sky-100">
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>The Milenwears Journal & Lens Science</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Perspectives on Light, Craft & Proportions.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              In-depth essays from optical physicists, Italian acetate colorists, and frame architects.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            <span>4 Curated Editions &bull; Updated Bi-Weekly</span>
          </div>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200/80 hover:border-sky-300 shadow-xs hover:shadow-xl hover:shadow-sky-950/5 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-sky-800 border border-slate-200/60 shadow-xs">
                  {post.category}
                </div>
              </div>

              {/* Text Meta & Summary */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author & Read Prompt */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{post.author.name}</p>
                      <p className="text-[10px] text-slate-400">{post.author.role}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-sky-600 group-hover:text-sky-800 flex items-center gap-1">
                    <span>Read Essay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedPost(null)}
          />

          <div
            id="blog-article-reader"
            className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-1 rounded">
                {selectedPost.category}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                  title="Share article link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              
              {/* Cover Banner */}
              <div className="aspect-21/9 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title & Author Info */}
              <div className="space-y-3 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{selectedPost.date}</span>
                  <span>&bull;</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                  {selectedPost.title}
                </h1>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{selectedPost.author.name}</p>
                    <p className="text-xs text-slate-400">{selectedPost.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Editorial Quote Box */}
              <div className="p-6 bg-sky-50/70 rounded-2xl border-l-4 border-sky-600 text-sky-950 font-serif italic text-base sm:text-lg">
                &ldquo;Eyewear is the single accessory that sits directly between your consciousness and the external world. Treat it with architectural reverence.&rdquo;
              </div>

              {/* Footer CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Experience The Milenwears Handcrafted Frames
                  </p>
                  <p className="text-xs text-slate-500">
                    Discover silhouettes calibrated for clarity and balanced proportions.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    window.location.hash = '#shop-section';
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-600 transition-colors shrink-0"
                >
                  Explore Frames &rarr;
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
