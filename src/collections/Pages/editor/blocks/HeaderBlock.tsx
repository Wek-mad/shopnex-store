import { ComponentConfig } from '@measured/puck'
import Link from 'next/link'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SearchDialog } from '@/components/search/search-dialog'
import { AccountMenu } from '@/components/account/account-menu'

export interface HeaderBlockProps {
  logoText: string
  logoIcon?: string
  navigationItems: Array<{ label: string; href: string }>
  showSearch?: boolean
  showCart?: boolean
  cartIcon?: 'bag' | 'cart'
  showCartBadge?: boolean
  cartPosition?: 'left' | 'right'
  cartButtonText?: string
  emptyCartMessage?: string
  showCartDrawer?: boolean
}

export const HeaderBlock: ComponentConfig<HeaderBlockProps> = {
  label: 'Header Navigation',
  fields: {
    logoText: { type: 'text' },
    logoIcon: { type: 'text' },
    navigationItems: {
      type: 'array',
      getItemSummary: (item) => item.label || 'Navigation Item',
      defaultItemProps: { label: 'New Link', href: '#' },
      arrayFields: { label: { type: 'text' }, href: { type: 'text' } },
    },
    showSearch: {
      type: 'radio',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    showCart: {
      type: 'radio',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    cartIcon: {
      type: 'select',
      options: [
        { label: 'Shopping Bag', value: 'bag' },
        { label: 'Shopping Cart', value: 'cart' },
      ],
    },
    showCartBadge: {
      type: 'radio',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
    },
    cartPosition: {
      type: 'select',
      options: [
        { label: 'Right of Search', value: 'right' },
        { label: 'Left of Search', value: 'left' },
      ],
    },
    cartButtonText: { type: 'text' },
    emptyCartMessage: { type: 'text' },
    showCartDrawer: {
      label: 'Show Cart Drawer',
      type: 'radio',
      options: [
        { label: 'Enable Drawer', value: true },
        { label: 'Disable Drawer', value: false },
      ],
    },
  },
  defaultProps: {
    logoText: 'ShopNex',
    navigationItems: [
      { label: 'Products', href: '/products' },
      { label: 'Categories', href: '/categories' },
      { label: 'About', href: '/about' },
    ],
    showSearch: true,
    showCart: true,
    cartIcon: 'bag',
    showCartBadge: true,
    cartPosition: 'right',
    cartButtonText: '',
    emptyCartMessage: 'Your cart is empty',
    showCartDrawer: false, // disabled by default
  },
  render: ({
    logoText,
    logoIcon,
    navigationItems,
    showSearch,
    showCart,
    cartPosition = 'right',
    showCartDrawer = true,
  }) => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              {logoIcon ? (
                <img src={logoIcon} alt={logoText} className="w-6 h-6" />
              ) : (
                <span className="text-primary-foreground font-bold text-lg">
                  {logoText.charAt(0)}
                </span>
              )}
            </div>
            <span className="text-xl font-bold text-foreground">{logoText}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href || '#'}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.label || 'Link'}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {showCart && cartPosition === 'left' && <CartDrawer showCartDrawer={showCartDrawer} />}

            {showSearch && <SearchDialog />}

            <AccountMenu />

            {showCart && cartPosition === 'right' && <CartDrawer showCartDrawer={showCartDrawer} />}
          </div>
        </div>
      </div>
    </header>
  ),
}
