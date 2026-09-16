const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a href="#home" className="site-footer__brand" aria-label="Back to top">VAB<span>.</span></a>
        <p>© {year} Vanessa Aguilar Benipayo · BS Architecture · National University Manila</p>
        <div className="site-footer__links">
          <a href="#works">Selected work</a>
          <a href="mailto:benipayovanessa@gmail.com">Email ↗</a>
        </div>
      </div>
    </footer>
  )
}
