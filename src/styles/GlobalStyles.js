import { createGlobalStyle } from 'styled-components';

const GlobalStyles = ({ isDarkMode }) => {
  const colors = isDarkMode ? {
    white: '#1a1a1a',
    black: '#ffffff',
    grey: {
      50: '#212121',
      100: '#424242',
      200: '#616161',
      300: '#757575',
      400: '#9e9e9e',
      500: '#bdbdbd',
      600: '#e0e0e0',
      700: '#eeeeee',
      800: '#f5f5f5',
      900: '#fafafa',
    },
    accent: {
      primary: '#ff8a65',
      secondary: '#ff6b35',
      light: '#e64a19',
      dark: '#ffccbc',
    },
  } : {
    white: '#ffffff',
    black: '#1a1a1a',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    accent: {
      primary: '#ff6b35',
      secondary: '#ff8a65',
      light: '#ffccbc',
      dark: '#e64a19',
    },
  };

  const shadows = isDarkMode ? {
    sm: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
    base: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
    md: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
    lg: '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
    xl: '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)',
    '2xl': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
    none: 'none',
  } : {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  };

  return createGlobalStyle`
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: 'Inter', 'Lato', sans-serif;
      font-weight: 400;
      line-height: 1.6;
      color: ${colors.black};
      background-color: ${colors.white};
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Montserrat', 'Poppins', sans-serif;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.025em;
      color: ${colors.black};
      transition: color 0.3s ease;
    }

    h1 {
      font-size: 3.75rem;
      font-weight: 800;
      
      @media (max-width: 768px) {
        font-size: 3rem;
      }
      
      @media (max-width: 640px) {
        font-size: 2.25rem;
      }
    }

    h2 {
      font-size: 3rem;
      
      @media (max-width: 768px) {
        font-size: 2.25rem;
      }
      
      @media (max-width: 640px) {
        font-size: 1.875rem;
      }
    }

    h3 {
      font-size: 2.25rem;
      
      @media (max-width: 768px) {
        font-size: 1.875rem;
      }
      
      @media (max-width: 640px) {
        font-size: 1.5rem;
      }
    }

    h4 {
      font-size: 1.875rem;
      
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
      
      @media (max-width: 640px) {
        font-size: 1.25rem;
      }
    }

    h5 {
      font-size: 1.5rem;
    }

    h6 {
      font-size: 1.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1rem;
      transition: color 0.3s ease;
    }

    a {
      color: ${colors.accent.primary};
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        color: ${colors.accent.dark};
      }
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: ${colors.grey[100]};
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.grey[400]};
      border-radius: 9999px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.grey[600]};
    }

    /* Global transitions */
    * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    /* Button base styles */
    button {
      font-family: 'Inter', 'Lato', sans-serif;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${shadows.lg};
      }
      
      &:focus {
        outline: 2px solid ${colors.accent.primary};
        outline-offset: 2px;
      }
    }

    /* Card hover effects */
    .card:hover {
      transform: translateY(-4px);
      box-shadow: ${shadows.xl};
    }

    /* Focus styles for accessibility */
    input:focus,
    select:focus,
    textarea:focus {
      outline: 2px solid ${colors.accent.primary};
      outline-offset: 2px;
    }

    /* Selection color */
    ::selection {
      background-color: ${colors.accent.primary};
      color: ${colors.white};
    }

    /* Utility classes */
    .text-center {
      text-align: center;
    }

    .text-left {
      text-align: left;
    }

    .text-right {
      text-align: right;
    }

    .font-bold {
      font-weight: 700;
    }

    .font-semibold {
      font-weight: 600;
    }

    .font-medium {
      font-weight: 500;
    }

    .font-light {
      font-weight: 300;
    }

    /* Spacing utilities */
    .mb-0 { margin-bottom: 0; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-3 { margin-bottom: 1rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mb-5 { margin-bottom: 2rem; }
    .mb-6 { margin-bottom: 3rem; }

    .mt-0 { margin-top: 0; }
    .mt-1 { margin-top: 0.25rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-3 { margin-top: 1rem; }
    .mt-4 { margin-top: 1.5rem; }
    .mt-5 { margin-top: 2rem; }
    .mt-6 { margin-top: 3rem; }

    .p-0 { padding: 0; }
    .p-1 { padding: 0.25rem; }
    .p-2 { padding: 0.5rem; }
    .p-3 { padding: 1rem; }
    .p-4 { padding: 1.5rem; }
    .p-5 { padding: 2rem; }
    .p-6 { padding: 3rem; }

    /* Animation classes */
    .fade-in {
      animation: fadeIn 0.6s ease-in-out;
    }

    .slide-up {
      animation: slideUp 0.6s ease-out;
    }

    .slide-in-right {
      animation: slideInRight 0.6s ease-out;
    }

    .bounce {
      animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0);
      }
      40%, 43% {
        transform: translate3d(0, -30px, 0);
      }
      70% {
        transform: translate3d(0, -15px, 0);
      }
      90% {
        transform: translate3d(0, -4px, 0);
      }
    }

    /* Loading spinner */
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid ${colors.grey[200]};
      border-radius: 50%;
      border-top-color: ${colors.accent.primary};
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Responsive utilities */
    .hidden {
      display: none;
    }

    .block {
      display: block;
    }

    .flex {
      display: flex;
    }

    .inline-flex {
      display: inline-flex;
    }

    .grid {
      display: grid;
    }

    .items-center {
      align-items: center;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-around {
      justify-content: space-around;
    }

    .w-full {
      width: 100%;
    }

    .h-full {
      height: 100%;
    }

    .min-h-screen {
      min-height: 100vh;
    }

    /* Container */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      
      @media (min-width: 1024px) {
        padding: 0 1.5rem;
      }
    }
  `;
};

export default GlobalStyles;
