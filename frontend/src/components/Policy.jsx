import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { acceptPolicy } from '../actions/authActions';
import AddPostForm from './AddPostForm';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Container = styled.div`
    padding: 1px;
    max-width: 800px;
    margin: auto;
    font-family: 'Arial', sans-serif;
    animation: ${fadeIn} 1s ease-in-out;
    @media (max-width: 768px) {
        padding: 0px;
    }
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-align: center;
    color: #2c3e50;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const SubHeading = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 30px;
    color: #34495e;
    font-weight: 600;
    letter-spacing: 1px;
    line-height: 1.3;
    text-align: center;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        width: 80%;
        height: 2px;
        background-color: #34495e;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const Paragraph = styled.p`
    font-size: 1rem;
    margin-bottom: 30px;
    color: #3C160E;
    line-height: 1.6;
    text-align: justify;
    padding: 0 20px;
    &:first-of-type {
        font-size: 1.2rem;
        font-weight: 500;
        color: #2c3e50;
    }
`;

const AcceptButton = styled.button`
    display: block;
    background-color: #18053D;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 50px auto;
    text-align: center;
    transition: background-color 0.3s ease;
    box-shadow: 0 10px 20px rgba(253, 95, 0, 0.3);
    &:hover {
        background-color: #ff6e00;
    }
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(253, 95, 0, 0.5);
    }
`;

const Link = styled.a`
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
    font-weight: 600;
    &:hover {
        color: #2980b9;
    }
    &:focus {
        outline: none;
        text-decoration: underline;
    }
`;

const List = styled.ul`
    margin-left: 20px;
    list-style: disc;
    color: #070212;
    font-size: 1.1rem;
`;
const Policy = () => {
    const dispatch = useDispatch();
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user && user.policyAccepted) {
            setPolicyAccepted(true);
        }
    }, [user]);

    const handleAcceptPolicy = () => {
        dispatch(acceptPolicy());
        setPolicyAccepted(true);
    };

    return (
        <Container>
            {!policyAccepted ? (
                <div>
                    <Heading>Welcome to LearnAndShare</Heading>
                    <Paragraph>
                        Before you can submit a post, please read and accept our comprehensive privacy policy.
                    </Paragraph>

                    <SubHeading>Data Collection and Usage</SubHeading>
                    <Paragraph>
                        We collect user-submitted content, including code snippets, and other information you provide when using our services. This data is used to enhance user experience and maintain the quality of our services. Your personal data, including name and email, is stored securely and used solely for authentication and communication purposes. We do not sell or share your personal information with third parties.
                    </Paragraph>

                    <SubHeading>General Data Protection Regulation (GDPR)</SubHeading>
                    <Paragraph>
                        If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). These rights include:
                    </Paragraph>
                    <List>
                        <li>The right to access your personal data</li>
                        <li>The right to rectify any inaccurate personal data</li>
                        <li>The right to request the erasure of your personal data</li>
                        <li>The right to restrict the processing of your personal data</li>
                        <li>The right to data portability</li>
                        <li>The right to object to the processing of your personal data</li>
                    </List>
                    <Paragraph>
                        To exercise these rights, please contact us at <Link href="mailto:privacy@hogwartsedx.com" aria-label="Email privacy team at HogwartsEdx">privacy@hogwartsedx.com</Link>. For more information, visit the official <Link href="https://gdpr-info.eu/" aria-label="Visit the GDPR official website">GDPR website</Link>.
                    </Paragraph>

                    <SubHeading>California Consumer Privacy Act (CCPA)</SubHeading>
                    <Paragraph>
                        If you are a resident of California, you have certain rights under the California Consumer Privacy Act (CCPA). These include:
                    </Paragraph>
                    <List>
                        <li>The right to know what personal information we collect and how it is used</li>
                        <li>The right to request the deletion of your personal information</li>
                        <li>The right to opt-out of the sale of your personal information</li>
                    </List>
                    <Paragraph>
                        To exercise these rights, please contact us at <Link href="mailto:privacy@hogwartsedx.com" aria-label="Email privacy team at HogwartsEdx">privacy@hogwartsedx.com</Link>. For more details, visit the official <Link href="https://oag.ca.gov/privacy/ccpa" aria-label="Visit the CCPA official website">CCPA website</Link>.
                    </Paragraph>

                    <SubHeading>Information Technology Act, 2000 (India)</SubHeading>
                    <Paragraph>
                        If you are a resident of India, your data is protected under the Information Technology Act, 2000, and its amendments. This law provides you with the following rights:
                    </Paragraph>
                    <List>
                        <li>The right to access your personal data</li>
                        <li>The right to correct any inaccurate personal data</li>
                        <li>The right to withdraw consent for the processing of your personal data</li>
                    </List>
                    <Paragraph>
                        To exercise these rights, please contact us at <Link href="mailto:privacy@learnandshare.com" aria-label="Email privacy team at LearnAndShare">privacy@learnandshare.com</Link>. For more information, visit the official <Link href="https://www.meity.gov.in/content/cyber-laws" aria-label="Visit the IT Act official website">IT Act website</Link>.
                    </Paragraph>

                    <SubHeading>Security Measures</SubHeading>
                    <Paragraph>
                        We use DOMPurify to filter out malicious content from user inputs to maintain a safe environment for all users. Additionally, we implement industry-standard security measures to protect your data, including encryption and secure storage solutions.
                    </Paragraph>

                    <SubHeading>Contact Information</SubHeading>
                    <Paragraph>
                        If you have any questions or concerns about our privacy policy, please contact us at <Link href="mailto:privacy@learnandshare.com" aria-label="Email privacy team at learnandshare">privacy@learnandshare.com</Link>.
                    </Paragraph>

                    <AcceptButton onClick={handleAcceptPolicy} aria-label="Accept privacy policy">Accept Policy</AcceptButton>
                </div>
            ) : (
                <AddPostForm />
            )}
        </Container>
    );
};

export default Policy;
