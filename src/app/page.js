"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { MdArrowOutward } from "react-icons/md";
import Marquee from "@/components/Marquee/Marquee";
import Footer from "@/components/Footer/Footer";
import ShuffleText from "@/components/ShuffleText/ShuffleText";
import GeometricBackground from "@/components/GeometricBackground/GeometricBackground";
import { carouselItems } from "./carouselItems";

import "./home.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();

  // initialize Lenis smooth scrolling instance on window
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      window.lenis = lenis;
    }

    return () => {
      window.lenis = null;
    };
  }, [lenis]);

  // controls geometric background animation on scroll
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".intro",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = -750 * progress;
          const rotation = 360 * progress;

          gsap.to(".geo-bg", {
            y: yMove,
            rotation: rotation,
            duration: 0.1,
            ease: "none",
            overwrite: true,
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  // handles case studies image pinning and scale animations on scroll
  useGSAP(
    () => {
      const images = gsap.utils.toArray(".case-studies-img");

      images.forEach((img, i) => {
        const imgElement = img.querySelector("img");

        ScrollTrigger.create({
          trigger: img,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            gsap.to(imgElement, {
              scale: 2 - self.progress,
              duration: 0.1,
              ease: "none",
            });
          },
        });

        ScrollTrigger.create({
          trigger: img,
          start: "top top",
          end: () =>
            `+=${
              document.querySelector(".case-studies-item").offsetHeight *
              (images.length - i - 1)
            }`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  // handles carousel slide transitions with clip-path animations
  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const projects = gsap.utils.toArray(".project");

      ScrollTrigger.create({
        trigger: ".carousel",
        start: "top top",
        end: `+=${window.innerHeight * (projects.length - 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress * (projects.length - 1);
          const currentSlide = Math.floor(progress);
          const slideProgress = progress - currentSlide;

          if (currentSlide < projects.length - 1) {
            gsap.set(projects[currentSlide], {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            });

            const nextSlideProgress = gsap.utils.interpolate(
              "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              slideProgress
            );

            gsap.set(projects[currentSlide + 1], {
              clipPath: nextSlideProgress,
            });
          }

          projects.forEach((project, index) => {
            if (index < currentSlide) {
              gsap.set(project, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              });
            } else if (index > currentSlide + 1) {
              gsap.set(project, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              });
            }
          });
        },
      });

      gsap.set(projects[0], {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      }}
    >
      <div className="app" ref={container}>
        <section className="hero">
          <div className="hero-img">
            <img src="/images/home/hero.jpeg" alt="" />
          </div>
          <div className="hero-img-overlay"></div>
          <div className="hero-img-gradient"></div>
          <div className="container">
            <div className="hero-copy">
              <div className="hero-copy-col">
                <ShuffleText as="h3" text="Krótka podróż do wnętrza" />
                <ShuffleText as="h1" text="Połączenie sztuki z algorytmami" />
              </div>
              <div className="hero-copy-col">
                <div className="hero-icon">
                  <img src="/images/home/hero-abstract-icon.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intro" id="intro">
          <div className="geo-bg">
            <GeometricBackground />
          </div>
          <Marquee />
          <div className="intro-container">
            <div className="container">
              <div className="col">
                <p className="primary">[ Wprowadzenie ]</p>
              </div>
              <div className="col">
                <div className="intro-copy">
                  <p>
                    Algora zrewolucjonizowała kreatywny potencjał sztucznej
                    inteligencji, przechodząc od podstawowych wyników o niskiej
                    rozdzielczości do tworzenia hiperrealistycznych wizualizacji
                    w wysokiej rozdzielczości, które przekraczają granice
                    wyobraźni i innowacji.
                  </p>
                  <p>
                    Postęp ten otworzył drzwi do potężnych narzędzi do tworzenia
                    wizualnego dla użytkowników na wszystkich poziomach
                    umiejętności, od doświadczonych profesjonalistów po zwykłych
                    twórców. Wywołało to jednak również krytyczne debaty na
                    temat etycznych wyzwań związanych z treściami generowanymi
                    przez sztuczną inteligencję, takich jak spory dotyczące
                    własności intelektualnej, rozpowszechnianie fałszywych
                    informacji i pytania dotyczące istoty prawdziwej ekspresji
                    artystycznej.
                  </p>
                </div>
                <div className="prompt-example">
                  <div className="prompt-example-header">
                    <h4>
                      // PROMPT: Modowy portret science fiction przedstawiający
                      osobę w futurystycznym stroju
                    </h4>
                  </div>
                  <div className="prompt-example-results">
                    <div className="prompt-example-result-item">
                      <div className="prompt-example-result-item-img">
                        <img src="/images/home/prompt-1.jpeg" alt="" />
                        <div className="hero-img-overlay"></div>
                      </div>
                      <div className="prompt-example-result-item-title">
                        <h4>
                          2016 — Zbudowany przy użyciu pionierskich narzędzi
                          generatywnych
                        </h4>
                      </div>
                    </div>
                    <div className="prompt-example-result-item">
                      <div className="prompt-example-result-item-img">
                        <img src="/images/home/prompt-2.jpeg" alt="" />
                        <div className="hero-img-overlay"></div>
                      </div>
                      <div className="prompt-example-result-item-title">
                        <h4>2024 — Utworzony za pomocą Algora V2</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-studies" id="case-studies">
          <div className="case-studies-header">
            <div className="container">
              <ShuffleText
                as="h2"
                text="Poznaj nowe historie sukcesu"
                triggerOnScroll={true}
              />
            </div>
          </div>
          <div className="case-studies-content">
            <div className="container">
              <div className="col">
                <p className="primary">[ Studia przypadku ]</p>
              </div>
              <div className="col">
                <div className="case-studies-copy">
                  <h2>Jak sztuczna inteligencja zmienia granice artystyczne</h2>
                  <p>
                    Generatywna sztuczna inteligencja szybko się rozwinęła,
                    wykraczając poza skromne początki podstawowych efektów
                    wizualnych, tworząc obecnie oszałamiające, realistyczne
                    dzieła sztuki, które rzucają wyzwanie naszemu postrzeganiu
                    kreatywności i technologii.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-studies-items">
          <div className="case-studies-items-content col">
            <div className="case-studies-item case-studies-item-1">
              <div className="container">
                <h3>Sztuka w erze algorytmów</h3>
                <p className="primary">[ Lumina Horizon — Zara Lego ]</p>
                <div className="case-studies-item-inner-img">
                  <img
                    src="/images/home/case-study-1.jpeg"
                    alt="Futuristic AI-generated art"
                  />
                </div>
                <p>
                  Oparta na sztucznej inteligencji instalacja Zary Lego zachwyca
                  publiczność Global Digital Arts Forum, stawiając pytania o
                  połączenie ludzkich intencji i precyzji maszyn. Praca ta
                  podkreśla nieograniczony potencjał sztucznej inteligencji jako
                  kreatywnego partnera w świecie sztuki współczesnej.
                </p>
                <div className="case-studies-item-inner-link">
                  <Link href="/archive">Odkryj podróż</Link>
                  <div className="link-icon">
                    <MdArrowOutward size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="case-studies-item case-studies-item-2">
              <div className="container">
                <h3>Świt mody opartej na sztucznej inteligencji</h3>
                <p className="primary">[ Nici wizji — Olga Marquez ]</p>
                <div className="case-studies-item-inner-img">
                  <img
                    src="/images/home/case-study-2.jpeg"
                    alt="AI-driven fashion design showcase"
                  />
                </div>
                <p>
                  Olga Marquez uruchamia pierwszy magazyn o modzie, którego
                  kuratorem jest w całości przez sztuczną inteligencję,
                  prezentujący futurystyczne projekty i koncepcje, które na nowo
                  definiują granice kreatywności. Choć powszechnie chwalony za
                  innowacyjność, magazyn rozpala debaty na temat roli
                  projektantów w procesie twórczym kierowanym przez maszyny.
                </p>
                <div className="case-studies-item-inner-link">
                  <Link href="/archive">Przeczytaj całą historię</Link>
                  <div className="link-icon">
                    <MdArrowOutward size={24} />
                  </div>
                </div>
              </div>
            </div>
            <div className="case-studies-item case-studies-item-3">
              <div className="container">
                <h3>
                  Wzrost liczby nagród artystycznych wspomaganych przez sztuczną
                  inteligencję
                </h3>
                <p className="primary">
                  [ Syntetyczna rzeczywistość — Abigail Nowak ]
                </p>
                <div className="case-studies-item-inner-img">
                  <img
                    src="/images/home/case-study-3.jpeg"
                    alt="AI-curated artwork showcase"
                  />
                </div>
                <p>
                  Przełomowa wystawa Abigail Nowak, kuratorowana przez sztuczną
                  inteligencję, podkreśla kreatywny potencjał sztuki generowanej
                  maszynowo. Wydarzenie obejmuje fotorealistyczne prace
                  przedstawiające całkowicie fikcyjne tematy, wywołując dyskusję
                  na temat stronniczości, autentyczności i roli sztucznej
                  inteligencji w kształtowaniu przyszłego uznania artystycznego.
                  roli sztucznej inteligencji w kształtowaniu przyszłości
                  artystycznego uznania.
                </p>
                <div className="case-studies-item-inner-link">
                  <Link href="/archive">Eksploruj wystawę</Link>
                  <div className="link-icon">
                    <MdArrowOutward size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="case-studies-items-images col">
            <div className="case-studies-img case-studies-img-1">
              <img src="/images/home/case-study-1.jpeg" alt="" />
              <div className="hero-img-overlay"></div>
              <div className="case-studies-img-link">
                <Link href="/archive">
                  <span>
                    (&nbsp; Zobacz artykuł <MdArrowOutward />
                    &nbsp;)
                  </span>
                </Link>
              </div>
            </div>
            <div className="case-studies-img case-studies-img-2">
              <img src="/images/home/case-study-2.jpeg" alt="" />
              <div className="hero-img-overlay"></div>
              <div className="case-studies-img-link">
                <Link href="/archive">
                  <span>
                    (&nbsp; Zobacz artykuł <MdArrowOutward />
                    &nbsp;)
                  </span>
                </Link>
              </div>
            </div>
            <div className="case-studies-img case-studies-img-3">
              <img src="/images/home/case-study-3.jpeg" alt="" />
              <div className="hero-img-overlay"></div>
              <div className="case-studies-img-link">
                <Link href="/archive">
                  <span>
                    (&nbsp; Zobacz artykuł <MdArrowOutward />
                    &nbsp;)
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="abstract-bg">
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
        </section>

        <section className="works" id="works">
          <div className="works-header">
            <div className="container">
              <ShuffleText
                as="h2"
                text="Ponadczasowa sztuka w nowym świetle"
                triggerOnScroll={true}
              />
            </div>
          </div>

          <div className="works-content">
            <div className="container">
              <div className="col">
                <p className="primary">[ Kreatywne poszukiwania ]</p>
              </div>
              <div className="col">
                <div className="works-copy">
                  <h2>
                    Czy maszyny mogą wprowadzać innowacje tak, jak ludzcy
                    artyści?
                  </h2>
                  <p>
                    Eksperymenty te badają potencjał zaawansowanych narzędzi AI
                    narzędzia, takie jak Midjourney i DALL-E 3, aby na nowo
                    wyobrazić sobie klasyczne arcydzieła poprzez unikalne i
                    przekraczające granice podpowiedzi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="carousel">
          {carouselItems.map((item) => (
            <div
              key={item.id}
              id={`project-${item.id}`}
              className="project"
              style={{
                clipPath:
                  item.id === "01"
                    ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
                    : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
            >
              <div className="project-bg">
                <img src={item.bg} alt="" />

                <div className="hero-img-overlay"></div>
                <div className="hero-img-gradient"></div>
              </div>
              <div className="project-main">
                <img src={item.main} alt="" />
              </div>
              <div className="project-header">
                <div className="project-id">
                  <h2>Archiwum {item.id}</h2>
                </div>
                <div className="project-whitespace"></div>
                <div className="project-title">
                  <h2>{item.title}</h2>
                </div>
              </div>
              <div className="project-info">
                <div className="project-url">
                  <Link href={item.url}>( Podróż )</Link>
                </div>
              </div>
              <Link
                href={item.url}
                className="project-overlay-link"
                aria-label={`View ${item.title} project`}
              />
            </div>
          ))}
        </section>
        <Footer />
      </div>
    </ReactLenis>
  );
}
