import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const AboutHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const AboutTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
  transition: color 0.3s ease;
`;

const AboutSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  transition: color 0.3s ease;
`;

const AboutContent = styled(motion.div)`
  display: grid;
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;
`;

const AboutSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
  transition: color 0.3s ease;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.3s ease;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ValuesSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ValueCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: color 0.3s ease;
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: 'Inter', sans-serif;
  transition: color 0.3s ease;
`;

const TeamSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const MemberAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

const MemberName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
  transition: color 0.3s ease;
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
`;

const MemberBio = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: 'Inter', sans-serif;
  transition: color 0.3s ease;
`;

const ContactSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surfaceSecondary};
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
  margin-top: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  transition: color 0.3s ease;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto 2rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.3s ease;
`;

const ContactButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const About = () => {
  const { theme } = useTheme();

  return (
    <AboutContainer>
      <AboutHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AboutTitle theme={theme}>About SoleMate</AboutTitle>
        <AboutSubtitle theme={theme}>
          We're passionate about bringing you the finest footwear that combines style, comfort, and quality. Our journey began with a simple mission: to make every step count.
        </AboutSubtitle>
      </AboutHeader>

      <AboutContent>
        <AboutSection
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle theme={theme}>Our Story</SectionTitle>
          <SectionText theme={theme}>
            Founded in 2025, SoleMate emerged from a deep passion for footwear and a commitment to quality. What started as a small local shop has grown into a trusted destination for shoe enthusiasts across the country.
          </SectionText>
          <SectionText theme={theme}>
            We believe that the right pair of shoes can transform not just your outfit, but your entire day. That's why we carefully curate our collection, working with the best brands and artisans to bring you footwear that exceeds expectations.
          </SectionText>
        </AboutSection>

        <AboutSection
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle theme={theme}>Our Mission</SectionTitle>
          <SectionText theme={theme}>
            At SoleMate, we're committed to providing exceptional customer service and expert guidance to help you find the perfect pair of shoes. Whether you're looking for everyday comfort, athletic performance, or statement style, we're here to help you step into confidence.
          </SectionText>
          <SectionText theme={theme}>
            We believe in sustainable practices and ethical sourcing, ensuring that every step we take together is one toward a better future for our community and our planet.
          </SectionText>
        </AboutSection>

        <ValuesSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ValueCard
            theme={theme}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ValueIcon theme={theme}>🌟</ValueIcon>
            <ValueTitle theme={theme}>Quality First</ValueTitle>
            <ValueDescription theme={theme}>
              We never compromise on quality. Every shoe in our collection meets our high standards for durability, comfort, and style.
            </ValueDescription>
          </ValueCard>

          <ValueCard
            theme={theme}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ValueIcon theme={theme}>🤝</ValueIcon>
            <ValueTitle theme={theme}>Customer Focus</ValueTitle>
            <ValueDescription theme={theme}>
              Your satisfaction is our priority. We provide personalized service and expert advice to ensure you find exactly what you're looking for.
            </ValueDescription>
          </ValueCard>

          <ValueCard
            theme={theme}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ValueIcon theme={theme}>🌱</ValueIcon>
            <ValueTitle theme={theme}>Sustainability</ValueTitle>
            <ValueDescription theme={theme}>
              We're committed to eco-friendly practices and supporting brands that share our values for environmental responsibility.
            </ValueDescription>
          </ValueCard>
        </ValuesSection>

        <ContactSection
          theme={theme}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ContactTitle theme={theme}>Get in Touch</ContactTitle>
          <ContactText theme={theme}>
            Have questions about our products or need help finding the perfect fit? We'd love to hear from you and help you on your footwear journey.
          </ContactText>
          <ContactButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            theme={theme}
          >
            Contact Us
          </ContactButton>
        </ContactSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;
