import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

// Simplified styled components with theme support
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  letter-spacing: -0.025em;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchBar = styled.div`
  position: relative;
  margin: 0 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.surfaceSecondary};
  color: ${({ theme }) => theme.colors.text};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartButton = styled(motion.button)`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.colors.borderLight};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  min-width: 20px;
  text-align: center;
`;

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode, toggleDarkMode, theme } = useTheme();
  const cartContext = useCart();
  const navigate = useNavigate();

  // Safety check for cart context
  const cartItems = cartContext?.items || [];
  const cartItemCount = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <HeaderContainer theme={theme}>
      <Nav>
        <Logo to="/" theme={theme}>
          SoleMate
        </Logo>

        <NavLinks>
          <NavLink to="/" theme={theme}>Home</NavLink>
          <NavLink to="/products" theme={theme}>Shop</NavLink>
          <NavLink to="/about" theme={theme}>About</NavLink>
        </NavLinks>

        <SearchBar>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search for shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              theme={theme}
            />
          </form>
        </SearchBar>

        <RightSection>
          <Button onClick={toggleDarkMode} theme={theme}>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </Button>
          
          <Button theme={theme}>
            <FiUser />
          </Button>
          
          <CartButton
            onClick={() => navigate('/cart')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            theme={theme}
          >
            <FiShoppingCart />
            {cartItemCount > 0 && <CartBadge theme={theme}>{cartItemCount}</CartBadge>}
          </CartButton>
        </RightSection>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
