import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    margin-bottom: 0.5rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: white;
    text-decoration: none;
    opacity: 0.9;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;

  svg {
    flex-shrink: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Newsletter = styled.div`
  margin-top: 1rem;

  input {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
    }
  }

  button {
    background: white;
    color: #667eea;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
    }
  }
`;

const BottomFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>SoleMate</h3>
          <p>
            Your premier destination for quality footwear. We offer the latest trends 
            and classic styles to keep you stepping in comfort and style.
          </p>
          <SocialLinks>
            <SocialLink href="#" aria-label="Facebook">
              <FiFacebook />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="#" aria-label="YouTube">
              <FiYoutube />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLinks>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Shopping Cart</Link>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Categories</h3>
          <FooterLinks>
            <Link to="/products?category=running">Running Shoes</Link>
            <Link to="/products?category=casual">Casual Shoes</Link>
            <Link to="/products?category=basketball">Basketball Shoes</Link>
            <Link to="/products?category=boots">Boots</Link>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ContactInfo>
            <FiMapPin />
            <span>123 Shoe Street, Fashion District, NY 10001</span>
          </ContactInfo>
          <ContactInfo>
            <FiPhone />
            <span>+1 (555) 123-4567</span>
          </ContactInfo>
          <ContactInfo>
            <FiMail />
            <span>info@solemate.com</span>
          </ContactInfo>
          
          <Newsletter>
            <h4>Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </Newsletter>
        </FooterSection>
      </FooterContent>

      <BottomFooter>
        <p>&copy; 2024 SoleMate. All rights reserved. | Privacy Policy | Terms of Service</p>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;
