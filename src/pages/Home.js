import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiStar, FiShoppingCart, FiEye } from 'react-icons/fi';
import { getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';

const HomeContainer = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.3s ease;
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.isDarkMode 
    ? 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)' 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  overflow: hidden;
  transition: background 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80') center/cover;
    opacity: 0.3;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 1rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: text-shadow 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-weight: 500;
  transition: opacity 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white !important;
  padding: 1rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    color: white !important;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: white !important;
  padding: 1rem 2rem;
  border: 2px solid white;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.primary} !important;
    transform: translateY(-3px);
  }
`;

const FloatingShoe = styled(motion.div)`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingShoeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;

const FeaturedSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  transition: background-color 0.3s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s ease;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCardWrapper = styled(motion.div)`
  background: #fafafa;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const ProductImage = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #ff6b3520, #ff8a6520);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`;

const ProductIcon = styled.div`
  font-size: 3rem;
  color: #ff6b35;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
`;

const ProductDescription = styled.p`
  color: #757575;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ViewButton = styled(Link)`
  background: #ff6b35;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e64a19;
  }
`;

const CategoriesSection = styled.section`
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme.colors.surfaceSecondary};
  transition: background-color 0.3s ease;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
`;

const CategoryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
`;

const CategoryButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const NewsletterSection = styled.section`
  padding: 5rem 2rem;
  background: ${({ theme }) => {
    const isDark = theme.colors.background === '#121212';
    return isDark 
      ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' 
      : 'linear-gradient(135deg, #f5f5f5, #eeeeee)';
  }};
  text-align: center;
  transition: background 0.3s ease;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const NewsletterTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NewsletterDescription = styled.p`
  font-size: 1.125rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s ease;
  line-height: 1.6;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
`;

const NewsletterButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }
`;

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    const products = getFeaturedProducts();
    setFeaturedProducts(products);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Running Shoes',
      description: 'Performance footwear for every runner',
      icon: '🏃‍♂️',
      link: '/products?category=running'
    },
    {
      id: 2,
      name: 'Sneakers',
      description: 'Comfortable everyday footwear',
      icon: '👟',
      link: '/products?category=sneaker'
    },
    {
      id: 3,
      name: 'Boots',
      description: 'Elegant shoes for special occasions',
      icon: '👞',
      link: '/products?category=boots'
    },

  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <HomeContainer theme={theme}>
      <HeroSection theme={theme}>
        <motion.div style={{ y }}>
          <HeroContent>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Step into Style
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the perfect pair of shoes for every occasion
            </HeroSubtitle>
            <HeroButtons
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <PrimaryButton to="/products" theme={theme}>
                Shop Now <FiArrowRight />
              </PrimaryButton>
              <SecondaryButton to="/about" theme={theme}>
                Learn More
              </SecondaryButton>
            </HeroButtons>
          </HeroContent>
        </motion.div>
      </HeroSection>

      <FeaturedSection theme={theme}>
        <SectionTitle theme={theme}>Featured Products</SectionTitle>
        <SectionSubtitle theme={theme}>
          Discover our handpicked selection of premium footwear
        </SectionSubtitle>
        <ProductsGrid>
          {featuredProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsGrid>
      </FeaturedSection>

      <CategoriesSection theme={theme}>
        <SectionTitle theme={theme}>Shop by Category</SectionTitle>
        <SectionSubtitle theme={theme}>
          Find the perfect shoes for your lifestyle
        </SectionSubtitle>
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              theme={theme}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle theme={theme}>{category.name}</CategoryTitle>
              <CategoryDescription theme={theme}>{category.description}</CategoryDescription>
              <CategoryButton to={category.link} theme={theme}>
                Explore <FiArrowRight />
              </CategoryButton>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>

      <NewsletterSection theme={theme}>
        <NewsletterTitle theme={theme}>Stay Updated</NewsletterTitle>
        <NewsletterDescription theme={theme}>
          Subscribe to our newsletter for the latest styles, exclusive offers, and fashion tips
        </NewsletterDescription>
        <NewsletterForm onSubmit={handleNewsletterSubmit}>
          <NewsletterInput
            type="email"
            placeholder="Enter your email address"
            required
            theme={theme}
          />
          <NewsletterButton theme={theme}>Subscribe</NewsletterButton>
        </NewsletterForm>
      </NewsletterSection>
    </HomeContainer>
  );
};

export default Home;
