# VietQR Payment Integration

This guide explains how to set up and use VietQR payment for your e-commerce store.

## What is VietQR?

VietQR is Vietnam's national QR code payment standard that allows customers to pay using their banking apps by scanning a QR code. It's supported by all major Vietnamese banks.

## Features

- ✅ Generate QR codes automatically for each order
- ✅ Support all major Vietnamese banks (VCB, TCB, MB, ACB, Techcombank, etc.)
- ✅ Display payment details with copy-to-clipboard functionality
- ✅ Multiple QR template options (compact, standard, print)
- ✅ Real-time order tracking
- ✅ Mobile-friendly payment interface

## Setup Instructions

### 1. Access Payload CMS Admin Panel

Navigate to your admin panel at `http://localhost:3000/admin`

### 2. Create a VietQR Payment Method

1. Go to **Settings** → **Payments**
2. Click **Create New**
3. Fill in the following fields:
   - **Name**: "VietQR Payment" (or any name you prefer)
   - **Enabled**: Check this box
   - **Provider**: Select "VietQR Provider"

4. Configure VietQR Provider fields:
   - **Bank ID**: Your bank's code (e.g., `VCB`, `TCB`, `MB`, `ACB`, `VPB`, `BIDV`, etc.)
   - **Account Number**: Your bank account number
   - **Account Name**: Your account holder name (exactly as shown in your bank)
   - **QR Template**: Choose from:
     - `compact` - Compact design (recommended)
     - `compact2` - Alternative compact design
     - `qr_only` - Standard QR code only
     - `print` - Print-friendly format
   - **Payment Instructions**: Add any additional instructions for customers

5. Click **Save**

### 3. Common Vietnamese Bank Codes

Here are some popular bank codes for reference:

| Bank Name | Bank Code |
|-----------|-----------|
| Vietcombank | `VCB` |
| Techcombank | `TCB` |
| MB Bank | `MB` |
| ACB | `ACB` |
| VPBank | `VPB` |
| BIDV | `BIDV` |
| VietinBank | `CTG` |
| Agribank | `ABB` |
| Sacombank | `STB` |
| TPBank | `TPB` |

For a complete list, visit: [https://api.vietqr.io/v2/banks](https://api.vietqr.io/v2/banks)

## How It Works

### Customer Experience

1. Customer adds products to cart and proceeds to checkout
2. Customer fills in shipping information
3. Customer selects "VietQR Payment" as payment method
4. After clicking "Complete Order", customer is redirected to VietQR payment page
5. Customer scans the QR code with their banking app
6. Customer completes payment in their banking app
7. Customer clicks "I've Completed Payment" button
8. Order confirmation page is displayed

### Order Flow

```
Cart → Checkout → VietQR Payment Page → Payment Completion → Order Confirmation
```

### Payment Page Features

- **Large QR Code**: Easy to scan with mobile banking apps
- **Payment Details**: Bank code, account number, account name, transfer content
- **Copy to Clipboard**: Quick copy buttons for all payment details
- **Amount Display**: Clear display of total amount in VND
- **Step-by-step Instructions**: Guides customers through the payment process

## Technical Details

### API Used

This integration uses the free VietQR.io API to generate QR codes:
- API URL: `https://img.vietqr.io`
- No API key required
- Real-time QR code generation
- Compatible with all Vietnamese banking apps

### File Structure

```
my-store/
├── src/
│   ├── collections/
│   │   ├── Payments.ts                    # VietQR provider definition
│   │   └── Orders/endpoints/
│   │       ├── vietqr-checkout.ts         # VietQR checkout handler
│   │       └── checkout.ts                # Updated with VietQR support
│   └── app/(storefront)/
│       └── payment/vietqr/[sessionId]/
│           └── page.tsx                   # VietQR payment display page
```

### Currency

VietQR payments use VND (Vietnamese Dong) as the currency. The system automatically sets the currency to `vnd` for VietQR orders.

## Testing

### Test Payment Method Setup

For testing purposes, you can use:
- **Bank ID**: `TCB` (Techcombank)
- **Account Number**: Any valid account number format
- **Account Name**: Your business name

### Test the Payment Flow

1. Add products to cart
2. Go to checkout
3. Select VietQR as payment method
4. Complete the order
5. You'll see the QR code payment page with your configured bank details

## Payment Verification

**Important**: This integration generates QR codes and displays payment information, but payment verification needs to be handled separately. You have several options:

### Option 1: Manual Verification
- Check your bank account or internet banking
- Look for transactions with the order ID in the transfer content
- Manually update order status in Payload CMS admin panel

### Option 2: Bank Webhook Integration (Future Enhancement)
- Integrate with your bank's API for automatic payment verification
- Update order status automatically when payment is received

### Option 3: Third-party Payment Gateway
- Use services like VNPay, Momo, or ZaloPay for automatic verification
- These services provide webhooks for payment confirmation

## Troubleshooting

### QR Code Not Displaying

1. Check that the VietQR provider is properly configured
2. Verify bank ID is correct (should be uppercase, e.g., `VCB`)
3. Ensure Next.js image domain is configured in `next.config.mjs`
4. Check browser console for any image loading errors

### Order Not Found

1. Verify the sessionId in the URL is correct
2. Check that the order was created successfully
3. Look for errors in the server console

### Payment Not Reflecting

Remember: Payment verification is manual by default. Check your bank account and update the order status in the admin panel.

## Customization

### Change QR Code Size

Edit `my-store/src/app/(storefront)/payment/vietqr/[sessionId]/page.tsx`:

```tsx
<Image
  src={qrCodeUrl}
  alt="VietQR Payment QR Code"
  width={300}  // Change this
  height={300} // and this
  className="rounded"
  priority
/>
```

### Modify Instructions

Update the instructions in your payment method configuration in Payload CMS admin panel, or modify the default text in `Payments.ts`.

### Add Auto-verification

You can extend the VietQR checkout handler to integrate with bank APIs or payment gateway webhooks for automatic payment verification.

## Support

For issues or questions:
1. Check the Payload CMS logs in the console
2. Verify your bank account details are correct
3. Test with different browsers/devices
4. Ensure the order was created successfully in the database

## Security Notes

- Never expose your bank account credentials in client-side code
- All sensitive bank information is stored securely in Payload CMS
- QR codes are generated server-side with your configured bank details
- Always verify payments before fulfilling orders

## Next Steps

After setting up VietQR payment:

1. ✅ Test the payment flow with a real order
2. ✅ Set up a process for payment verification
3. ✅ Train your team on how to verify and process VietQR payments
4. ✅ Consider adding automated payment verification
5. ✅ Monitor orders and payment statuses regularly

## Additional Resources

- [VietQR Official Website](https://vietqr.io)
- [VietQR API Documentation](https://vietqr.io/developer)
- [List of Vietnamese Bank Codes](https://api.vietqr.io/v2/banks)

