# ShopNex Simple Shop Template

A complete e-commerce solution built with Payload CMS 3.0, featuring products, orders, collections, payment processing, and comprehensive store management functionality.

## Features

- **Complete E-commerce Setup**: Products, orders, collections, carts, and checkout sessions
- **Payment Processing**: Stripe integration with gift cards and payment tracking
- **Store Management**: Inventory, shipping, locations, and store settings
- **CMS Integration**: Rich content management with Payload CMS
- **Theme Support**: Customizable themes and page templates
- **Analytics**: Built-in analytics and reporting
- **Email Integration**: Easy email campaign management
- **Plugin System**: Extensible with ShopNex plugins

## Quick Start

Create a new project using the ShopNex CLI:

```bash
npx create-shopnex-app my-shop --template simple-shop
cd my-shop
```

## Manual Setup

If you prefer to set up manually:

1. **Clone and setup environment**:
   ```bash
   git clone <your-repo-url>
   cd my-shop
   cp .env.example .env
   ```

2. **Configure your environment variables**:
   - `DATABASE_URI`: Your SQLite database path
   - `PAYLOAD_SECRET`: A secure secret for Payload
   - `NEXT_PUBLIC_SERVER_URL`: Your CMS URL (default: http://localhost:3000)
   - `NEXT_PUBLIC_STOREFRONT_URL`: Your storefront URL (default: http://localhost:3020)
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

3. **Install dependencies and start development**:
   ```bash
   pnpm install
   pnpm dev
   ```

4. **Access your admin panel**:
   Open `http://localhost:3000` and create your first admin user.

## Collections

This template includes the following pre-configured collections:

### Core E-commerce
- **Products**: Product catalog with variants, pricing, and inventory
- **Collections**: Product groupings and categories
- **Orders**: Order management with status tracking
- **Carts**: Shopping cart functionality
- **Checkout Sessions**: Secure checkout process

### Store Management
- **Payments**: Payment processing and tracking
- **Shipping**: Shipping methods and rates
- **Locations**: Store locations and warehouses
- **Policies**: Store policies and terms

### Content & Marketing
- **Media**: Image and file management with optimization
- **Campaigns**: Marketing campaigns and promotions
- **Themes**: Customizable store themes
- **Hero Pages**: Landing page content
- **Footer Pages**: Footer content management

### System
- **Users**: Admin user management
- **Gift Cards**: Digital gift card system
- **Plugins**: Plugin management system

## Database Seeding

Populate your store with sample data:

```bash
pnpm db:seed
```

This will create sample products, collections, and store settings to get you started.

## Development Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm db:seed` - Seed database with sample data
- `pnpm generate:types` - Generate TypeScript types
- `pnpm generate:schema` - Generate database schema

## Docker (Optional)

For containerized development:

1. Ensure your `.env` file is configured
2. Run `docker-compose up`
3. Access the admin panel at `http://localhost:3000`

## Plugin System

This template includes several ShopNex plugins:

- **Analytics Plugin**: Track store performance
- **Store Plugin**: Core e-commerce functionality
- **Stripe Plugin**: Payment processing
- **Import/Export Plugin**: Data management
- **Email Plugin**: Campaign management
- **Builder.io Plugin**: Visual page building

## Customization

### Adding Products
1. Navigate to `/admin/collections/products`
2. Click "Create New" to add products
3. Configure variants, pricing, and inventory

### Store Configuration
1. Go to `/admin/globals/store-settings`
2. Configure your store details, currency, and policies
3. Set up shipping methods and payment options

### Theme Customization
1. Modify the theme configuration in `/admin/collections/themes`
2. Customize colors, fonts, and layout options
3. Create custom page templates

## Production Deployment

1. **Build the application**:
   ```bash
   pnpm build
   ```

2. **Set production environment variables**:
   - Configure your production database
   - Set up Stripe live keys
   - Configure your domain URLs

3. **Deploy using your preferred platform**:
   - Vercel, Netlify, or custom hosting
   - Ensure environment variables are set
   - Run database migrations if needed

## Support

For issues and questions:
- [ShopNex Documentation](https://docs.shopnex.com)
- [GitHub Issues](https://github.com/shopnex/shopnex/issues)
- [Community Discord](https://discord.gg/shopnex)
