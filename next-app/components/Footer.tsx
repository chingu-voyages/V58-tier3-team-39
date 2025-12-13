import { GitHub } from './icons/GitHub';
import { Java } from './icons/Java';
import { LinkedIn } from './icons/LinkedIn';
import { Nextjs } from './icons/NextJs';
import { TailwindCSS } from './icons/Tailwind';
import { TypeScript } from './icons/TypeScript';
import { Figma } from './icons/Figma';
import Chingu from './icons/Chingu';
import { Spring } from './icons/Spring';

const Footer = () => {
  return (
    <footer className="w-full pt-22 pb-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Team: full-width section */}
          <section aria-labelledby="team-heading">
            <div className='flex items-center justify-center gap-2 mb-10'>
              <Chingu width={70} height={70} />
              <div id="team-heading" className="text-xl align-center md:text-2xl lg:text-3xl font-semibold tracking-widest">
                  CHINGU DEMOGRAPHICS
              </div>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Each item is a card-like row; icons will be added later */}
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Valeriy Lysenko</p>
                  <p className="text-sm lg:text-sm text-secondary-text">
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
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/Valeriusdev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
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
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Ekaterina Kushnir</p>
                  <p className="text-sm text-secondary-text">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/ekaterina-kushnir-mikhaylova/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/katiaku"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Rika Miyata</p>
                  <p className="text-sm text-secondary-text">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/rika-miyata-4bab99243/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/Tayrika"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Jazz Bullecer</p>
                  <p className="text-sm text-secondary-text">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jazz-bullecer-89780928a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/jazxbx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Mingshi Hui</p>
                  <p className="text-sm text-secondary-text">UX / UI Designer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/mingshi-hui/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/mingshi0821"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Kevin Llanos</p>
                  <p className="text-sm text-secondary-text">Software Engineer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/kevinllanos7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/KevinLlano"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Jorge Alvarado</p>
                  <p className="text-sm text-secondary-text">Web Developer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/jorgep-alvarado/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/alvarado08"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-between p-4 rounded-lg border border-footer-border hover:bg-[#4D77FF]/15 hover:border-[#4D77FF]">
                <div>
                  <p className="text-base lg:text-lg font-bold">Ruben Aguilar</p>
                  <p className="text-sm text-secondary-text">Web Developer / UI Designer</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/ruben-aguilar-/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedIn className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://github.com/rubenaguilardev"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-9 h-9 lg:w-10 lg:h-10 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </li>
              {/* Duplicate / map as needed */}
            </ul>
          </section>

          {/* Project + Technologies beneath team */}
          <section>
            {/* Layout: column on mobile, row on md+; each column has its own heading so headings align */}
            <div className="flex flex-col md:flex-row justify-center items-center text-center mt-2 gap-6">
              <div className="md:basis-1/2">
                <div className="md:basis-1/2 md:text-start">
                  <h3 className="text-xl lg:text-2xl font-semibold mb-4 mt-4">Project</h3>
                  <a
                    href="https://github.com/chingu-voyages/V58-tier3-team-39"
                    className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub className="w-11 h-11 lg:w-12 lg:h-12" />
                    <span className="text-lg lg:text-xl text-secondary-text">
                      Github Repository - November 2025
                    </span>
                  </a>
                </div>
              </div>

              <div className="md:basis-1/2 md:text-start">
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 mt-4">Technologies</h3>
                <ul className="flex flex-wrap items-center gap-3">
                  {/* placeholders for tech icons */}
                  <li>
                    <Nextjs className="w-12 h-12 lg:w-13 lg:h-13" />
                  </li>
                  <li>
                    <TypeScript className="w-11 h-11 lg:w-12 lg:h-12" />
                  </li>
                  <li>
                    <TailwindCSS className="w-11 h-11 lg:w-12 lg:h-12" />
                  </li>
                  <li>
                    <Figma className="w-11 h-11 lg:w-12 lg:h-12" />
                  </li>
                  <li>
                    <Java className="w-11 h-11 lg:w-12 lg:h-12" />
                  </li>
                  <li>
                    <Spring className="w-11 h-11 lg:w-12 lg:h-12" />
                  </li>
                </ul>
              </div>
            </div>
            
            <div className='mt-15 text-center'>
              <p className="text-xs lg:text-sm font-regular border-t border-footer-border pt-8 text-secondary-text">
                &copy; {new Date().getFullYear()} Chingu Demographics. All rights reserved.
              </p>
            </div>
            
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
