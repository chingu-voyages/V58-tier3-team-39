import { GitHub } from './icons/GitHub';
import { Java } from './icons/Java';
import { LinkedIn } from './icons/LinkedIn';
import { Nextjs } from './icons/NextJs';
import { TailwindCSS } from './icons/Tailwind';
import { TypeScript } from './icons/TypeScript';
import { Figma } from './icons/Figma';

const Footer = () => {
  return (
    <footer className="w-full bg-[#CBD5E1] text-[#232925] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Team: full-width section */}
          <section aria-labelledby="team-heading">
            <h2 id="team-heading" className="text-4xl font-semibold mb-4 tracking-widest">
              CHINGU DEMOGRAPHICS
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Each item is a card-like row; icons will be added later */}
              <li className="flex items-center justify-between p-4 rounded-lg border border-white/65">
                <div>
                  <p className="text-lg font-semibold">Valeriy Lysenko</p>
                  <p className="text-sm">
                    Scrum Master / Web Developer
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* icon placeholders */}
                  <a
                    href="https://linkedin.com/in/valeriylysenko"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/Valeriusdev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  {/* <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span> */}
                  {/* <span
                    className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center"
                    aria-hidden="true"
                  >
                    ●
                  </span> */}
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Ekaterina Kushnir</p>
                  <p className="text-sm text-emerald-700">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/ekaterina-kushnir-mikhaylova/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/katiaku"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Rika Miyata</p>
                  <p className="text-sm text-emerald-700">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/rika-miyata-4bab99243/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/Tayrika"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Jazz Bullecer</p>
                  <p className="text-sm text-emerald-700">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jazz-bullecer-89780928a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/jazxbx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Mingshi Hui</p>
                  <p className="text-sm text-emerald-700">UX / UI Designer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/mingshi-hui/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/mingshi0821"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Kevin Llanos</p>
                  <p className="text-sm text-emerald-700">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/kevinllanos7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/KevinLlano"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Jorge Alvarado</p>
                  <p className="text-sm text-emerald-700">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jorgep-alvarado/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/alvarado08"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 bg-white/80 rounded-lg shadow-sm border">
                <div>
                  <p className="text-lg font-semibold">Ruben Aguilar</p>
                  <p className="text-sm text-emerald-700">Web Developer / UI Designer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/ruben-aguilar-/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/rubenaguilardev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
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
                    href="https://github.com/chingu-voyages/V58-tier3-team-39"
                    className="flex items-center gap-3 text-emerald-900 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-8 h-8" />
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
                  <li>
                    <Nextjs className="w-12 h-12" />
                  </li>
                  <li>
                    <TypeScript className="w-12 h-12" />
                  </li>
                  <li>
                    <TailwindCSS className="w-12 h-12" />
                  </li>
                  <li>
                    <Java className="w-12 h-12" />
                  </li>
                  <li>
                    <Figma className="w-12 h-12" />
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
