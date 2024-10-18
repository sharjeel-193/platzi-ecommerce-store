# Shop Sphere - E-commerce Platform

A modern, responsive e-commerce platform built using Next.js, Tailwind CSS, and Stripe for seamless shopping and payment experiences. This project offers a clean and efficient interface for browsing and purchasing products online, with features like dynamic category display, search functionality, and a shopping cart with Stripe integration for payments. All product data is fetched from the  **Platzi Fake Store API** , simulating real-world product listings.

## Features

* **Responsive Design** : Optimized for both desktop and mobile devices, providing a consistent and user-friendly experience across all screens.
* **Search & Categories** : Real-time product search and category browsing for better product discovery.
* **Shopping Cart with Stripe** : Secure and easy-to-use shopping cart functionality, integrated with Stripe for payment processing.
* **Data from Platzi Fake Store API** : Product data, categories, and pricing are fetched from the  **Platzi Fake Store API** , which provides a set of sample data for e-commerce applications.
* **Dark Mode Support** : Toggle between light and dark themes for improved accessibility.
* **Mobile Sidebar Navigation** : Easily accessible mobile menu for better navigation on smaller screens.

## Platzi Fake Store API

The project uses the **Platzi Fake Store API** to simulate real-world e-commerce data, including products, categories, and pricing. This API provides a wide range of products across various categories and allows the platform to display product listings, categories, and detailed product information.

#### **Data Fetched:**

* **Products** : Each product includes a title, description, images, price, and category.
* **Categories** : Product categories are dynamically fetched and displayed for easier navigation.
* **Product Details** : Each product's detailed page provides in-depth information, including images and price, fetched from the API.

#### API Endpoints

The data is fetched from the following API endpoints:

* `GET /products`: Fetches all available products.
* `GET /categories`: Fetches the list of product categories.
* `GET /products/:id`: Fetches detailed information for a specific product.

## Getting Started

### Prerequisites

To run this project locally, you'll need:

* Node.js (v14 or later)
* npm
* A Stripe account for payment processing

### Installation

**Step 1: Clone the Repository**

```bash
git clone https://github.com/sharjeel-193/platzi-ecommerce-store.git
cd shop-sphere
```

**Step 2: Install Dependencies**

```bash
npm install
```

**Step 3: Environment Variables**
Create a .env.local file in the root directory and add your environment variables for Stripe and other necessary configurations:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
PLATZI_API_URL=https://api.escuelajs.co/api/v1  # API Base URL
```

Obtain the Stripe keys from your Stripe account dashboard.

**Step 4: Running the App**
To start the development server, run:

```bash
npm run dev
```

Visit http://localhost:3000 in your browser to view the site.

**Step 5: Deployment**

This project is ready to be deployed on platforms like Vercel. To deploy your own version:

* Link your GitHub repository to Vercel.
* Add the environment variables in the Vercel dashboard.
* Trigger a deploy by pushing changes to your repository.

The live website is available at:

```bash
https://shop-sphere-platzi.vercel.app/
```

## Usage

* Browse through products by category or search for specific items.
* Add products to the shopping cart and checkout securely using Stripe.
* Data is fetched dynamically from the Platzi Fake Store API, ensuring real-time product updates.

## Technologies Used

* **Next.js** : A powerful React framework for server-side rendering and static site generation.
* **Tailwind CSS** : A utility-first CSS framework for building responsive designs quickly.
* **Stripe** : A payment platform to handle secure transactions.
* **Platzi Fake Store API** : Used for fetching e-commerce data, including products and categories.
* **React Icons** : Used for various UI icons throughout the app.
* **AOS (Animate On Scroll)** : Smooth scroll-based animations for a dynamic user experience.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

For any inquiries or issues, please contact: [m.sharjeel193@gmail.com]()
