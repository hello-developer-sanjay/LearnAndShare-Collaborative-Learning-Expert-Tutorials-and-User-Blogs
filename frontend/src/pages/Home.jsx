import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    background: url('https://sanjaybasket.s3.ap-south-1.amazonaws.com/background.jpg') no-repeat center center fixed;
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
    position: relative;
    overflow: hidden;
    background: linear-gradient(45deg, #ff6f00, #ffcc80);
    color: #1a1a1a;
    padding: 0.6rem 0.8rem;
    border: 2px solid #ff6f00;
    border-radius: 30px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s, color 0.3s;
    cursor: pointer;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);

    &:hover {
      background: linear-gradient(to bottom right, #8a2be2, #4a90e2);
      color: #fff;
      transform: translateY(-7px);
      box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.5);
    }

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(45deg, #ff6f00, #ffcc80);
      border-radius: 30px;
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s;
    }

    &:hover:before {
      transform: scaleX(1);
      transform-origin: bottom left;
    }

    &:after {
      content: 'Explore'; /* Display better text here */
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 1rem;
      font-weight: bold;
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
    }

    &:hover:after {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.2);
    }
  `;const CarouselContainer = styled.div`
  width: 100%;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  max-width: 800px;
  border-radius: 10px;
  transition: transform 0.3s ease;

 
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 2200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <HomeContainer>
      <Helmet>
    
    <title>LearnAndShare | Collaborative Learning, Expert Tutorials, and User Blogs</title>
<meta
 name="description"
 content="
LearnAndShare is an innovative educational platform merging engaging content with cutting-edge learning experiences. At LearnAndShare, users can create curated category modules and posts tailored to their interests and learning goals. With a focus on personalized learning, users can mark completed posts within specific categories, earning certificates that validate their mastery in various subjects. These certificates can be easily verified through the dedicated 'certificate-verification' page, ensuring credibility and recognition of user achievements.

Furthermore, LearnAndShare offers a unique feature where users can choose to follow or unfollow specific categories, allowing for a customized learning journey. By following a category, users receive timely notifications via their registered email whenever new posts are added, empowering them to stay updated on the latest educational discoveries and content. With LearnAndShare, the possibilities for learning are endless, combining comprehensive educational resources with the transformative power of technology for an unparalleled learning experience."
/>

<link rel="icon" type="image/svg+xml" href="src/assets/learnandshare-logo.png" />

<meta property="og:title" content="LearnAndShare | Collaborative Learning, Expert Tutorials, and User Blogs" />
<meta property="og:description" content="LearnAndShare is an innovative educational platform merging engaging content with cutting-edge learning experiences. At LearnAndShare, users can create curated category modules and posts tailored to their interests and learning goals. With a focus on personalized learning, users can mark completed posts within specific categories, earning certificates that validate their mastery in various subjects. These certificates can be easily verified through the dedicated 'certificate-verification' page, ensuring credibility and recognition of user achievements.

Furthermore, LearnAndShare offers a unique feature where users can choose to follow or unfollow specific categories, allowing for a customized learning journey. By following a category, users receive timely notifications via their registered email whenever new posts are added, empowering them to stay updated on the latest educational discoveries and content. With LearnAndShare, the possibilities for learning are endless, combining comprehensive educational resources with the transformative power of technology for an unparalleled learning experience."/> 
<meta property="og:type" content="website" />
<meta property="og:url" content="https://learnandshare.vercel.app/" />
<meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/learnandshare-logo.png" />
<meta property="og:image:alt" content="LearningLog" />
<meta property="og:site_name" content="LearnAndShare | Collaborative Learning, Expert Tutorials, and User Blogs" />
<link rel="canonical" href="https://learnandshare.vercel.app/" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="LearnAndShare | Collaborative Learning, Expert Tutorials, and User Blogs" />
<meta name="twitter:description" content="
LearnAndShare is an innovative educational platform merging engaging content with cutting-edge learning experiences. At LearnAndShare, users can create curated category modules and posts tailored to their interests and learning goals. With a focus on personalized learning, users can mark completed posts within specific categories, earning certificates that validate their mastery in various subjects. These certificates can be easily verified through the dedicated 'certificate-verification' page, ensuring credibility and recognition of user achievements.

Furthermore, LearnAndShare offers a unique feature where users can choose to follow or unfollow specific categories, allowing for a customized learning journey. By following a category, users receive timely notifications via their registered email whenever new posts are added, empowering them to stay updated on the latest educational discoveries and content. With LearnAndShare, the possibilities for learning are endless, combining comprehensive educational resources with the transformative power of technology for an unparalleled learning experience." />
<meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/learnandshare-logo.png" />


<meta name="twitter:site" content="@LearnAndShare" />
<meta name="twitter:creator" content="@LearnAndShare" />

<meta name="keywords" content="educational blogs, tutorials, informative articles, personalized learning, curated modules, certificate verification, category notifications, learning journey, educational content, expert-written articles, how-to guides, academic resources, user-generated content, learning platform, online education, study resources, learning insights, educational discoveries, engaging content, educational achievements" />
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
         "name": "LearnAndShare" 
       },
       "url": "https://learnandshare.vercel.app/",
       "sameAs": [
         "https://www.linkedin.com/in/sanjay-patidar-25b580292/",
         "https://github.com/hello-developer-sanjay",
         "https://www.instagram.com/sanjay_patidar_mcmxcviii/",
         "https://learnandshare.vercel.app/",
                    "https://learnandshare.vercel.app/certificate-verification",
         



       ]
 

     })}
   </script>


  </Helmet>	
      <CarouselContainer>
        <Slider {...settings}>
          <div>
            <CarouselImage src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/house+2.webp" alt="Hogwarts Logo" />
          </div>
          <div>
            <CarouselImage src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/house+1.webp" alt="Hogwarts House" />
          </div>
          <div>
            <CarouselImage src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/house_3.webp" alt="Hogwarts Logo" />
          </div>
        </Slider>
      </CarouselContainer>
      <Section ref={el => sectionsRef.current[0] = el}>
        <Title>Welcome to LearnAndShare</Title>
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
