"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

export default function ProductCard({
  id,
  name,
  description,
  price,
  currency,
  image,
  images,
}: Product) {

  const { addItem } = useShoppingCart();

  const formattedPrice = formatCurrencyString({
    value: Number(price),
    currency,
    language: "pt-BR",
  });

  async function addToCart() {}

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center min-h-[4rem]">
          {name}
        </CardTitle>
        <CardDescription className="relative w-full h-60">
          <Image
            src={image}
            fill
            sizes="100%"
            alt={name}
            className="object-contain"
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="min-h-[6rem]">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Preço</p>
          <p>{formattedPrice}</p>
        </div>

        <Button size={"lg"} variant={"default"} onClick={addToCart}>
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
}
