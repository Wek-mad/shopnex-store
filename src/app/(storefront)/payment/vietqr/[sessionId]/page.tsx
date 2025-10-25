"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Copy, QrCode, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface OrderDetails {
    orderId: string;
    totalAmount: number;
    currency: string;
    paymentStatus: string;
    metadata: {
        vietqr?: {
            bankId: string;
            accountNumber: string;
            accountName: string;
            amount: number;
            description: string;
            template: string;
        };
        customer?: {
            email: string;
            firstName: string;
            lastName: string;
        };
    };
}

export default function VietQRPaymentPage() {
    const params = useParams();
    const router = useRouter();
    const sessionId = params?.sessionId as string;
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                console.log("Fetching order with sessionId:", sessionId);
                
                // Fetch order by sessionId
                const queryParams = new URLSearchParams({
                    'where[sessionId][equals]': sessionId,
                    'limit': '1',
                });
                
                const response = await fetch(`/api/orders?${queryParams.toString()}`);

                console.log("Response status:", response.status);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Response error:", errorText);
                    throw new Error("Failed to fetch order details");
                }

                const data = await response.json();
                console.log("Order data received:", data);

                if (!data.docs || data.docs.length === 0) {
                    console.error("No order found with sessionId:", sessionId);
                    throw new Error("Order not found. Please check your order ID.");
                }

                const order = data.docs[0];
                console.log("Order details:", order);
                setOrderDetails(order);

                // Generate VietQR URL using vietqr.io API
                const vietqr = order.metadata?.vietqr;
                console.log("VietQR metadata:", vietqr);
                
                if (vietqr) {
                    const { bankId, accountNumber, accountName, amount, description, template } = vietqr;
                    
                    // VietQR API format: https://img.vietqr.io/image/{BANK_ID}-{ACCOUNT_NO}-{TEMPLATE}.png?amount={AMOUNT}&addInfo={DESCRIPTION}&accountName={ACCOUNT_NAME}
                    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNumber}-${template || 'compact'}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;
                    
                    console.log("Generated QR URL:", qrUrl);
                    setQrCodeUrl(qrUrl);
                } else {
                    console.warn("No VietQR metadata found in order");
                    setError("VietQR payment information not found in order");
                }

                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching order:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load payment details"
                );
                setIsLoading(false);
            }
        };

        if (sessionId) {
            fetchOrderDetails();
        }
    }, [sessionId]);

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
    };

    const handlePaymentComplete = () => {
        if (orderDetails) {
            router.push(`/order-confirmation?orderId=${orderDetails.orderId}`);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">
                        Loading payment details...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !orderDetails) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                                <h2 className="text-2xl font-bold">
                                    Payment Error
                                </h2>
                                <p className="text-muted-foreground">
                                    {error || "Unable to load payment details"}
                                </p>
                                <Button onClick={() => router.push("/")}>
                                    Return to Home
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const vietqr = orderDetails.metadata?.vietqr;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <QrCode className="h-8 w-8 text-primary" />
                        <h1 className="text-3xl font-bold">VietQR Payment</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Order ID: {orderDetails.orderId}
                    </p>
                </div>

                {/* Payment Status */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">
                                    Awaiting Payment
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Please scan the QR code below to complete your payment
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* QR Code Display */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">
                            Scan QR Code to Pay
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* QR Code Image */}
                        <div className="flex justify-center">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                {qrCodeUrl ? (
                                    <Image
                                        src={qrCodeUrl}
                                        alt="VietQR Payment QR Code"
                                        width={400}
                                        height={400}
                                        className="rounded"
                                        priority
                                    />
                                ) : (
                                    <div className="w-[400px] h-[400px] bg-muted flex items-center justify-center rounded">
                                        <p className="text-muted-foreground">
                                            QR Code not available
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Amount */}
                        <div className="text-center py-4 bg-muted/50 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">
                                Amount to Pay
                            </p>
                            <p className="text-3xl font-bold">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(orderDetails.totalAmount)}
                            </p>
                        </div>

                        {/* Bank Details */}
                        {vietqr && (
                            <div className="space-y-3 pt-4 border-t">
                                <h3 className="font-semibold text-center">
                                    Bank Transfer Details
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                                        <span className="text-sm font-medium">
                                            Bank:
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono">
                                                {vietqr.bankId}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        vietqr.bankId,
                                                        "Bank code"
                                                    )
                                                }
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                                        <span className="text-sm font-medium">
                                            Account Number:
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono">
                                                {vietqr.accountNumber}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        vietqr.accountNumber,
                                                        "Account number"
                                                    )
                                                }
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                                        <span className="text-sm font-medium">
                                            Account Name:
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span>{vietqr.accountName}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        vietqr.accountName,
                                                        "Account name"
                                                    )
                                                }
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                                        <span className="text-sm font-medium">
                                            Transfer Content:
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-sm">
                                                {vietqr.description}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        vietqr.description,
                                                        "Transfer content"
                                                    )
                                                }
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
                            <p className="font-medium text-sm">
                                Payment Instructions:
                            </p>
                            <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                                <li>Open your banking app</li>
                                <li>Select "Scan QR" or "Transfer"</li>
                                <li>Scan the QR code above</li>
                                <li>Verify the amount and transfer content</li>
                                <li>Complete the payment</li>
                                <li>
                                    Click "I've Completed Payment" button below
                                </li>
                            </ol>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 pt-4">
                            <Button
                                size="lg"
                                onClick={handlePaymentComplete}
                                className="w-full"
                            >
                                <CheckCircle className="h-5 w-5 mr-2" />
                                I've Completed Payment
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => router.push("/")}
                                className="w-full"
                            >
                                Return to Home
                            </Button>
                        </div>

                        {/* Important Note */}
                        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
                            <p>
                                ⚠️ Please ensure you enter the correct transfer
                                content to help us verify your payment quickly.
                            </p>
                            <p className="mt-1">
                                Payment verification may take 5-15 minutes.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

