import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiCreditCard, FiTruck } from 'react-icons/fi';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const PageSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 100px 1fr auto auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ItemInfo = styled.div`
  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    color: #666;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .price {
    font-weight: 600;
    color: #667eea;
    font-size: 1.1rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: start;
    margin-top: 1rem;
  }
`;

const QuantityButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #ddd;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
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
  width: 50px;
  height: 35px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ItemTotal = styled.div`
  text-align: right;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: end;
    margin-top: 1rem;
  }
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #c0392b;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    grid-column: 2;
    justify-self: end;
    margin-top: 1rem;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  svg {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    margin-bottom: 2rem;
  }
`;

const ContinueShoppingButton = styled(Link)`
  background: linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 1.2rem;
    color: #333;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const PromoCode = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }

  button {
    width: 100%;
    background: #667eea;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background: #5a6fd8;
    }
  }
`;

const ShippingInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #667eea;

  h4 {
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 0.9rem;
  }

  p {
    color: #666;
    font-size: 0.8rem;
    margin: 0;
  }
`;

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems,
    clearCart 
  } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    // Implement checkout logic
    alert('Checkout functionality would be implemented here!');
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 9.99;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <PageHeader>
          <PageTitle>Shopping Cart</PageTitle>
          <PageSubtitle>Your cart is empty</PageSubtitle>
        </PageHeader>

        <EmptyCart>
          <FiShoppingBag />
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <ContinueShoppingButton to="/products">
            <FiArrowLeft />
            Continue Shopping
          </ContinueShoppingButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <PageHeader>
        <PageTitle>Shopping Cart</PageTitle>
        <PageSubtitle>You have {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart</PageSubtitle>
      </PageHeader>

      <CartContent>
        <CartItems>
          <AnimatePresence>
            {items.map((item) => (
              <CartItem
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ItemImage src={item.image} alt={item.name} />
                
                <ItemInfo>
                  <h3>{item.name}</h3>
                  <p>Category: {item.category}</p>
                  {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                  {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                  <p className="price">${item.price}</p>
                </ItemInfo>

                <QuantityControl>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityInput
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                    max="10"
                  />
                  <QuantityButton
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>

                <ItemTotal>
                  ${(item.price * item.quantity).toFixed(2)}
                </ItemTotal>

                <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                  <FiTrash2 />
                </RemoveButton>
              </CartItem>
            ))}
          </AnimatePresence>
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummaryRow>
            <span>Subtotal ({getTotalItems()} items)</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Shipping</span>
            <span>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Tax</span>
            <span>${calculateTax().toFixed(2)}</span>
          </SummaryRow>
          
          <SummaryRow>
            <span>Total</span>
            <span>${(calculateSubtotal() + calculateShipping() + calculateTax()).toFixed(2)}</span>
          </SummaryRow>

          <CheckoutButton onClick={handleCheckout}>
            <FiCreditCard />
            Proceed to Checkout
          </CheckoutButton>

          <PromoCode>
            <input type="text" placeholder="Enter promo code" />
            <button>Apply</button>
          </PromoCode>

          <ShippingInfo>
            <h4>
              <FiTruck /> Free Shipping
            </h4>
            <p>Free shipping on orders over $100. Standard delivery: 3-5 business days.</p>
          </ShippingInfo>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
