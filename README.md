# ShoppyGlobe E-commerce App

A basic online shopping app built with React and Vite for my React assignment.

## Live Demo / Repo

GitHub Repository: https://github.com/CharanAdithyaS/shoppyglobe


## Features

- Product listing fetched from [DummyJSON API](https://dummyjson.com/products)
- Product detail page with dynamic routing (`/product/:id`)
- Shopping cart with add, remove, and quantity controls
- Redux for cart state and product search filtering
- Checkout form with order summary
- 404 page with error details
- Lazy loading for components and images
- Responsive CSS layout

## Tech Stack

- React 19 + Vite
- React Router (createBrowserRouter)
- Redux Toolkit
- PropTypes

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     # UI components (Header, ProductList, Cart, etc.)
  hooks/          # Custom hooks (useFetchProducts)
  redux/          # Store, cart slice, search slice
  router.jsx      # Route definitions with lazy loading
  App.jsx         # Root component
  main.jsx        # Entry point with Redux Provider
```

## Author

React Project Assignment — ShoppyGlobe
