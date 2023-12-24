"use client";

import { Check } from "lucide-react";
import React, { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
  params: {
    sessionId: string;
  };
}

export default function SuccessPage({ params }: SuccessProps) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container my-10 space-y-4 flex flex-col items-center justify-center">
      <Check className="w-24 h-24 text-green-500" />
      <h1 className="text-2xl">Obrigado e Parabéns pela compra.</h1>
    </div>
  );
}
