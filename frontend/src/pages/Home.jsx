import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 20px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/homebg.webp') no-repeat center center fixed;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
    transition: filter 0.3s ease-in-out;
  }

  &:hover::before {
    filter: blur(3px);
  }
`;

const Section = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  animation: ${fadeIn} 1.5s forwards;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.5s 0.3s forwards;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 40px;
  animation: ${fadeIn} 1.5s 0.6s forwards;
`;

const Content = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.5s 0.9s forwards;
`;

const CallToAction = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px 0;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.1);
  }
`;

const Home = () => {
  const sectionsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleGetStartedClick = () => {
    navigate('/explore');
  };

  return (
    <HomeContainer>
 <Helmet>
    
    <title>HogwartsEdX: Where Magic Meets Technology for Next-Level Learning</title>
<meta
 name="description"
 content="
HogwartsEdX is an innovative technology platform that seamlessly merges the enchanting world of magic with cutting-edge learning experiences. At HogwartsEdX, users have the power to create curated category modules and posts tailored to their interests and learning goals. With a focus on personalized learning, users can mark completed posts within specific categories, earning certificates that validate their mastery in magical subjects. These certificates can be easily verified through the dedicated 'certificate-verification' page, ensuring credibility and recognition of users' achievements.

Furthermore, HogwartsEdX offers a unique feature where users can choose to follow or unfollow specific categories, allowing for a customized learning journey. By following a category, users receive timely notifications via their registered email whenever new posts are added, empowering them to stay updated on the latest magical discoveries and educational content. With HogwartsEdX, the possibilities for magical learning are endless, combining the allure of the wizarding world with the transformative power of technology for an unparalleled educational experience."
/>
<link rel="icon" type="image/svg+xml" href="src/assets/hogwarts_logo.png" />


<meta property="og:title" content="HogwartsEdX: Where Magic Meets Technology for Next-Level Learning" />
<meta property="og:description" content="HogwartsEdX is an innovative technology platform that seamlessly merges the enchanting world of magic with cutting-edge learning experiences. At HogwartsEdX, users have the power to create curated category modules and posts tailored to their interests and learning goals. With a focus on personalized learning, users can mark completed posts within specific categories, earning certificates that validate their mastery in magical subjects. These certificates can be easily verified through the dedicated 'certificate-verification' page, ensuring credibility and recognition of users' achievements.

Furthermore, HogwartsEdX offers a unique feature where users can choose to follow or unfollow specific categories, allowing for a customized learning journey. By following a category, users receive timely notifications via their registered email whenever new posts are added, empowering them to stay updated on the latest magical discoveries and educational content. With HogwartsEdX, the possibilities for magical learning are endless, combining the allure of the wizarding world with the transformative power of technology for an unparalleled educational experience."/> 
<meta property="og:type" content="website" />
<meta property="og:url" content="https://HogwartsEdX.vercel.app/" />
<meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/hogwarts_logo.png" />
<meta property="og:image:alt" content="HogwartsEdX" />
<meta property="og:site_name" content=" HogwartsEdX: Where Magic Meets Technology for Next-Level Learning" />
<link rel="canonical" href="https://HogwartsEdX.vercel.app/" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="HogwartsEdX: Where Magic Meets Technology for Next-Level Learning" />
<meta name="twitter:description" content="
HogwartsEdX is an innovative technology platform that seamlessly merges the enchanting world of magic with cutting-edge learning experiences. At HogwartsEdX, users have the power to create curated category modules and posts tailored to their interests and learning goals. With a focus on personalized learning, users can mark completed posts within specific categories, earning certificates that validate their mastery in magical subjects. These certificates can be easily verified through the dedicated 'certificate-verification' page, ensuring credibility and recognition of users achievements.

Furthermore, HogwartsEdX offers a unique feature where users can choose to follow or unfollow specific categories, allowing for a customized learning journey. By following a category, users receive timely notifications via their registered email whenever new posts are added, empowering them to stay updated on the latest magical discoveries and educational content. With HogwartsEdX, the possibilities for magical learning are endless, combining the allure of the wizarding world with the transformative power of technology for an unparalleled educational experience." />
<meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/hogwarts_logo.png" />


<meta name="twitter:site" content="@HogwartsEdX" />
<meta name="twitter:creator" content="@HogwartsEdX" />

<meta name="keywords" content="portfolio,verification , certificate verify , certfication verification, signup , eduxcel ,founder: Sanjay patidar , tech, education, careers, opportunity, personal-portfolio,developer_sanju,sanjay, Sanjay, SANJAY, Sanjay Patidar, SANJAY PATIDAR, SANJAY WEB DEVELOPER, SANJAY DEVELOPER, Full Stack Web Developer, Mern Stack Web Developer, sanjay patidar, sanjay-patidar, professional, web developer portfolio, coder, web development, UI/UX design, Chandigarh University, EduXcel, Indore,contact, developer, programmer, engineer, AI, Artificial Intelligence ,tech enthusiastic, creativity ,creator, work , technology, coding, projects, experiences, resume, cv" />
<meta name="author" content="Sanjay Patidar" />        <script type="application/ld+json">
     {JSON.stringify({
       '@context': 'http://schema.org',
       '@type': 'Person',
       "name": "Sanjay Patidar",
       "birthDate": "1998-07-01",
       "birthPlace": {
         "@type": "Place",
         "address": {
           "@type": "PostalAddress",
           "addressLocality": "Indore"
         }
       },
       "alumniOf": {
         "@type": "CollegeOrUniversity",
         "name": "Chandigarh University",
         "location": {
           "@type": "Place",
           "address": {
             "@type": "PostalAddress",
             "addressLocality": "Chandigarh",
             "addressRegion": "Punjab",
             "addressCountry": "India"
           }
         }
       },
       "address": [
         {
           "@type": "PostalAddress",
           "addressLocality": "Indore",
           "addressRegion": "Madhya Pradesh",
           "postalCode": "452001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Chandigarh",
           "addressRegion": "Punjab",
           "postalCode": "160001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Mumbai",
           "addressRegion": "Maharashtra",
           "postalCode": "400001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Bangalore",
           "addressRegion": "Karnataka",
           "postalCode": "560001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Delhi",
           "addressRegion": "Delhi",
           "postalCode": "110001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Kolkata",
           "addressRegion": "West Bengal",
           "postalCode": "700001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Chennai",
           "addressRegion": "Tamil Nadu",
           "postalCode": "600001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Hyderabad",
           "addressRegion": "Telangana",
           "postalCode": "500001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Pune",
           "addressRegion": "Maharashtra",
           "postalCode": "411001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Ahmedabad",
           "addressRegion": "Gujarat",
           "postalCode": "380001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Jaipur",
           "addressRegion": "Rajasthan",
           "postalCode": "302001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Lucknow",
           "addressRegion": "Uttar Pradesh",
           "postalCode": "226001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Bhopal",
           "addressRegion": "Madhya Pradesh",
           "postalCode": "462001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Nagpur",
           "addressRegion": "Maharashtra",
           "postalCode": "440001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Visakhapatnam",
           "addressRegion": "Andhra Pradesh",
           "postalCode": "530001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Kochi",
           "addressRegion": "Kerala",
           "postalCode": "682001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Guwahati",
           "addressRegion": "Assam",
           "postalCode": "781001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Bhubaneswar",
           "addressRegion": "Odisha",
           "postalCode": "751001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Dehradun",
           "addressRegion": "Uttarakhand",
           "postalCode": "248001",
           "addressCountry": "India"
         },
         {
           "@type": "PostalAddress",
           "addressLocality": "Raipur",
           "addressRegion": "Chhattisgarh",
           "postalCode": "492001",
           "addressCountry": "India"
         }
       ],
       "worksFor": {
         "@type": "Organization",
         "name": "HogwartsEdX" 
       },
       "url": "https://HogwartsEdX.vercel.app/",
       "sameAs": [
         "https://www.linkedin.com/in/sanjay-patidar-25b580292/",
         "https://github.com/hello-developer-sanjay",
         "https://www.instagram.com/sanjay_patidar_mcmxcviii/",
         "https://HogwartsEdX.vercel.app/",
                    "https://HogwartsEdX.vercel.app/certificate-verification",
         



       ]
 

     })}
   </script>


  </Helmet>	

      <Section ref={el => sectionsRef.current[0] = el}>
        <Title>Welcome to HogwartsEdX</Title>
      </Section>
      <Section ref={el => sectionsRef.current[1] = el}>
        <Subtitle>Unleash the Magic of Learning</Subtitle>
      </Section>
      <Section ref={el => sectionsRef.current[2] = el}>
        <Content>Explore courses that take you on a magical journey through technology and beyond. Learn with the best, from the best, and become the best version of yourself.</Content>
      </Section>
      <Section ref={el => sectionsRef.current[3] = el}>
        <CallToAction onClick={handleGetStartedClick} aria-label="Get Started">Get Started</CallToAction>
      </Section>
      </HomeContainer>
  );
};

export default Home;
    
