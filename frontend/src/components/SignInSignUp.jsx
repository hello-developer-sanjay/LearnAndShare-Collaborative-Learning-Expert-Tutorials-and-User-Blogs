/* eslint-disable react/jsx-no-target-blank */
import { useState } from 'react';
import Register from '../pages/Register';
import Login from '../pages/Login';
import styled from 'styled-components';
import SecurityImage from '../assets/security.gif'; // Import your image
import { Helmet } from "react-helmet";  // Import Helmet

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1d;
  padding: 2rem;
`;

const AuthBox = styled.div`
  background: linear-gradient(135deg, #8a2387, #e94057, #f27121);
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 1000px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  transform: perspective(1000px) rotateY(10deg);
  transition: transform 0.5s ease;
  &:hover {
    transform: perspective(1000px) rotateY(0);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormContainer = styled.div`
  padding: 0rem;
  width: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-right: 2px solid #f27121;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 2px solid #f27121;
  }
`;

const Title = styled.h1`
  font-family: 'Cinzel Decorative', cursive;
  color: #1a1a1d;
  text-align: center;
  margin-bottom: 0rem;
`;

const ToggleFormText = styled.p`
  color: #1a1a1d;
  text-align: center;
  cursor: pointer;
  font-family: 'Cinzel', serif;
  &:hover {
    color: #f27121;
  }
`;


const AuthImage = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SecurityGif = styled.img`
  max-width: 100%;
  border-radius: 0 20px 20px 0;
`;

function SignInSignUp({ showCloseButton }) {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleClose = () => {
    setIsSignUp(false);
  };

  return (
    <Container>
       <Helmet>
    
    <title>HogwartsEdx Login - Unlock the Magic of Learning</title>
 <meta
   name="description"
   content="
Welcome to HogwartsEdx - the premier online learning platform inspired by the magical world of Harry Potter. Log in to access your personalized dashboard, where cutting-edge technology meets enchanting education. Whether you're an aspiring wizard or a tech enthusiast, HogwartsEdx offers a comprehensive range of courses in data science, artificial intelligence, software development, cybersecurity, and more. Join our community to experience interactive lessons, immersive virtual classrooms, and hands-on projects that bring learning to life. Sign in now to start your journey with HogwartsEdx and unlock the magic of advanced technology and education!"
 />
 

 <meta property="og:title" content=" HogwartsEdx Login - Unlock the Magic of Learning" />
 <meta property="og:description" content="The VerifyCertificate page provides users with a seamless interface for verifying and downloading certificates. Users can search for certificates using criteria such as user name, unique ID, and date, with real-time feedback provided via loading indicators and error messages. Upon successful verification, detailed certificate information is displayed, including the user's name, certificate category, and issuance date. Users can conveniently download certificates in PDF format directly from the interface. The page ensures accessibility with labeled form fields and optimized color contrast, while advanced styles and responsive design enhance the user experience across different devices. Implemented with React's state management and Axios for data fetching, the page utilizes the file-saver library for downloading certificates. Styled-components and keyframe animations are employed for a modern design, with intersection observer handling animations and visibility. This comprehensive functionality overview underscores the VerifyCertificate page's utility, accessibility, and user-centric design"/> 
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://HogwartsEdX.vercel.app/login" />
 <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/hogwartscertify.png" />
 <meta property="og:image:alt" content="Sanjay Patidar" />
 <meta property="og:site_name" content=" HogwartsEdx Login - Unlock the Magic of Learning" />
  <link rel="canonical" href="https://HogwartsEdX.vercel.app/login" />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="HogwartsEdx Login - Unlock the Magic of Learning" />
 <meta name="twitter:description" content="Welcome to HogwartsEdx - the premier online learning platform inspired by the magical world of Harry Potter. Log in to access your personalized dashboard, where cutting-edge technology meets enchanting education. Whether you're an aspiring wizard or a tech enthusiast, HogwartsEdx offers a comprehensive range of courses in data science, artificial intelligence, software development, cybersecurity, and more. Join our community to experience interactive lessons, immersive virtual classrooms, and hands-on projects that bring learning to life. Sign in now to start your journey with HogwartsEdx and unlock the magic of advanced technology and education!" />
 <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/hogwartscertify.png" />
 <meta name="twitter:site" content="@sanjaypatidar" />
 <meta name="twitter:creator" content="@sanjaypatidar" />

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
                      "https://HogwartsEdX.vercel.app/login",
                      "https://HogwartsEdX.vercel.app/certificate-verification",
           



         ]
   

       })}
     </script>


    </Helmet>	
      <AuthBox className={`auth-box ${isSignUp ? 'register' : 'login'}`}>
      
        <FormContainer>
          <Title>{isSignUp ? 'Sign Up - HogwartsEdx' : 'Sign In - HogwartsEdx'}</Title>
          <div>{isSignUp ? <Register /> : <Login />}</div>
          <ToggleFormText onClick={toggleForm}>
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </ToggleFormText>
        </FormContainer>
        <AuthImage>
          <SecurityGif src={SecurityImage} alt="Security" />
        </AuthImage>
      </AuthBox>
    </Container>
  );
}

export default SignInSignUp;
