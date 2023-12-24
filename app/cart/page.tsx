"use client";

import React, { useState } from "react";

import { toast } from "react-toastify";
import { Loader, Trash2 } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Cart() {
  const { cartCount, cartDetails, redirectToCheckout } = useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function checkout() {}

  return (
    <section className="container flex flex-col my-2 space-y-2">
      {cartDetails &&
        Object.keys(cartDetails).map((key) => (
          <Card key={cartDetails[key].id}>
            <CardHeader>
              <CardTitle className="tracking-wider">
                {cartDetails[key].name} ({cartDetails[key].quantity})
              </CardTitle>
              <CardDescription className="text-sm tracking-wide">
                {cartDetails[key].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-28 h-28">
                    <Image
                      src={cartDetails[key].image || ""}
                      fill
                      sizes="100%"
                      alt={cartDetails[key].name}
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-base font-medium leading-none">Preço</p>
                    <p className="text-balance text-muted-foreground">
                      {cartDetails[key].formattedValue}
                    </p>
                  </div>
                </div>

                <Trash2 className="cursor-pointer text-red-400 hover:text-red-600 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>
        ))}

      <div
        className={cn(
          "flex items-center justify-end",
          cartCount === undefined || cartCount <= 0 ? "hidden" : ""
        )}
      >
        <Button
          variant={"default"}
          size={"lg"}
          onClick={checkout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <div className="flex items-center justify-between gap-2">
              <Loader className="animate-spin 2s repeat-infinite" />{" "}
              Finalizando...
            </div>
          ) : (
            "Finalizar"
          )}
        </Button>
      </div>
    </section>
  );
}
