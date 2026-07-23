import { DataSource } from 'typeorm';
import { ormConfig } from './data-source';
import { User } from '../user/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-Item.entiy';
import { Order } from '../order/entities/order.entity';
import { OrderItem } from '../order/entities/order-item.entity';
import { Review } from '../review/entities/review.entity';
import { Favourite } from '../favourite/entities/favourite.entity';
import { Coupon } from '../coupons/entities/coupon.entity';
import { JWTManagement } from '../jwt/entities/jwt.entity';
import { genSalt, hash } from 'bcrypt';
import { Role } from '../auth/enums/role.enum';
import { faker } from '@faker-js/faker';

const seedDataSource = new DataSource({
  ...ormConfig,
  entities: [
    User,
    Category,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
    Review,
    Favourite,
    Coupon,
    JWTManagement,
  ],
});

async function seed() {
  console.log('Connecting to database...');
  await seedDataSource.initialize();
  console.log('Connected.');

  console.log('Clearing database tables...');
  // Clear tables in cascade
  const tables = [
    'jwt_management',
    'favourite',
    'review',
    'order_item',
    'order',
    'cart_item',
    'cart',
    'product',
    'category',
    'user',
    'coupon',
  ];
  for (const table of tables) {
    try {
      await seedDataSource.query(`TRUNCATE TABLE "${table}" CASCADE;`);
    } catch (e) {
      console.warn(
        `Could not truncate table "${table}", it may not exist yet or there was an error:`,
        e.message,
      );
    }
  }
  console.log('Database cleared.');

  // 1. Seed Users
  console.log('Seeding users...');
  const salt = await genSalt(10);
  const adminPassword = await hash('Admin@123', salt);
  const managerPassword = await hash('Manager@123', salt);
  const userPassword = await hash('User@123', salt);

  const usersData: Partial<User>[] = [
    {
      username: 'admin',
      email: 'admin@gmail.com',
      phone: '1234567890',
      address: 'Admin Headquarters',
      password: adminPassword,
      role: Role.ADMIN,
    },
    {
      username: 'manager',
      email: 'manager@gmail.com',
      phone: '1234567891',
      address: 'Manager Suite',
      password: managerPassword,
      role: Role.MANAGER,
    },
    {
      username: 'user',
      email: 'user@gmail.com',
      phone: '1234567892',
      address: '123 User Street',
      password: userPassword,
      role: Role.USER,
    },
  ];

  // Add some fake users
  for (let i = 1; i <= 5; i++) {
    usersData.push({
      username: faker.internet.userName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      password: userPassword,
      role: Role.USER,
    });
  }

  const userRepo = seedDataSource.getRepository(User);
  const seededUsers = await userRepo.save(usersData);
  console.log(`Seeded ${seededUsers.length} users.`);

  // 2. Seed Categories
  console.log('Seeding categories...');
  const categoryRepo = seedDataSource.getRepository(Category);
  const categoriesData = [
    { name: 'Electronics' },
    { name: 'Clothing & Fashion' },
    { name: 'Home & Kitchen' },
    { name: 'Books & Stationery' },
    { name: 'Sports & Fitness' },
  ];
  const seededCategories = await categoryRepo.save(categoriesData);
  console.log(`Seeded ${seededCategories.length} categories.`);

  // 3. Seed Products
  console.log('Seeding products...');
  const productRepo = seedDataSource.getRepository(Product);

  const categoryMap = new Map<string, Category>();
  seededCategories.forEach((cat) => {
    categoryMap.set(cat.name, cat);
  });

  const productsData: Partial<Product>[] = [];

  // Define curated high-quality products for each category
  const curatedProducts = {
    Electronics: [
      {
        name: 'SuperSound Wireless Headphones',
        price: 200,
        stock: 50,
        description:
          'Immersive noise-cancelling wireless headphones with 40-hour battery life and high-fidelity sound.',
        img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'UltraWide Curved Gaming Monitor',
        price: 350,
        stock: 20,
        description:
          '34-inch curved gaming monitor with 144Hz refresh rate, 1ms response time, and HDR support.',
        img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'SmartVibe Fitness Watch',
        price: 90,
        stock: 100,
        description:
          'Sleek smart watch featuring heart rate monitor, sleep tracking, GPS, and multi-sport modes.',
        img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'ProStream Mechanical Keyboard',
        price: 130,
        stock: 35,
        description:
          'RGB mechanical keyboard with tactile brown switches, dedicated media controls, and wrist rest.',
        img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'PocketBeats Portable Speaker',
        price: 50,
        stock: 75,
        description:
          'IPX7 waterproof portable bluetooth speaker with deep bass and 12-hour continuous playtime.',
        img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60',
      },
    ],
    'Clothing & Fashion': [
      {
        name: 'Classic Denim Jacket',
        price: 80,
        stock: 40,
        description:
          'Timeless style button-front denim jacket made from 100% premium cotton with dual chest pockets.',
        img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Urban Leather Sneakers',
        price: 110,
        stock: 25,
        description:
          'Clean and minimal lifestyle sneakers crafted from genuine leather with a durable rubber cupsole.',
        img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Minimalist Leather Backpack',
        price: 145,
        stock: 15,
        description:
          'Elegant daypack featuring padded laptop compartment, front zip pocket, and water-resistant lining.',
        img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Cozy Knit Sweater',
        price: 60,
        stock: 60,
        description:
          'Warm and comfortable crewneck knit sweater made with a premium wool blend, perfect for layering.',
        img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Polarized Retro Sunglasses',
        price: 30,
        stock: 120,
        description:
          'Unisex classic design sunglasses with HD polarized lenses, providing 100% UV400 protection.',
        img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=60',
      },
    ],
    'Home & Kitchen': [
      {
        name: 'Precision Drip Coffee Maker',
        price: 90,
        stock: 30,
        description:
          'Programmable 12-cup drip coffee machine with adjustable brew strength and thermal heating plate.',
        img: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Cast Iron Dutch Oven',
        price: 70,
        stock: 45,
        description:
          'Heavy-duty 5-quart enameled cast iron Dutch oven with lid, excellent for slow cooking and baking.',
        img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Aromatic Essential Oil Diffuser',
        price: 25,
        stock: 80,
        description:
          'Ultrasonic cool mist humidifier and aromatherapy diffuser with 7-color ambient LED lighting.',
        img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Stainless Steel Knife Set',
        price: 120,
        stock: 20,
        description:
          'Professional 15-piece kitchen knife block set with built-in sharpener, made from high-carbon steel.',
        img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Ceramic Non-Stick Cookware',
        price: 150,
        stock: 15,
        description:
          'Healthy ceramic non-stick 10-piece pots and pans set, free of PFAS, PFOA, lead, and cadmium.',
        img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&auto=format&fit=crop&q=60',
      },
    ],
    'Books & Stationery': [
      {
        name: 'Leather Bound Daily Journal',
        price: 20,
        stock: 150,
        description:
          'Handcrafted genuine leather journal with 200 pages of thick lined paper, ideal for writing or sketching.',
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Elegant Fountain Pen Set',
        price: 45,
        stock: 50,
        description:
          'Premium lacquer finish fountain pen with fine nib, including 6 ink cartridges and a luxury gift case.',
        img: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'The Art of Simple Living (Book)',
        price: 15,
        stock: 200,
        description:
          'A beautifully written guide on minimalism, mindfulness, and finding peace in everyday routine.',
        img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Minimalist Metal Desk Organizer',
        price: 35,
        stock: 40,
        description:
          'Stylish steel mesh desk organizer with compartments for files, notebooks, pens, and accessories.',
        img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'World Map Wall Art',
        price: 30,
        stock: 60,
        description:
          'Vintage style canvas world map print stretched over wooden frames, perfect for office or home decoration.',
        img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=60',
      },
    ],
    'Sports & Fitness': [
      {
        name: 'Premium Yoga Mat',
        price: 40,
        stock: 90,
        description:
          'Eco-friendly TPE yoga mat with dual-sided non-slip texture and alignment lines, 1/4-inch thickness.',
        img: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Adjustable Dumbbell Set',
        price: 250,
        stock: 12,
        description:
          'Space-saving adjustable dumbbells with selector dial, range from 5 to 52.5 lbs per dumbbell.',
        img: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Insulated Stainless Water Bottle',
        price: 25,
        stock: 110,
        description:
          'Double-walled vacuum insulated water bottle, keeps beverages ice cold for 24h or hot for 12h.',
        img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'High-Density Foam Roller',
        price: 20,
        stock: 70,
        description:
          '18-inch high-density foam roller for muscle massage, recovery, and physical therapy exercises.',
        img: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=800&auto=format&fit=crop&q=60',
      },
      {
        name: 'Waterproof Hiking Backpack',
        price: 90,
        stock: 25,
        description:
          '45L durable outdoor hiking daypack with rain cover, trekking pole attachments, and hydration sleeve.',
        img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60',
      },
    ],
  };

  for (const [categoryName, products] of Object.entries(curatedProducts)) {
    const category = categoryMap.get(categoryName);
    if (!category) continue;

    for (const prod of products) {
      productsData.push({
        ...prod,
        rate: faker.number.int({ min: 3, max: 5 }),
        categoryId: category.id,
        category: category,
      });
    }
  }

  const seededProducts = await productRepo.save(productsData);
  console.log(`Seeded ${seededProducts.length} products.`);

  console.log('Seeding completed successfully! 🎉');
  await seedDataSource.destroy();
}

seed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
