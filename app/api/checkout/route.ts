import Stripe from "stripe";

import stripe from "@/lib/stripe";
import { Product } from "use-shopping-cart/core";
import { NextRequest, NextResponse } from "next/server";
import { validateCartItems } from "use-shopping-cart/utilities";

export async function POST(req: NextRequest) {
  try {
    const cartDetails = await req.json();
    const baseURL = req.headers.get("origin");

    const stripeInventory = await stripe.products.list({
      expand: ["data.default_price"],
    });

    const products = stripeInventory.data.map(
      (item: Stripe.Product): Product => {
        return {
          id: item.id.toString(),
          name: item.name,
          description: item.description ?? "",
          price: (item.default_price as Stripe.Price).unit_amount ?? 0,
          currency: (item.default_price as Stripe.Price).currency ?? "BRL",
          image: item.images[0],
        };
      }
    );

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      validateCartItems(products, cartDetails);
    console.log(line_items);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${baseURL}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseURL}/cart`,
    });

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
