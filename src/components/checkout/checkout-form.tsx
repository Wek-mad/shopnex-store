"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderSummary } from "./order-summary";
import { ArrowLeft, CreditCard, Lock, Truck } from "lucide-react";
import Link from "next/link";
import {
    getPaymentMethods,
    getShippingMethods,
    createOrder,
    calculateShipping,
    calculateTax,
    calculateTotal,
    type PaymentMethod,
    type ShippingMethod,
} from "@/lib/checkout";
import { toast } from "sonner";

interface CheckoutFormData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    paymentMethodId: string;
    shippingMethodId: string;
    saveInfo: boolean;
    useSameAddress: boolean;
    billingFirstName: string;
    billingLastName: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    billingZipCode: string;
    billingCountry: string;
}

export function CheckoutForm() {
    const { items, getTotalPrice, clearCart } = useCart();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>(
        []
    );
    const [selectedShipping, setSelectedShipping] =
        useState<ShippingMethod | null>(null);
    const [formData, setFormData] = useState<CheckoutFormData>({
        email:
            process.env.NODE_ENV === "development"
                ? "john.doe@example.com"
                : "",
        firstName: process.env.NODE_ENV === "development" ? "John" : "",
        lastName: process.env.NODE_ENV === "development" ? "Doe" : "",
        address:
            process.env.NODE_ENV === "development" ? "123 Main Street" : "",
        city: process.env.NODE_ENV === "development" ? "New York" : "",
        state: process.env.NODE_ENV === "development" ? "NY" : "",
        zipCode: process.env.NODE_ENV === "development" ? "10001" : "",
        country: "US",
        paymentMethodId: "",
        shippingMethodId: "",
        saveInfo: false,
        useSameAddress: true,
        billingFirstName: process.env.NODE_ENV === "development" ? "John" : "",
        billingLastName: process.env.NODE_ENV === "development" ? "Doe" : "",
        billingAddress:
            process.env.NODE_ENV === "development" ? "123 Main Street" : "",
        billingCity: process.env.NODE_ENV === "development" ? "New York" : "",
        billingState: process.env.NODE_ENV === "development" ? "NY" : "",
        billingZipCode: process.env.NODE_ENV === "development" ? "10001" : "",
        billingCountry: "US",
    });

    useEffect(() => {
        const loadMethods = async () => {
            const [payments, shipping] = await Promise.all([
                getPaymentMethods(),
                getShippingMethods(),
            ]);
            setPaymentMethods(payments);
            setShippingMethods(shipping);

            // Set default payment method
            if (payments.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    paymentMethodId: payments[0].id,
                }));
            }

            // Set default shipping method
            if (shipping.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    shippingMethodId: shipping[0].id,
                }));
                setSelectedShipping(shipping[0]);
            }
        };

        loadMethods();
    }, []);

    useEffect(() => {
        const shipping = shippingMethods.find(
            (s) => s.id === formData.shippingMethodId
        );
        setSelectedShipping(shipping || null);
    }, [formData.shippingMethodId, shippingMethods]);

    const handleInputChange = (
        field: keyof CheckoutFormData,
        value: string | boolean
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const subtotal = getTotalPrice();
    const shippingCost = calculateShipping(subtotal, selectedShipping);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, shippingCost, tax);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate required fields
            if (!formData.paymentMethodId || !formData.shippingMethodId) {
                toast.error("Please select payment and shipping methods");
                setIsLoading(false);
                return;
            }

            if (items.length === 0) {
                toast.error("Your cart is empty");
                setIsLoading(false);
                return;
            }

            // Create order using simple checkout endpoint
            const result = await createOrder({
                items: items,
                customerInfo: {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                },
                paymentMethodId: formData.paymentMethodId,
                shippingMethodId: formData.shippingMethodId,
                subtotal: subtotal,
                shipping: shippingCost,
                tax: tax,
                total: total,
            });

            if (result.error) {
                toast.error(result.error);
                setIsLoading(false);
                return;
            }

            if (!result.orderId) {
                toast.error("Failed to create order");
                setIsLoading(false);
                return;
            }

            // Store order data for confirmation
            const orderData = {
                id: result.orderId,
                items: items,
                total: total,
                subtotal: subtotal,
                shipping: shippingCost,
                tax: tax,
                customerInfo: {
                    email: formData.email,
                    name: `${formData.firstName} ${formData.lastName}`,
                    address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
                },
                shippingMethod: selectedShipping?.name,
                date: new Date().toISOString(),
            };

            localStorage.setItem("lastOrder", JSON.stringify(orderData));

            // Clear cart
            clearCart();

            // Redirect to confirmation
            router.push(`/order-confirmation?orderId=${result.orderId}`);
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Checkout failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-16 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">
                        Your cart is empty
                    </h2>
                    <p className="text-muted-foreground">
                        Add some products before checking out
                    </p>
                </div>
                <Link href="/products">
                    <Button size="lg">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Checkout Form */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "firstName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "lastName",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "address",
                                            e.target.value
                                        )
                                    }
                                    placeholder="123 Main Street"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "city",
                                                e.target.value
                                            )
                                        }
                                        placeholder="New York"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Select
                                        value={formData.state}
                                        onValueChange={(value) =>
                                            handleInputChange("state", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AL">
                                                Alabama
                                            </SelectItem>
                                            <SelectItem value="CA">
                                                California
                                            </SelectItem>
                                            <SelectItem value="FL">
                                                Florida
                                            </SelectItem>
                                            <SelectItem value="NY">
                                                New York
                                            </SelectItem>
                                            <SelectItem value="TX">
                                                Texas
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input
                                        id="zipCode"
                                        value={formData.zipCode}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "zipCode",
                                                e.target.value
                                            )
                                        }
                                        placeholder="10001"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Select
                                        value={formData.country}
                                        onValueChange={(value) =>
                                            handleInputChange("country", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="US">
                                                United States
                                            </SelectItem>
                                            <SelectItem value="CA">
                                                Canada
                                            </SelectItem>
                                            <SelectItem value="UK">
                                                United Kingdom
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Methods */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                Shipping Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {shippingMethods.length > 0 ? (
                                <div className="space-y-2">
                                    {shippingMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="flex items-start space-x-3 p-2 border rounded-lg hover:bg-muted/50"
                                        >
                                            <input
                                                type="radio"
                                                id={`shipping-${method.id}`}
                                                name="shipping"
                                                value={method.id}
                                                checked={
                                                    formData.shippingMethodId ===
                                                    method.id
                                                }
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "shippingMethodId",
                                                        e.target.value
                                                    )
                                                }
                                                className="h-4 w-4"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <Label
                                                        htmlFor={`shipping-${method.id}`}
                                                        className="font-medium text-sm cursor-pointer"
                                                    >
                                                        {method.name}
                                                    </Label>
                                                    <span className="font-semibold text-sm">
                                                        {method.freeShippingMinOrder &&
                                                        subtotal >=
                                                            method.freeShippingMinOrder
                                                            ? "Free"
                                                            : `$${method.baseRate.toFixed(2)}`}
                                                    </span>
                                                </div>
                                                {(method.estimatedDeliveryDays ||
                                                    method.notes) && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {
                                                            method.estimatedDeliveryDays
                                                        }
                                                        {method.estimatedDeliveryDays &&
                                                            method.notes &&
                                                            " • "}
                                                        {method.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">
                                    Loading shipping methods...
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Payment Methods */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {paymentMethods.length > 0 ? (
                                <div className="space-y-2">
                                    {paymentMethods.map((method) => {
                                        const provider = method.providers[0];
                                        return (
                                            <div
                                                key={method.id}
                                                className="flex items-start space-x-3 p-2 border rounded-lg hover:bg-muted/50"
                                            >
                                                <input
                                                    type="radio"
                                                    id={`payment-${method.id}`}
                                                    name="payment"
                                                    value={method.id}
                                                    checked={
                                                        formData.paymentMethodId ===
                                                        method.id
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "paymentMethodId",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="h-4 w-4"
                                                />
                                                <div className="flex-1">
                                                    <Label
                                                        htmlFor={`payment-${method.id}`}
                                                        className="font-medium text-sm cursor-pointer"
                                                    >
                                                        {method.name}
                                                    </Label>
                                                    {provider?.instructions && (
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {
                                                                provider.instructions
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">
                                    Loading payment methods...
                                </p>
                            )}

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="saveInfo"
                                    checked={formData.saveInfo}
                                    onCheckedChange={(checked) =>
                                        handleInputChange(
                                            "saveInfo",
                                            checked as boolean
                                        )
                                    }
                                />
                                <Label htmlFor="saveInfo" className="text-sm">
                                    Save this information for next time
                                </Label>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                <Lock className="h-3 w-3" />
                                Your payment information is secure and encrypted
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="sticky top-22">
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shippingCost}
                            tax={tax}
                            total={total}
                            shippingMethodName={selectedShipping?.name}
                        />

                        <div className="mt-6 space-y-4">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="h-4 w-4 mr-2" />
                                        Complete Order
                                    </>
                                )}
                            </Button>

                            <Link href="/cart">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full bg-transparent"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Cart
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
