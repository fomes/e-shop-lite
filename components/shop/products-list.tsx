import stripe from "@/lib/stripe";
import { Product } from "@/types";
import React from "react";
import Stripe from "stripe";
import ProductCard from "./product-cart";

export async function getProducts() {
  try {
    const stripeProducts = await stripe.products.list({
      limit: 9,
      expand: ["data.default_price"],
    });

    return stripeProducts.data.map((item: Stripe.Product): Product => {
      return {
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        price: (item.default_price as Stripe.Price).unit_amount_decimal ?? "0",
        currency: (item.default_price as Stripe.Price).currency ?? "BRL",
        image: item.images[0],
        images: item.images,
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export default async function ProductsList() {
  const products = await getProducts();

  return (
    <section className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((item) => (
        <ProductCard {...item} key={item.id} />
      ))}
    </section>
  );
}
