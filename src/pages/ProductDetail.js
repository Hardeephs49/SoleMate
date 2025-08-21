import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import styled from 'styled-components';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Breadcrumb = styled.nav`
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#667eea' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
    font-weight: 700;
  }
`;

const Category = styled.span`
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  display: block;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #ffd700;
`;

const ReviewCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
`;

const OriginalPrice = styled.span`
  font-size: 1.3rem;
  color: #999;
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const Features = styled.div`
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem 0;
    color: #666;
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #27ae60;
      font-weight: bold;
    }
  }
`;

const SelectionSection = styled.div`
  margin-bottom: 2rem;
`;

const SelectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SizeButton = styled.button`
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#ddd'};
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid ${props => props.selected ? '#667eea' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
  }
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuantityButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #ddd;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const AddToCartButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const WishlistButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const Benefits = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Benefit = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;

  svg {
    color: #667eea;
    font-size: 1.2rem;
  }

  span {
    font-size: 0.9rem;
    color: #666;
  }
`;

const RelatedProducts = styled.div`
  margin-top: 4rem;
`;

const RelatedTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!product) {
    return (
      <ProductDetailContainer>
        <h2>Product not found</h2>
        <Link to="/products">Back to Products</Link>
      </ProductDetailContainer>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color');
      return;
    }

    setIsAddingToCart(true);
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    });
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <ProductDetailContainer>
      <Breadcrumb>
        <Link to="/">Home</Link> / 
        <Link to="/products"> Products</Link> / 
        <Link to={`/products?category=${product.category}`}> {product.category}</Link> / 
        {product.name}
      </Breadcrumb>

      <ProductGrid>
        <ImageSection>
          <MainImage src={product.images[selectedImage]} alt={product.name} />
          <ThumbnailGrid>
            {product.images.map((image, index) => (
              <Thumbnail
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                active={selectedImage === index}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </ThumbnailGrid>
        </ImageSection>

        <ProductInfo>
          <Category>{product.category}</Category>
          <h1>{product.name}</h1>
          
          <Rating>
            <Stars>
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  style={{
                    fill: i < Math.floor(product.rating) ? '#ffd700' : 'none',
                    color: i < Math.floor(product.rating) ? '#ffd700' : '#ddd'
                  }}
                />
              ))}
            </Stars>
            <ReviewCount>{product.rating}/5 ({product.reviews} reviews)</ReviewCount>
          </Rating>

          <PriceContainer>
            <CurrentPrice>${product.price}</CurrentPrice>
            {product.originalPrice && (
              <OriginalPrice>${product.originalPrice}</OriginalPrice>
            )}
            {discount > 0 && (
              <DiscountBadge>-{discount}%</DiscountBadge>
            )}
          </PriceContainer>

          <Description>{product.description}</Description>

          <Features>
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Features>

          <SelectionSection>
            <SelectionTitle>Select Size</SelectionTitle>
            <SizeGrid>
              {product.sizes.map((size) => (
                <SizeButton
                  key={size}
                  selected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeGrid>
          </SelectionSection>

          <SelectionSection>
            <SelectionTitle>Select Color</SelectionTitle>
            <ColorGrid>
              {product.colors.map((color) => (
                <ColorButton
                  key={color}
                  selected={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </ColorGrid>
          </SelectionSection>

          <QuantitySection>
            <SelectionTitle>Quantity</SelectionTitle>
            <QuantityButton
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </QuantityButton>
            <QuantityInput
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
            />
            <QuantityButton
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 10}
            >
              +
            </QuantityButton>
          </QuantitySection>

          <ActionButtons>
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={isAddingToCart || !product.inStock}
            >
              {isAddingToCart ? (
                'Adding...'
              ) : (
                <>
                  <FiShoppingCart />
                  Add to Cart
                </>
              )}
            </AddToCartButton>
            
            <WishlistButton onClick={() => setIsWishlisted(!isWishlisted)}>
              <FiHeart style={{ fill: isWishlisted ? '#ff6b6b' : 'none' }} />
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </WishlistButton>
          </ActionButtons>

          <Benefits>
            <Benefit>
              <FiTruck />
              <span>Free shipping on orders over $100</span>
            </Benefit>
            <Benefit>
              <FiShield />
              <span>30-day return policy</span>
            </Benefit>
            <Benefit>
              <FiRotateCcw />
              <span>Easy exchanges</span>
            </Benefit>
          </Benefits>
        </ProductInfo>
      </ProductGrid>

      <RelatedProducts>
        <RelatedTitle>You might also like</RelatedTitle>
        <RelatedGrid>
          {/* Related products would go here */}
        </RelatedGrid>
      </RelatedProducts>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
