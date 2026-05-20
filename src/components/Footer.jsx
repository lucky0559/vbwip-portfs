export default function Footer() {
  return (
    <footer className="bg-[oklch(14%_0.008_52)] border-t border-[oklch(30%_0.020_52)]/40 py-10">
      <div className="max-w-6xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-['Cormorant_Garamond'] text-lg font-medium tracking-[0.2em] text-[oklch(97.5%_0.006_65)] uppercase">
          VAB<span className="text-[oklch(64%_0.057_55)]">.</span>
        </span>
        <p className="font-['DM_Sans'] text-xs text-[oklch(76%_0.025_55)] text-center">
          © 2025 Vanessa Aguilar Benipayo · BS Architecture · National University Manila
        </p>
        <a
          href="mailto:benipayovanessa@gmail.com"
          className="font-['DM_Sans'] text-xs tracking-[0.15em] uppercase text-[oklch(76%_0.025_55)] hover:text-[oklch(64%_0.057_55)]"
          style={{ transition: 'color 200ms var(--ease-out)' }}
        >
          benipayovanessa@gmail.com
        </a>
      </div>
    </footer>
  )
}
