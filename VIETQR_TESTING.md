# VietQR Payment Testing Guide

This guide will help you test the VietQR payment integration step by step.

## Prerequisites

1. Your development server should be running: `pnpm dev`
2. You should have at least one product in your store
3. You should have a shipping method configured

## Step 1: Create a VietQR Payment Method

1. Open your browser and go to: `http://localhost:3000/admin`
2. Log in to your admin panel
3. Navigate to **Settings** → **Payments**
4. Click **Create New** button
5. Fill in the form:
   - **Name**: `VietQR Bank Transfer`
   - **Enabled**: ✅ Check this box
   - **Provider**: Click to add a block, select **VietQR Provider**

6. In the VietQR Provider section:
   - **Bank ID**: Enter a Vietnamese bank code (e.g., `VCB`, `TCB`, `MB`)
     - For testing: use `VCB` (Vietcombank)
   - **Account Number**: Enter a bank account number
     - For testing: use `9704229208387568` (example)
   - **Account Name**: Enter the account holder name
     - For testing: use `NGUYEN VAN A` (example)
   - **QR Template**: Select `compact` (recommended)
   - **Payment Instructions**: Leave default or customize

7. Click **Create** (or **Save**)

## Step 2: Test the Checkout Flow

### A. Add Products to Cart

1. Go to the storefront: `http://localhost:3000`
2. Browse products: `http://localhost:3000/products`
3. Click on a product
4. Click **Add to Cart**
5. Click on the cart icon in the header

### B. Go to Checkout

1. Click **Proceed to Checkout** in the cart
2. Fill in the shipping information:
   - Email: `test@example.com`
   - First Name: `John`
   - Last Name: `Doe`
   - Address, City, State, ZIP Code (any test data)

### C. Select VietQR Payment

1. Scroll down to **Payment Method** section
2. Select **VietQR Bank Transfer** (or whatever name you gave it)
3. You should see the payment instructions

### D. Complete the Order

1. Review your order in the summary panel
2. Click **Complete Order** button
3. You should be redirected to: `/payment/vietqr/[sessionId]`

## Step 3: Verify the VietQR Payment Page

On the VietQR payment page, you should see:

### ✅ Expected Elements:

1. **Page Header**: "VietQR Payment" with QR code icon
2. **Order ID**: Should display the order ID (e.g., `ORD-1234567890-xyz`)
3. **Payment Status**: "Awaiting Payment" message
4. **QR Code Image**: 
   - A large, scannable QR code
   - Should load from `img.vietqr.io`
5. **Payment Amount**: Total amount in VND format
6. **Bank Details Section**:
   - Bank code (e.g., VCB)
   - Account number
   - Account name
   - Transfer content/description
   - Copy buttons for each field
7. **Payment Instructions**: Step-by-step guide
8. **Action Buttons**:
   - "I've Completed Payment" button
   - "Return to Home" button

### 🔍 What to Check:

- [ ] QR code image loads successfully
- [ ] All bank details are displayed correctly
- [ ] Copy buttons work when clicked
- [ ] Amount is displayed in VND format
- [ ] No console errors (press F12 and check Console tab)

## Step 4: Debug if QR Code Doesn't Show

If the QR code doesn't appear, check the browser console (F12):

### Check Console Logs:

Look for these console messages:
```
Fetching order with sessionId: VQRSID-...
Response status: 200
Order data received: {...}
Order details: {...}
VietQR metadata: {...}
Generated QR URL: https://img.vietqr.io/image/...
```

### Common Issues:

#### 1. **"Order not found"**
- Check if the order was created in the database
- Go to admin panel: `/admin/collections/orders`
- Look for an order with the sessionId from the URL

#### 2. **"VietQR payment information not found in order"**
- The order was created but doesn't have VietQR metadata
- Check the order in admin panel
- Look at the `metadata` field - it should contain a `vietqr` object

#### 3. **QR code image fails to load**
- Check the browser Network tab (F12 → Network)
- Look for a request to `img.vietqr.io`
- If it's blocked, check your ad blocker or network settings
- Verify the generated URL is correctly formatted

#### 4. **"Failed to fetch order details"**
- Check the API response in Network tab
- Look for `/api/orders?where[sessionId][equals]=...`
- Status should be 200
- Response should contain the order data

### Manual Verification Steps:

1. **Check Order in Admin Panel**:
   ```
   http://localhost:3000/admin/collections/orders
   ```
   - Find the latest order
   - Click to view details
   - Check the `metadata` field
   - It should contain:
     ```json
     {
       "vietqr": {
         "bankId": "VCB",
         "accountNumber": "...",
         "accountName": "...",
         "template": "compact",
         "amount": 12345,
         "description": "Payment for order ORD-..."
       }
     }
     ```

2. **Test QR URL Directly**:
   - Copy the generated QR URL from console
   - Paste it in a new browser tab
   - The QR code image should load
   - Example URL:
     ```
     https://img.vietqr.io/image/VCB-9704229208387568-compact.png?amount=100000&addInfo=Payment%20for%20order%20ORD-123&accountName=NGUYEN%20VAN%20A
     ```

3. **Check sessionId Field**:
   - In admin panel, view the order
   - Find the `sessionId` field (in sidebar)
   - It should start with `VQRSID-`
   - This should match the sessionId in the payment page URL

## Step 5: Test Payment Completion

1. On the VietQR payment page, click **"I've Completed Payment"**
2. You should be redirected to: `/order-confirmation?orderId=...`
3. The order confirmation page should display

> **Note**: Payment verification is manual by default. You'll need to check your bank account and manually update the order status in the admin panel.

## Expected Console Output

When everything works correctly, you should see these logs in the browser console:

```javascript
// From checkout-form.tsx
Making checkout request to: /api/orders/checkout
Request body: {...}

// From VietQR payment page
Fetching order with sessionId: VQRSID-12345678-1234-1234-1234-123456789abc
Response status: 200
Order data received: { docs: [...], totalDocs: 1, ... }
Order details: { orderId: "ORD-...", metadata: {...}, ... }
VietQR metadata: { bankId: "VCB", accountNumber: "...", ... }
Generated QR URL: https://img.vietqr.io/image/VCB-...
```

## Example Bank Codes for Testing

Use these common Vietnamese bank codes for testing:

| Bank Name | Code | Full Name |
|-----------|------|-----------|
| Vietcombank | `VCB` | Vietnam Joint Stock Commercial Bank for Industry and Trade |
| Techcombank | `TCB` | Vietnam Technological and Commercial Joint Stock Bank |
| MB Bank | `MB` | Military Commercial Joint Stock Bank |
| ACB | `ACB` | Asia Commercial Bank |
| VPBank | `VPB` | Vietnam Prosperity Joint Stock Commercial Bank |
| BIDV | `BIDV` | Bank for Investment and Development of Vietnam |

## Troubleshooting Commands

### Check if orders are being created:
```bash
# In your project root
cd my-store
# Then open the database or check via API
curl http://localhost:3000/api/orders?limit=5
```

### Clear browser cache and reload:
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Check for JavaScript errors:
1. Open browser console (F12)
2. Go to Console tab
3. Look for red error messages

## Need Help?

If you're still having issues:

1. Check all console logs for errors
2. Verify the order was created in admin panel
3. Check that the VietQR payment method is enabled
4. Ensure the bank details are correctly configured
5. Try a different browser or clear cache
6. Check that Next.js image domain is configured in `next.config.mjs`

## Success Criteria

✅ Your VietQR integration is working if:

1. You can select VietQR as a payment method at checkout
2. After checkout, you're redirected to `/payment/vietqr/[sessionId]`
3. The QR code image loads and displays
4. All bank details are shown correctly
5. Copy buttons work
6. Clicking "I've Completed Payment" redirects to order confirmation
7. The order is created in the database with VietQR metadata

---

**Happy Testing! 🎉**

If all tests pass, your VietQR payment integration is working correctly and ready for production use (with proper payment verification implemented).

