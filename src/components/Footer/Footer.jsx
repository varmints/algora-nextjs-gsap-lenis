"use client";
import Link from "next/link";

import "./Footer.css";

const Footer = () => {
  return (
    <>
      <section className="footer-area"></section>

      <footer>
        <div className="container">
          <div className="footer-row footer-content">
            <div className="footer-col">
              <h3>
                Krótka podróż do sztuki opartej na sztucznej inteligencji
                autorstwa Algora © 2025 - Wszelkie prawa zastrzeżone.
              </h3>
            </div>
            <div className="footer-col">
              <div className="footer-sub-col"></div>
              <div className="footer-sub-col footer-links">
                <p className="footer-col-header">[ * Archiwum ]</p>
                <Link href="/archive">
                  <p>Archiwum 101</p>
                </Link>
                <Link href="/archive">
                  <p>Archiwum 102</p>
                </Link>
                <Link href="/archive">
                  <p>Archiwum 103</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-row footer-pattern">
            <p>+</p>
            <p>+</p>
            <p>+</p>
          </div>
          <div className="footer-row">
            <h1>Algora</h1>
          </div>
          <div className="footer-row footer-pattern">
            <p>+</p>
            <p>+</p>
            <p>+</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
