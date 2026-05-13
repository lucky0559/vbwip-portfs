export default function Footer() {
  return (
    <footer className="bg-[#1C1815] border-t border-[#2C2420] py-10">
      <div className="max-w-6xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-['Cormorant_Garamond'] text-lg font-medium tracking-[0.2em] text-[#F8F5F1] uppercase">
          VAB<span className="text-[#B09070]">.</span>
        </span>
        <p className="font-['DM_Sans'] text-xs text-[#C9B9AE] text-center">
          © 2025 Vanessa Aguilar Benipayo · BS Architecture · National University Manila
        </p>
        <a
          href="mailto:benipayovanessa@gmail.com"
          className="font-['DM_Sans'] text-xs tracking-[0.15em] uppercase text-[#C9B9AE] hover:text-[#B09070] transition-colors duration-300"
        >
          benipayovanessa@gmail.com
        </a>
      </div>
    </footer>
  )
}
