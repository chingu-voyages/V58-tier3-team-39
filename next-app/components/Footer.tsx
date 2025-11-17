const Footer = () => {
  return (
    <footer className="w-full bg-emerald-50 text-emerald-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Team: full-width section */}
          <section aria-labelledby="team-heading">
            <h2 id="team-heading" className="text-2xl font-semibold mb-4">
              Team
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Each item is a card-like row; icons will be added later */}
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  {/* icon placeholders */}
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Member Name</p>
                  <p className="text-sm text-emerald-700">Role / Title</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                  <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span>
                </div>
              </li>
              {/* Duplicate / map as needed */}
            </ul>
          </section>

          {/* Project + Technologies beneath team */}
          <section>
            {/* Layout: column on mobile, row on md+; each column has its own heading so headings align */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="md:basis-1/2">
                <h3
                  id="project-heading"
                  className="text-2xl font-semibold mb-4"
                >
                  Project
                </h3>
                <div className="flex items-center gap-4 mb-0">
                  <a
                    href="#"
                    className="flex items-center gap-3 text-emerald-900 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow">
                      GH
                    </span>
                    <span className="text-sm">
                      Github Project Link - November 2025
                    </span>
                  </a>
                </div>
              </div>

              <div className="md:basis-1/2">
                <h3 className="text-2xl font-semibold mb-4">Technologies</h3>
                <ul className="flex flex-wrap items-center gap-3">
                  {/* placeholders for tech icons */}
                  <li className="w-12 h-12 bg-white/90 rounded flex items-center justify-center">
                    TS
                  </li>
                  <li className="w-12 h-12 bg-white/90 rounded flex items-center justify-center">
                    R
                  </li>
                  <li className="w-12 h-12 bg-white/90 rounded flex items-center justify-center">
                    T
                  </li>
                  <li className="w-12 h-12 bg-white/90 rounded flex items-center justify-center">
                    F
                  </li>
                  <li className="w-12 h-12 bg-white/90 rounded flex items-center justify-center">
                    N
                  </li>
                  <li className="w-12 h-12 bg-white/90 rounded flex items-center justify-center">
                    D
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-emerald-700/80">
              Disclaimer: This website and its associated services are provided
              for demonstrative and educational purposes only.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
