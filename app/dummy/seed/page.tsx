import React from "react";
import stripe from "@/lib/stripe";
import { DummyProduct } from "@/types";

async function getDummyProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=9");
  const data = await res.json();

  const products = data.products.map((item: DummyProduct) => {
    return {
      id: item.id,
      description: item.description,
      name: item.title,
      images: item.images,
      default_price_data: {
        unit_amount_decimal: item.price,
        currency: "BRL",
      },
    };
  });

  return products;
}

async function seedDummyData() {
  const products = await getDummyProducts();

  await products.map(async (item: any) => {
    try {
      const productCreated = await stripe.products.create(item);
      console.log(productCreated.name);
    } catch (err: any) {
      console.log("STRIPE_CREATE_ERROR: ", err.message);
    }
  });
}

export default async function Seed() {
  await seedDummyData();

  return (
    <div className="container flex items-center justify-center">
      <h1 className="text-3xl text-green-600 font-extrabold">
        Dummy Data Created on your Stripe Inventory
      </h1>
    </div>
  );
}
