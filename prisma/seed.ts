import { PrismaClient, Role, MeatType, CutType, LiveStatus, OrderStatus, PaymentStatus, PaymentMethod } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting FreshTrust Database Seeding...');

  // Hash password for seed users
  const passwordHash = await bcrypt.hash('FreshTrust@123', 10);

  // 1. Create Super Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@freshtrust.in' },
    update: {},
    create: {
      email: 'admin@freshtrust.in',
      name: 'Super Admin',
      phone: '+919876543210',
      passwordHash,
      role: Role.SUPER_ADMIN,
      walletBalance: 5000.0,
    },
  });

  // 2. Create Shop Owners & Dark Stores
  const shopOwner = await prisma.user.upsert({
    where: { email: 'owner.bkc@freshtrust.in' },
    update: {},
    create: {
      email: 'owner.bkc@freshtrust.in',
      name: 'Rajesh Sharma',
      phone: '+919876543211',
      passwordHash,
      role: Role.SHOP_OWNER,
    },
  });

  const shopBKC = await prisma.shop.upsert({
    where: { code: 'BKC-01' },
    update: {},
    create: {
      name: 'FreshTrust DarkStore BKC',
      code: 'BKC-01',
      city: 'Mumbai',
      address: 'G-Block, Bandra Kurla Complex, Mumbai, MH 400051',
      latitude: 19.0657,
      longitude: 72.8686,
      ownerId: shopOwner.id,
    },
  });

  // 3. Create Cameras & Workers
  const camera1 = await prisma.camera.upsert({
    where: { streamKey: 'CAM-BKC-STATION-1' },
    update: {},
    create: {
      shopId: shopBKC.id,
      name: 'Cutting Station 1 Cam (Top View)',
      streamKey: 'CAM-BKC-STATION-1',
      resolution: '1080p 60fps',
      status: LiveStatus.LIVE,
    },
  });

  const workerUser = await prisma.user.upsert({
    where: { email: 'master.ramesh@freshtrust.in' },
    update: {},
    create: {
      email: 'master.ramesh@freshtrust.in',
      name: 'Ramesh Butcher Master',
      phone: '+919876543212',
      passwordHash,
      role: Role.WORKER,
    },
  });

  const worker = await prisma.worker.upsert({
    where: { userId: workerUser.id },
    update: {},
    create: {
      userId: workerUser.id,
      shopId: shopBKC.id,
      cameraId: camera1.id,
      stationName: 'Station 1 - Precision Poultry & Mutton Cut',
      rating: 4.95,
    },
  });

  // 4. Create Categories & Products
  const catChicken = await prisma.category.upsert({
    where: { slug: 'fresh-chicken' },
    update: {},
    create: {
      name: 'Fresh Chicken',
      slug: 'fresh-chicken',
      description: 'Antibiotic-free, 100% farm fresh chicken cuts',
      imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500',
    },
  });

  const catMutton = await prisma.category.upsert({
    where: { slug: 'tender-mutton' },
    update: {},
    create: {
      name: 'Tender Mutton',
      slug: 'tender-mutton',
      description: 'Pasture-raised, tender goat meat cut fresh',
      imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500',
    },
  });

  const prod1 = await prisma.product.upsert({
    where: { slug: 'farm-fresh-chicken-curry-cut' },
    update: {},
    create: {
      categoryId: catChicken.id,
      name: 'Farm Fresh Chicken - Curry Cut',
      slug: 'farm-fresh-chicken-curry-cut',
      meatType: MeatType.CHICKEN,
      description: 'Cleaned, bone-in chicken pieces perfect for classic Indian curries.',
      pricePerKg: 320.0,
      netWeightGrams: 500,
      grossWeightGrams: 550,
      freshnessScore: 99,
      imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500',
    },
  });

  const prod2 = await prisma.product.upsert({
    where: { slug: 'tender-goat-mutton-biryani-cut' },
    update: {},
    create: {
      categoryId: catMutton.id,
      name: 'Tender Goat Mutton - Biryani Cut',
      slug: 'tender-goat-mutton-biryani-cut',
      meatType: MeatType.MUTTON,
      description: 'Succulent goat meat pieces with bone for rich biryani flavor.',
      pricePerKg: 780.0,
      netWeightGrams: 500,
      grossWeightGrams: 560,
      freshnessScore: 98,
      imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500',
    },
  });

  // 5. Create Inventory
  await prisma.inventory.upsert({
    where: { shopId_productId: { shopId: shopBKC.id, productId: prod1.id } },
    update: { stockKg: 45.0 },
    create: {
      shopId: shopBKC.id,
      productId: prod1.id,
      stockKg: 45.0,
      batchLotId: 'LOT-2026-CH-882',
    },
  });

  // 6. Create Customer & Address
  const customer = await prisma.user.upsert({
    where: { email: 'pratyush@example.com' },
    update: {},
    create: {
      email: 'pratyush@example.com',
      name: 'Pratyush Sharma',
      phone: '+919123456789',
      passwordHash,
      role: Role.CUSTOMER,
      walletBalance: 1250.0,
      isVipMember: true,
    },
  });

  const address = await prisma.address.create({
    data: {
      userId: customer.id,
      addressLine1: 'Apartment 4B, Emerald Towers',
      addressLine2: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      latitude: 19.0596,
      longitude: 72.8295,
      isDefault: true,
    },
  });

  // 7. Create Delivery Rider
  const riderUser = await prisma.user.upsert({
    where: { email: 'rider.vikram@freshtrust.in' },
    update: {},
    create: {
      email: 'rider.vikram@freshtrust.in',
      name: 'Vikram Rider',
      phone: '+919988776655',
      passwordHash,
      role: Role.DELIVERY_PARTNER,
    },
  });

  const rider = await prisma.deliveryPartner.upsert({
    where: { userId: riderUser.id },
    update: {},
    create: {
      userId: riderUser.id,
      vehicleType: 'Ather 450X EV',
      vehicleNo: 'MH-02-FT-4092',
      latitude: 19.0620,
      longitude: 72.8550,
      walletEarned: 1840.0,
    },
  });

  // 8. Create Sample Order
  const order = await prisma.order.create({
    data: {
      orderNumber: 'FT-2026-89102',
      customerId: customer.id,
      shopId: shopBKC.id,
      addressId: address.id,
      workerId: worker.id,
      deliveryPartnerId: rider.id,
      status: OrderStatus.LIVE_STREAMING,
      totalAmount: 1100.0,
      discountAmount: 100.0,
      deliveryFee: 0.0,
      finalAmount: 1000.0,
      deliveryOtp: '4892',
      estimatedMins: 22,
      orderItems: {
        create: [
          {
            productId: prod1.id,
            cutType: CutType.CURRY_CUT,
            quantity: 2,
            unitPrice: 320.0,
            totalPrice: 640.0,
          },
          {
            productId: prod2.id,
            cutType: CutType.BIRYANI_CUT,
            quantity: 1,
            unitPrice: 460.0,
            totalPrice: 460.0,
          },
        ],
      },
      payments: {
        create: {
          userId: customer.id,
          paymentMethod: PaymentMethod.RAZORPAY,
          status: PaymentStatus.COMPLETED,
          razorpayOrderId: 'order_Nkt88271',
          razorpayPaymentId: 'pay_Nkt88271_99',
          amount: 1000.0,
        },
      },
    },
  });

  console.log('✅ FreshTrust Database Seeded Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
