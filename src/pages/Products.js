import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { products, categories, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.3s ease;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-weight: 700;
  transition: color 0.3s ease;
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  transition: color 0.3s ease;
`;

const FiltersSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  transition: color 0.3s ease;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 25px;
    font-size: 1rem;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FilterOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const FilterGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  select, input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    font-size: 0.9rem;
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const CategoryFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const ClearFiltersButton = styled.button`
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.errorDark};
    transform: translateY(-2px);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.view === 'list' 
    ? '1fr' 
    : 'repeat(auto-fill, minmax(280px, 1fr))'
  };
  gap: 2rem;
`;

const ListViewCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ListViewImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const ListViewContent = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 0.5rem;
  }
`;

const ListViewActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  h3 {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const { theme } = useTheme();

  useEffect(() => {
    // Get initial filters from URL
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    
    setSelectedCategory(category);
    setSearchTerm(search);
    
    filterProducts(category, search, priceRange, sortBy);
  }, []);

  const filterProducts = (category, search, price, sort) => {
    let filtered = products;

    // Filter by category
    if (category && category !== 'all') {
      filtered = getProductsByCategory(category);
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by price range
    if (price.min !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(price.min));
    }
    if (price.max !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(price.max));
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = searchTerm.trim();
    setSearchParams({
      category: selectedCategory,
      search: newSearchTerm,
      ...(priceRange.min && { minPrice: priceRange.min }),
      ...(priceRange.max && { maxPrice: priceRange.max }),
      sort: sortBy
    });
    filterProducts(selectedCategory, newSearchTerm, priceRange, sortBy);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({
      category,
      search: searchTerm,
      ...(priceRange.min && { minPrice: priceRange.min }),
      ...(priceRange.max && { maxPrice: priceRange.max }),
      sort: sortBy
    });
    filterProducts(category, searchTerm, priceRange, sortBy);
  };

  const handlePriceChange = (field, value) => {
    const newPriceRange = { ...priceRange, [field]: value };
    setPriceRange(newPriceRange);
    filterProducts(selectedCategory, searchTerm, newPriceRange, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    filterProducts(selectedCategory, searchTerm, priceRange, sort);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setSearchParams({});
    setFilteredProducts(products);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || priceRange.min || priceRange.max || sortBy !== 'name';

  return (
    <ProductsContainer theme={theme}>
      <PageHeader>
        <PageTitle theme={theme}>Our Collection</PageTitle>
        <PageSubtitle theme={theme}>Discover the perfect pair of shoes for every occasion</PageSubtitle>
      </PageHeader>

      <FiltersSection theme={theme}>
        <FiltersHeader>
          <FilterTitle theme={theme}>
            <FiFilter />
            Filters & Search
          </FilterTitle>
          
          <SearchBar theme={theme}>
            <FiSearch />
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </SearchBar>

          <ViewToggle>
            <ViewButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              theme={theme}
            >
              <FiGrid />
            </ViewButton>
            <ViewButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              theme={theme}
            >
              <FiList />
            </ViewButton>
          </ViewToggle>
        </FiltersHeader>

        <CategoryFilters>
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
              theme={theme}
            >
              {category.name} ({category.count})
            </CategoryButton>
          ))}
        </CategoryFilters>

        <FilterOptions>
          <FilterGroup theme={theme}>
            <label>Price Range</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                min="0"
                theme={theme}
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                min="0"
                theme={theme}
              />
            </div>
          </FilterGroup>

          <FilterGroup theme={theme}>
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)} theme={theme}>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </FilterGroup>

          {hasActiveFilters && (
            <FilterGroup theme={theme}>
              <label>&nbsp;</label>
              <ClearFiltersButton onClick={clearFilters} theme={theme}>
                <FiX /> Clear All Filters
              </ClearFiltersButton>
            </FilterGroup>
          )}
        </FilterOptions>
      </FiltersSection>

      {filteredProducts.length === 0 ? (
        <NoResults theme={theme}>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </NoResults>
      ) : (
        <ProductsGrid view={viewMode} theme={theme}>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {viewMode === 'list' ? (
                  <ListViewCard theme={theme}>
                    <ListViewImage src={product.image} alt={product.name} />
                    <ListViewContent>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <p><strong>${product.price}</strong></p>
                      <p>Rating: {product.rating}/5 ({product.reviews} reviews)</p>
                    </ListViewContent>
                    <ListViewActions>
                      <ProductCard product={product} />
                    </ListViewActions>
                  </ListViewCard>
                ) : (
                  <ProductCard product={product} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </ProductsGrid>
      )}
    </ProductsContainer>
  );
};

export default Products;
