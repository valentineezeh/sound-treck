import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <div className="footer">
    <div className="footer-inner">
      <ul className="footer__nav">
        <li className="footer__item">
          <Link to="/" className="footer__link">
            Privacy
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/" className="footer__link">
            Terms of Use
          </Link>
        </li>
        <li className="footer__item">
          <Link to="/" className="footer__link">
            Copyright Policy
          </Link>
        </li>
      </ul>

      <div className="footer__social">
        <div className="footer__social-block">
          <a
            href="https://www.facebook.com/gidimediacity/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-item"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com/gidimediacity"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-item"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/gidimediacity/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-item"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Gidi Media City Entertainment Nig. Ltd.
        </div>
      </div>
    </div>
  </div>
);
