import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated, config } from '@react-spring/web';
import '../styles/Footer.css';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence,  } from "framer-motion";
import { FaLinkedin,FaTwitter, FaInstagram, FaGithub, FaUsers } from "react-icons/fa";

const SocialIconWrapper = ({ icon, label, link }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
    return (
      <div style={{ position: 'relative' }} onMouseEnter={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)}>
        <SocialIcon
          color={icon.props.color}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {icon}
        </SocialIcon>
        <Tooltip visible={isTooltipVisible}>{label}</Tooltip>
      </div>
    );
  };
  const SocialIconsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin-top: 2rem;
`;
const Next = styled.h1`
font-size: 1.1rem;
color: #f3f3f3;
margin-bottom: 1rem;
line-height: 1.4;
text-align: justify;
border-left: 4px solid #5d00ff;
border-right: 4px solid #5d00ff;

padding-left: 2px;
padding-right:2px;
border-radius: 8px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${props => props.color || '#ff6347'};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    background 0.3s ease;

  &:hover {
    transform: scale(1.2) rotate(360deg);
    background: ${props => props.color || '#e74c3c'};
  }

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }

  &:not(:last-child) {
    margin-right: 0.8rem;
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0)
    );
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 50%;
  }

  &:hover:before {
    transform: translateY(0);
  }

  /* Add a heartbeat animation for extra flair */
  animation: heartbeat 1.5s infinite;

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
  
const links = [
    { to: "/", text: "Home" },

    { to: "/login", text: "Login" },
    { to: "/add-post", text: "Add Post" },

    { to: "/category", text: "Courses" },
    { to: "/certificate-verification", text: "Certificate Verification" },

    { to: "/dashboard", text: "Dashboard" },
    { to: "https://hogwartsedx.vercel.app/sitemap.xml", text: "Sitemap" },

];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <FooterLogo />
                <FooterLinks />
                <FooterContact />
                <FooterAbout />
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 HogwartsEdX. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
const socialButtons = [
    { icon: <FaLinkedin />, label: "LinkedIn", link: "https://www.linkedin.com/in/sanjay-patidar-25b580292" },
    { icon: <FaGithub />, label: "GitHub", link: "https://github.com/hello-developer-sanjay" },
    { icon: <FaTwitter />, label: "Twitter", link: "#" },
    { icon: <FaInstagram />, label: "Instagram", link: "https://www.instagram.com/sanjay_patidar_mcmxcviii" },
  ];
const FooterLogo = () => {
    const [inView, setInView] = useState(false);
    const logoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            });
        });

        if (logoRef.current) {
            observer.observe(logoRef.current);
        }

        return () => {
            if (logoRef.current) {
                observer.unobserve(logoRef.current);
            }
        };
    }, []);

    const logoSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(50px)',
        config: config.gentle,
        delay: 200
    });

    return (
        <animated.div ref={logoRef} className="footer-logo" style={logoSpring}>
            <h1>HogwartsEdX</h1>
            <p>Where Magic Meets Technology for Next-Level Learning</p>
            <AnimatePresence>
      <SocialIconsContainer>
      {socialButtons.map((button, index) => (
        <SocialIconWrapper key={index} icon={button.icon} label={button.label} link={button.link} />
      ))}
    </SocialIconsContainer>
      </AnimatePresence>
        </animated.div>
    );
};

const FooterLinks = () => {
    const [inView, setInView] = useState(false);
    const linksRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            });
        });

        if (linksRef.current) {
            observer.observe(linksRef.current);
        }

        return () => {
            if (linksRef.current) {
                observer.unobserve(linksRef.current);
            }
        };
    }, []);

    const linksSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(50px)',
        config: config.gentle,
        delay: 400
    });

    return (
        <animated.div ref={linksRef} className="footer-links" style={linksSpring}>
            <h2>Navigation</h2>
            <ul>
                {links.map((link, index) => (
                    <FooterLink key={link.to} link={link} inView={inView} index={index} />
                ))}
            </ul>
        </animated.div>
    );
};
const Tooltip = styled.div`
position: absolute;
top: -40px;
border: 2px solid #ff6b6b;

left: 50%;
transform: translateX(-50%);
background-color: #333;
color: #fff;
padding: 8px 12px;
border-radius: 8px;
font-size: 14px;
font-weight: bold;
opacity: ${props => (props.visible ? 1 : 0)};
transition: opacity 0.3s ease;
z-index: 999;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FooterLink = ({ link, inView, index }) => {
    const [hovered, setHovered] = useState(false);
    const linkSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(50px)',
        config: config.wobbly,
        delay: 400 + index * 50
    });

    return (
        <animated.li style={linkSpring}>
            <Link to={link.to} style={{ textDecoration: hovered ? 'underline' : 'none' }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                {link.text}
            </Link>
        </animated.li>
    );
};

const FooterContact = () => {
    const [inView, setInView] = useState(false);
    const contactRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            });
        });

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => {
            if (contactRef.current) {
                observer.unobserve(contactRef.current);
            }
        };
    }, []);

    const contactSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(50px)',
        config: config.gentle,
        delay: 600
    });

    return (
        <animated.div ref={contactRef} className="footer-contact" style={contactSpring}>
            <h2>Contact Us</h2>
            <Next>
  Contact Us 
  <button 
    onClick={() => window.location.href = 'tel:+91 9165751109'} 
    style={{
      marginLeft: '4px',
      color: '#000501',
      padding: '2px 4px',
      border: '2px solid #ff6b6b',
      borderRadius: '30px',
      cursor: 'pointer',
      boxShadow: '0px 0px 10px #ffd700'
    }}
  >    <span role="img" aria-label="Phone" className="bounce">📞</span>

    <span className="call-text">Call Now</span>
  </button>
</Next>            <Next>
  write an Email: 

<button
  onClick={() => window.location.href = 'mailto:sanjay.patidar.eduxcel@gmail.com'}
  style={{
    marginLeft: '4px',
    color: '#000501',
    padding: '2px 4px',
    border: '2px solid #ff6b6b',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0px 0px 10px #ffd700'
  }}
>
  <span role="img" aria-label="Mail" className="slide-in-bounce">✉️</span>
  <span className="mail-text">Email </span>
</button>


</Next>
        </animated.div>
    );
};

const FooterAbout = () => {
    const [inView, setInView] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            });
        });

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => {
            if (aboutRef.current) {
                observer.unobserve(aboutRef.current);
            }
        };
    }, []);

    const aboutSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(50px)',
        config: config.gentle,
        delay: 800
    });

    return (
        <animated.div ref={aboutRef} className="footer-about" style={aboutSpring}>
            <h2>About HogwartsEdX</h2>
            <p>Founded by Sanjay Patidar, HogwartsEdX is a place where magic meets technology. Our mission is to provide top-notch education in the magical arts of technology. Join us and embark on a journey of discovery and learning.</p>
            
        </animated.div>
    );
};

export default Footer;
