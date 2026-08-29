import { motion } from 'framer-motion'
import { Clapperboard, Play } from 'lucide-react'
import { videos } from '../data/PortfolioData'

export default function Videos() {
  return (
    <section id="videos" className="relative scroll-mt-28 px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-12">
          <h2 className="flex items-center gap-3 font-display text-3xl font-semibold text-white sm:text-4xl"><Clapperboard className="text-cyan-300" size={32} /><span className="font-mono text-cyan-300">&gt;</span> MEDIA_LOGS</h2>
          <div className="mt-4 h-1 w-20 bg-cyan-300" />
        </motion.div>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <motion.article key={video.videoId} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group overflow-hidden rounded-xl border border-white/10 bg-black/50 transition-colors duration-300 hover:border-cyan-300/60">
                <div className="relative aspect-video w-full overflow-hidden">
                  <iframe title={video.title} src={`https://www.youtube-nocookie.com/embed/${video.videoId}`} className="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
                  <div className="pointer-events-none absolute inset-0 border border-cyan-300/20 transition-colors group-hover:border-cyan-300/50" />
                </div>
                <div className="relative p-5"><Play size={16} className="absolute right-4 top-4 text-cyan-300/60" /><h3 className="truncate pr-7 font-display text-xl text-white transition-colors group-hover:text-cyan-200">{video.title}</h3><p className="mt-2 line-clamp-2 font-mono text-sm leading-6 text-white/50">{video.description}</p></div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-cyan-300/25 bg-panel/60 p-8 text-center"><Clapperboard className="mx-auto text-cyan-300" size={30} /><p className="mt-3 font-medium text-white">Media logs are coming soon.</p><p className="mt-1 text-sm text-white/55">Add YouTube video IDs in PortfolioData.js to publish videos here.</p></div>
        )}
      </div>
    </section>
  )
}
