import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log(`[CART_GET] Server error`, error);

    return NextResponse.json({ error: 'Failed to retrieve cart' });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
      },
      include: {
        ingredients: true,
      },
    });

    const isCartItemExist = !!findCartItems.find(
      (item) =>
        item.productItemId === data.productItemId &&
        item.ingredients.length === data.ingredients?.length &&
        item.ingredients.every((ingredient, index) => ingredient.id === data.ingredients?.[index])
    );

    if (isCartItemExist) {
      const sameItem = findCartItems.find(
        (item) =>
          item.productItemId === data.productItemId &&
          item.ingredients.length === data.ingredients?.length &&
          item.ingredients.every((ingredient, index) => ingredient.id === data.ingredients?.[index])
      );

      if (!sameItem) return;

      await prisma.cartItem.update({
        where: {
          id: sameItem?.id,
        },
        data: {
          quantity: sameItem?.quantity + 1,
        },
      });

      const updatedUserCart = await updateCartTotalAmount(token);

      return NextResponse.json(updatedUserCart);
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: 1,
        ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
      },
    });
    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set({ name: 'cartToken', value: token, maxAge: 60 * 60 * 24 });

    return resp;
  } catch (error) {
    console.log(`[CART_POST] Server error`, error);

    return NextResponse.json({ error: 'Falied to create cart' });
  }
}
