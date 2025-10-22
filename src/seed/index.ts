import config from '@payload-config'
import { getPayload } from 'payload'
import { homePageData } from './home-page-data'

const seed = async () => {
  const payload = await getPayload({ config })

  // Create product images
  console.log('Creating product images...')
  const iphone15ProImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'iPhone 15 Pro',
      filename: `iphone-15-pro-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=962&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=962&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const macbookProImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'MacBook Pro 14-inch',
      filename: `macbook-pro-14-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const galaxyS24UltraImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'Samsung Galaxy S24 Ultra',
      filename: `galaxy-s24-ultra-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const airpodsProImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'AirPods Pro 2nd generation',
      filename: `airpods-pro-2nd-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const sonyHeadphonesImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'Sony WH-1000XM5 Wireless Headphones',
      filename: `sony-wh-1000xm5-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const ipadProImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'iPad Pro 12.9-inch',
      filename: `ipad-pro-12-9-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  // Create collection images
  const electronicsImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'Electronics Collection',
      filename: `electronics-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const smartphonesImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'Smartphones Collection',
      filename: `smartphones-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const laptopsImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'Laptops Collection',
      filename: `laptops-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  const accessoriesImage = await payload.create({
    collection: 'media',
    data: {
      alt: 'Accessories Collection',
      filename: `accessories-${crypto.randomUUID()}.png`,
      mimeType: 'image/png',
      thumbnailURL:
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  })

  // Create collections (categories)
  console.log('Creating collections...')
  const electronicsCollection = await payload.create({
    collection: 'collections',
    data: {
      title: 'Electronics',
      handle: 'electronics',
      description: '<p>Latest and greatest electronic devices and gadgets.</p>',
      image: electronicsImage.id,
    },
  })

  const smartphonesCollection = await payload.create({
    collection: 'collections',
    data: {
      title: 'Smartphones',
      handle: 'smartphones',
      description: '<p>Premium smartphones from top brands.</p>',
      image: smartphonesImage.id,
    },
  })

  const laptopsCollection = await payload.create({
    collection: 'collections',
    data: {
      title: 'Laptops',
      handle: 'laptops',
      description: '<p>High-performance laptops for work and gaming.</p>',
      image: laptopsImage.id,
    },
  })

  const accessoriesCollection = await payload.create({
    collection: 'collections',
    data: {
      title: 'Accessories',
      handle: 'accessories',
      description: '<p>Essential accessories for your devices.</p>',
      image: accessoriesImage.id,
    },
  })

  // Create products
  console.log('Creating products...')

  // iPhone 15 Pro
  await payload.create({
    collection: 'products',
    data: {
      title: 'iPhone 15 Pro',
      handle: 'iphone-15-pro',
      currency: 'USD',
      visible: true,
      description:
        '<p>The most advanced iPhone ever with <strong>titanium design</strong>, <strong>A17 Pro chip</strong>, and <strong>pro camera system</strong>.</p><ul><li>6.1-inch Super Retina XDR display</li><li>ProRAW and ProRes video recording</li><li>Up to 29 hours video playback</li></ul>',
      collections: [electronicsCollection.id, smartphonesCollection.id],
      variantOptions: [
        {
          option: 'Storage',
          value: ['128GB', '256GB', '512GB', '1TB'],
        },
        {
          option: 'Color',
          value: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
        },
      ],
      variants: [
        {
          sku: 'IPHONE15PRO-128-NAT',
          price: 999,
          stockCount: 50,
          gallery: [iphone15ProImage.id],
          options: [
            { option: 'Storage', value: '128GB' },
            { option: 'Color', value: 'Natural Titanium' },
          ],
        },
        {
          sku: 'IPHONE15PRO-256-BLUE',
          price: 1099,
          stockCount: 30,
          gallery: [iphone15ProImage.id],
          options: [
            { option: 'Storage', value: '256GB' },
            { option: 'Color', value: 'Blue Titanium' },
          ],
        },
        {
          sku: 'IPHONE15PRO-512-WHITE',
          price: 1299,
          stockCount: 20,
          gallery: [iphone15ProImage.id],
          options: [
            { option: 'Storage', value: '512GB' },
            { option: 'Color', value: 'White Titanium' },
          ],
        },
      ],
      customFields: [
        { name: 'Brand', value: 'Apple' },
        { name: 'OS', value: 'iOS 17' },
        { name: 'Screen Size', value: '6.1 inches' },
      ],
    },
  })

  // MacBook Pro
  await payload.create({
    collection: 'products',
    data: {
      title: 'MacBook Pro 14-inch',
      handle: 'macbook-pro-14',
      currency: 'USD',
      visible: true,
      description:
        '<p>Supercharged by <strong>M3, M3 Pro, or M3 Max chips</strong> for incredible performance in a compact design.</p><ul><li>14.2-inch Liquid Retina XDR display</li><li>Up to 22 hours battery life</li><li>Three Thunderbolt 4 ports, HDMI port, SDXC card slot</li></ul>',
      collections: [electronicsCollection.id, laptopsCollection.id],
      variantOptions: [
        {
          option: 'Chip',
          value: ['M3', 'M3 Pro', 'M3 Max'],
        },
        {
          option: 'Memory',
          value: ['8GB', '16GB', '32GB'],
        },
        {
          option: 'Storage',
          value: ['512GB', '1TB', '2TB'],
        },
      ],
      variants: [
        {
          sku: 'MBP14-M3-8GB-512GB',
          price: 1599,
          stockCount: 25,
          gallery: [macbookProImage.id],
          options: [
            { option: 'Chip', value: 'M3' },
            { option: 'Memory', value: '8GB' },
            { option: 'Storage', value: '512GB' },
          ],
        },
        {
          sku: 'MBP14-M3PRO-16GB-1TB',
          price: 2399,
          stockCount: 15,
          gallery: [macbookProImage.id],
          options: [
            { option: 'Chip', value: 'M3 Pro' },
            { option: 'Memory', value: '16GB' },
            { option: 'Storage', value: '1TB' },
          ],
        },
      ],
      customFields: [
        { name: 'Brand', value: 'Apple' },
        { name: 'OS', value: 'macOS Sonoma' },
        { name: 'Screen Size', value: '14.2 inches' },
      ],
    },
  })

  // Samsung Galaxy S24 Ultra
  await payload.create({
    collection: 'products',
    data: {
      title: 'Samsung Galaxy S24 Ultra',
      handle: 'galaxy-s24-ultra',
      currency: 'USD',
      visible: true,
      description:
        '<p>The ultimate Galaxy experience with <strong>S Pen</strong>, <strong>pro cameras</strong>, and <strong>Galaxy AI</strong> built in.</p><ul><li>6.8-inch Dynamic AMOLED 2X display</li><li>200MP main camera with 100x Space Zoom</li><li>5000mAh battery with 45W fast charging</li></ul>',
      collections: [electronicsCollection.id, smartphonesCollection.id],
      variantOptions: [
        {
          option: 'Storage',
          value: ['256GB', '512GB', '1TB'],
        },
        {
          option: 'Color',
          value: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
        },
      ],
      variants: [
        {
          sku: 'S24ULTRA-256-GRAY',
          price: 1299,
          stockCount: 40,
          gallery: [galaxyS24UltraImage.id],
          options: [
            { option: 'Storage', value: '256GB' },
            { option: 'Color', value: 'Titanium Gray' },
          ],
        },
        {
          sku: 'S24ULTRA-512-BLACK',
          price: 1419,
          stockCount: 25,
          gallery: [galaxyS24UltraImage.id],
          options: [
            { option: 'Storage', value: '512GB' },
            { option: 'Color', value: 'Titanium Black' },
          ],
        },
      ],
      customFields: [
        { name: 'Brand', value: 'Samsung' },
        { name: 'OS', value: 'Android 14' },
        { name: 'Screen Size', value: '6.8 inches' },
      ],
    },
  })

  // AirPods Pro
  await payload.create({
    collection: 'products',
    data: {
      title: 'AirPods Pro (2nd generation)',
      handle: 'airpods-pro-2nd-gen',
      currency: 'USD',
      visible: true,
      description:
        '<p><strong>Adaptive Audio</strong>, <strong>Active Noise Cancellation</strong>, and <strong>Personalized Spatial Audio</strong> with H2 chip.</p><ul><li>Up to 2x more Active Noise Cancellation</li><li>Transparency mode</li><li>Up to 6 hours of listening time</li></ul>',
      collections: [electronicsCollection.id, accessoriesCollection.id],
      variants: [
        {
          sku: 'AIRPODS-PRO-2ND',
          price: 249,
          stockCount: 100,
          gallery: [airpodsProImage.id],
          options: [],
        },
      ],
      customFields: [
        { name: 'Brand', value: 'Apple' },
        { name: 'Battery Life', value: 'Up to 6 hours' },
        { name: 'Connectivity', value: 'Bluetooth 5.3' },
      ],
    },
  })

  // Sony WH-1000XM5
  await payload.create({
    collection: 'products',
    data: {
      title: 'Sony WH-1000XM5 Wireless Headphones',
      handle: 'sony-wh-1000xm5',
      currency: 'USD',
      visible: true,
      description:
        '<p><strong>Industry-leading noise canceling</strong> with Auto NC Optimizer and crystal clear hands-free calling.</p><ul><li>30-hour battery life</li><li>Quick Attention mode</li><li>Multipoint connection</li></ul>',
      collections: [electronicsCollection.id, accessoriesCollection.id],
      variantOptions: [
        {
          option: 'Color',
          value: ['Black', 'Silver'],
        },
      ],
      variants: [
        {
          sku: 'SONY-WH1000XM5-BLACK',
          price: 399,
          stockCount: 60,
          gallery: [sonyHeadphonesImage.id],
          options: [{ option: 'Color', value: 'Black' }],
        },
        {
          sku: 'SONY-WH1000XM5-SILVER',
          price: 399,
          stockCount: 40,
          gallery: [sonyHeadphonesImage.id],
          options: [{ option: 'Color', value: 'Silver' }],
        },
      ],
      customFields: [
        { name: 'Brand', value: 'Sony' },
        { name: 'Battery Life', value: 'Up to 30 hours' },
        { name: 'Weight', value: '250g' },
      ],
    },
  })

  // iPad Pro
  await payload.create({
    collection: 'products',
    data: {
      title: 'iPad Pro 12.9-inch',
      handle: 'ipad-pro-12-9',
      currency: 'USD',
      visible: true,
      description:
        '<p>The ultimate iPad experience with <strong>M2 chip</strong>, <strong>Liquid Retina XDR display</strong>, and all-day battery life.</p><ul><li>12.9-inch Liquid Retina XDR display</li><li>12MP Ultra Wide front camera with Center Stage</li><li>Compatible with Apple Pencil (2nd generation)</li></ul>',
      collections: [electronicsCollection.id],
      variantOptions: [
        {
          option: 'Storage',
          value: ['128GB', '256GB', '512GB', '1TB', '2TB'],
        },
        {
          option: 'Connectivity',
          value: ['Wi-Fi', 'Wi-Fi + Cellular'],
        },
      ],
      variants: [
        {
          sku: 'IPADPRO129-128-WIFI',
          price: 1099,
          stockCount: 35,
          gallery: [ipadProImage.id],
          options: [
            { option: 'Storage', value: '128GB' },
            { option: 'Connectivity', value: 'Wi-Fi' },
          ],
        },
        {
          sku: 'IPADPRO129-256-CELL',
          price: 1349,
          stockCount: 20,
          gallery: [ipadProImage.id],
          options: [
            { option: 'Storage', value: '256GB' },
            { option: 'Connectivity', value: 'Wi-Fi + Cellular' },
          ],
        },
      ],
      customFields: [
        { name: 'Brand', value: 'Apple' },
        { name: 'Screen Size', value: '12.9 inches' },
        { name: 'Chip', value: 'M2' },
      ],
    },
  })

  // Create payment methods
  console.log('Creating payment methods...')
  await payload.create({
    collection: 'payments',
    data: {
      name: 'Cash on Delivery',
      enabled: true,
      providers: [
        {
          blockType: 'manual',
          methodType: 'cod',
          instructions: 'Pay with cash when your order is delivered to your doorstep. Our delivery partner will collect the payment upon delivery.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'payments',
    data: {
      name: 'Bank Transfer',
      enabled: true,
      providers: [
        {
          blockType: 'manual',
          methodType: 'bankTransfer',
          instructions: 'Transfer the total amount to our bank account. Your order will be processed once payment is confirmed.',
          details: [
            { label: 'Bank Name', value: 'First National Bank' },
            { label: 'Account Number', value: '1234567890' },
            { label: 'Routing Number', value: '021000021' },
            { label: 'Account Holder', value: 'ShopNex LLC' },
          ],
        },
      ],
    },
  })

  await payload.create({
    collection: 'payments',
    data: {
      name: 'In-Store Payment',
      enabled: false,
      providers: [
        {
          blockType: 'manual',
          methodType: 'inStore',
          instructions: 'Visit our store to pay in person. You can pay with cash, card, or check at our location.',
        },
      ],
    },
  })

  // Create shipping methods
  console.log('Creating shipping methods...')
  await payload.create({
    collection: 'shipping',
    data: {
      name: 'Standard Shipping',
      enabled: true,
      shippingProvider: [
        {
          blockType: 'custom-shipping',
          baseRate: 9.99,
          freeShippingMinOrder: 100,
          estimatedDeliveryDays: '5-7 business days',
          notes: 'Free shipping on orders over $100. Tracking information will be provided once your order ships.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'shipping',
    data: {
      name: 'Express Shipping',
      enabled: true,
      shippingProvider: [
        {
          blockType: 'custom-shipping',
          baseRate: 24.99,
          estimatedDeliveryDays: '2-3 business days',
          notes: 'Express delivery with priority handling. Perfect for urgent orders.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'shipping',
    data: {
      name: 'Next Day Delivery',
      enabled: true,
      shippingProvider: [
        {
          blockType: 'custom-shipping',
          baseRate: 39.99,
          estimatedDeliveryDays: '1 business day',
          notes: 'Next day delivery available for orders placed before 2 PM. Not available on weekends and holidays.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'shipping',
    data: {
      name: 'Local Pickup',
      enabled: true,
      shippingProvider: [
        {
          blockType: 'custom-shipping',
          baseRate: 0,
          estimatedDeliveryDays: 'Same day',
          notes: 'Pick up your order from our store. We will notify you when your order is ready for pickup.',
        },
      ],
    },
  })

  await payload.create({
    collection: 'pages',
    data: {
      ...homePageData,
    },
  })

  console.log('Seed data created successfully!')
}

console.log('Seeding...')
await seed()
console.log('Seeding complete!')
process.exit(0)
