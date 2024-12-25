import { hashSync } from 'bcrypt';
import { prisma } from './prisma-client';
import { categories, ingredients, products } from './constants';
import { Prisma } from '@prisma/client';

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(10, 57),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'John Levison',
        email: 'bQdJt@example.com',
        password: hashSync('password123', 10),
        role: 'USER',
        verified: new Date(),
      },
      {
        fullName: 'Michael Smith',
        email: 'jKqQ5@example.com',
        password: hashSync('password123', 10),
        role: 'ADMIN',
        verified: new Date(),
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepperoni Fresh',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheese',
      imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo Fresh',
      imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: `1111`,
      },
      {
        userId: 2,
        totalAmount: 0,
        token: `2222`,
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: 'https://i.pinimg.com/564x/5e/2e/07/5e2e074b6866d32dbc703e41efb5b294.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/6e/25/33/6e2533eb983506a1d66c8011df3386f3.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/50/46/46/5046465392610fe31dc53d2444171b6d.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/17/58/de/1758ded1f3368c40e61e06ba947eae1c.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/6e/90/67/6e9067dc508141e82b12ece060e744b4.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/57/9d/dd/579ddd5a985eeea569ac3246b65a06a8.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/cf/1a/9f/cf1a9f0bdf5a77270ebb4729d0a46279.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/736x/a1/6c/d0/a16cd054a6c4a6426a9f0260eeb573f6.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/736x/89/32/0a/89320ab23b8d4ecde20473f98ae4fa65.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/49/42/56/494256ab48a17e4cf914451131823d4c.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/ed/a6/18/eda618f0b4be3c129cc415c47d83f34c.jpg',
      },
      {
        previewImageUrl: 'https://i.pinimg.com/564x/09/30/09/093009e8ec1461762750f45784f6ae73.jpg',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: 'https://i.pinimg.com/564x/d8/a1/3b/d8a13b62b5e7d4ece3869a05d05f3723.jpg',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.pinimg.com/564x/2f/ba/26/2fba26e98b8053cc54f84f2306d1e518.jpg',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.pinimg.com/564x/6c/4b/14/6c4b14869b1ebbe82907f9230efa88c8.jpg',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.pinimg.com/564x/c1/e6/4b/c1e64bc86b10549fdb60cbccf70e50e9.jpg',
      },
      {
        storyId: 1,
        sourceUrl: 'https://i.pinimg.com/564x/c0/77/c8/c077c82e1e11cd17ba885493448035ba.jpg',
      },
      {
        storyId: 2,
        sourceUrl: 'https://i.pinimg.com/564x/c8/ec/ba/c8ecba9f8747dfbad6015ff583793c44.jpg',
      },
      {
        storyId: 2,
        sourceUrl: 'https://i.pinimg.com/564x/c8/ec/ba/c8ecba9f8747dfbad6015ff583793c44.jpg',
      },
      {
        storyId: 2,
        sourceUrl: 'https://i.pinimg.com/736x/1e/21/bb/1e21bb16595cb7e98999dbd67049ca9f.jpg',
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
