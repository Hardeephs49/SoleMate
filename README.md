# SoleMate - Premium Shoe Store 🚀

A modern, interactive e-commerce website built with React.js for selling premium footwear. Features a beautiful UI, smooth animations, and full shopping cart functionality.

## ✨ Features

- **Modern Design**: Clean, responsive design with beautiful gradients and animations
- **Product Catalog**: Browse shoes by category (Running, Casual, Basketball, Boots)
- **Advanced Filtering**: Search, filter by price, category, and sort options
- **Shopping Cart**: Full cart management with quantity controls and persistent storage
- **Product Details**: Comprehensive product pages with image galleries and specifications
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Search Functionality**: Real-time search across product names and descriptions

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM
- **State Management**: React Context API with useReducer

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoe-store-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header with search and cart
│   ├── Footer.js       # Footer with links and newsletter
│   └── ProductCard.js  # Product display card
├── pages/              # Main page components
│   ├── Home.js         # Landing page with hero and featured products
│   ├── Products.js     # Product catalog with filters
│   ├── ProductDetail.js # Individual product page
│   └── Cart.js         # Shopping cart management
├── context/            # React context for state management
│   └── CartContext.js  # Shopping cart state and functions
├── data/               # Static data and utilities
│   └── products.js     # Product database and helper functions
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🎯 Key Components

### Header Component
- Responsive navigation with mobile menu
- Search functionality
- Shopping cart badge with item count
- User account button

### Product Catalog
- Grid and list view options
- Advanced filtering by category, price, and rating
- Search functionality
- Sorting options (name, price, rating)

### Product Cards
- Hover effects and animations
- Wishlist functionality
- Add to cart button
- Rating display
- Price and discount badges

### Shopping Cart
- Persistent storage using localStorage
- Quantity controls
- Remove items
- Order summary with tax and shipping
- Checkout button

### Product Detail Page
- Image gallery with thumbnails
- Size and color selection
- Quantity controls
- Product features and description
- Related products section

## 🎨 Design Features

- **Color Scheme**: Modern gradient combinations (purple to blue)
- **Typography**: Inter font family for clean readability
- **Shadows**: Subtle shadows for depth and modern feel
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Customization

### Adding New Products
Edit `src/data/products.js` to add new products:

```javascript
{
  id: 9,
  name: "New Shoe Model",
  category: "running",
  price: 149.99,
  originalPrice: 179.99,
  image: "image-url",
  images: ["image1", "image2", "image3"],
  description: "Product description",
  features: ["Feature 1", "Feature 2"],
  sizes: [7, 7.5, 8, 8.5, 9],
  colors: ["Black", "White"],
  rating: 4.8,
  reviews: 500,
  inStock: true,
  featured: false
}
```

### Styling Changes
Modify styled components in individual component files to change colors, spacing, and other visual properties.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in your project directory

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues
2. Create a new issue with detailed description
3. Contact the development team

## 🎉 Acknowledgments

- React.js team for the amazing framework
- Styled Components for elegant styling
- Framer Motion for smooth animations
- React Icons for beautiful icons
- Unsplash for product images

---

**Happy Shopping! 🛍️✨**
