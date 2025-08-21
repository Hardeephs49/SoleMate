import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
  padding: 1rem;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const WishlistButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.md};
  color: ${({ isWishlisted, theme }) => isWishlisted ? theme.colors.primary : theme.colors.textSecondary};
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: scale(1.1);
  }
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 2rem;
`;

const Category = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  line-height: 1.4;
  transition: color 0.3s ease;
`;

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: line-through;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 0.125rem;
`;

const Star = styled.span`
  color: ${({ filled, theme }) => filled ? theme.colors.primary : theme.colors.border};
  font-size: 0.875rem;
`;

const RatingText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled(motion.button)`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ViewButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.surfaceSecondary};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    background: ${({ theme }) => theme.colors.borderLight};
    transform: translateY(-2px);
  }
`;

const AddToCartButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { theme } = useTheme();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= rating} theme={theme}>
          ★
        </Star>
      );
    }
    return stars;
  };

  return (
    <Card
      theme={theme}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <ImageContainer theme={theme}>
        <ProductImage src={product.image} alt={product.name} />
        <WishlistButton
          theme={theme}
          isWishlisted={isWishlisted}
          onClick={handleWishlistToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiHeart />
        </WishlistButton>
        {product.discount && (
          <DiscountBadge theme={theme}>
            -{product.discount}%
          </DiscountBadge>
        )}
      </ImageContainer>

      <CardContent>
        <Category theme={theme}>{product.category}</Category>
        <ProductName theme={theme}>{product.name}</ProductName>
        <ProductDescription theme={theme}>{product.description}</ProductDescription>
        
        <PriceContainer>
          <CurrentPrice theme={theme}>${product.price}</CurrentPrice>
          {product.originalPrice && (
            <OriginalPrice theme={theme}>${product.originalPrice}</OriginalPrice>
          )}
        </PriceContainer>

        <RatingContainer>
          <Stars>
            {renderStars(product.rating)}
          </Stars>
          <RatingText theme={theme}>({product.rating}/5)</RatingText>
        </RatingContainer>

        <ActionButtons>
          <ViewButton
            as={Link}
            to={`/product/${product.id}`}
            theme={theme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiEye />
            View
          </ViewButton>
          <AddToCartButton
            onClick={handleAddToCart}
            theme={theme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiShoppingCart />
            Add to Cart
          </AddToCartButton>
        </ActionButtons>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
