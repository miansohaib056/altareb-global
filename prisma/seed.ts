import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

function toSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ────────────────────────────────────────────────────────────────
// Product definition helper type
// ────────────────────────────────────────────────────────────────
interface ProductDef {
  name: string;
  price: number;
  inStock: boolean;
  featured?: boolean;
  description: string;
}

async function main() {
  console.log("Seeding database...\n");

  // ──────────────────────────────────────────────
  // 1. Admin User
  // ──────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin123!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@altarebglobal.com" },
    update: { name: "Admin", role: "ADMIN", password: hashedPassword },
    create: {
      email: "admin@altarebglobal.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log(`Admin user upserted: ${admin.email}`);

  // ──────────────────────────────────────────────
  // 2. Categories
  // ──────────────────────────────────────────────
  const categoriesData = [
    {
      name: "Dates",
      slug: "dates",
      description: "Premium handpicked Saudi dates",
      sortOrder: 1,
    },
    {
      name: "Hijazi Taste",
      slug: "hijazi-taste",
      description: "Traditional Hijazi mamoul and date-filled delicacies",
      sortOrder: 2,
    },
    {
      name: "Aziz Nuts",
      slug: "aziz-nuts",
      description: "Premium roasted nuts and seeds",
      sortOrder: 3,
    },
    {
      name: "Chiki Chika",
      slug: "chiki-chika",
      description: "Delicious cocoa cream biscuits",
      sortOrder: 4,
    },
    {
      name: "Oslo",
      slug: "oslo",
      description: "Premium chocolate cakes and confections",
      sortOrder: 5,
    },
    {
      name: "Pure Natural",
      slug: "pure-natural",
      description: "Natural honey and organic products",
      sortOrder: 6,
    },
  ];

  const categories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        sortOrder: cat.sortOrder,
      },
      create: cat,
    });
    categories[cat.slug] = created.id;
    console.log(`Category upserted: ${cat.name}`);
  }

  // ──────────────────────────────────────────────
  // 3. Products — ALL 72
  // ──────────────────────────────────────────────

  // --- DATES (4) ---
  const datesProducts: ProductDef[] = [
    {
      name: "Ajwa Dates",
      price: 21.0,
      inStock: false,
      description:
        "Premium Ajwa dates from Madinah, known for their soft texture, rich flavor, and spiritual significance.",
    },
    {
      name: "Safawi Dates",
      price: 18.0,
      inStock: false,
      description:
        "Dark, semi-dry Safawi dates from Madinah with a delightfully soft texture and a sweet, mildly rich taste.",
    },
    {
      name: "Sagai Dates",
      price: 18.0,
      inStock: false,
      description:
        "Two-toned Sagai dates featuring a crispy top and soft bottom, offering a unique combination of textures.",
    },
    {
      name: "Sukkari Dates",
      price: 15.5,
      inStock: false,
      description:
        "Golden Sukkari dates prized for their caramel-like sweetness and melt-in-your-mouth texture.",
    },
  ];

  // --- HIJAZI TASTE (43) ---
  const hijaziProducts: ProductDef[] = [
    {
      name: "Date Cake - Millet",
      price: 80.0,
      inStock: true,
      featured: true,
      description:
        "Wholesome millet-based date cake, blending the natural sweetness of dates with nutritious millet flour.",
    },
    {
      name: "Date Cake - Vanilla",
      price: 80.0,
      inStock: true,
      description:
        "Classic vanilla-infused date cake combining aromatic vanilla with the natural caramel sweetness of dates.",
    },
    {
      name: "Date Cake - White Wheat",
      price: 80.0,
      inStock: true,
      description:
        "Light and fluffy white wheat date cake with a delicate crumb and rich date filling, perfect with tea.",
    },
    {
      name: "Date Cake - Whole Wheat",
      price: 80.0,
      inStock: true,
      description:
        "Hearty whole wheat date cake packed with fiber and the natural sweetness of dates for a wholesome dessert.",
    },
    {
      name: "Mamoul Mamoulista - Brown Wheat 450g",
      price: 97.0,
      inStock: false,
      description:
        "Artisan brown wheat mamoul cookies filled with premium date paste, beautifully molded in the Hijazi style.",
    },
    {
      name: "Mamoul Mamoulista - Millet Wheat 450g",
      price: 97.0,
      inStock: false,
      description:
        "Millet wheat mamoul cookies with a tender crumb and luscious date filling, crafted using traditional recipes.",
    },
    {
      name: "Mamoul Mamoulista - White Wheat 450g",
      price: 97.0,
      inStock: false,
      description:
        "Classic white wheat mamoul filled with rich date paste, offering a buttery exterior and sweet center.",
    },
    {
      name: "Mamoul with Brown Wheat 200g",
      price: 97.0,
      inStock: true,
      description:
        "Compact 200g pack of brown wheat mamoul, perfect for snacking or sharing, filled with aromatic date paste.",
    },
    {
      name: "Mamoul with Millet Wheat 200g",
      price: 97.0,
      inStock: true,
      description:
        "Nutritious millet wheat mamoul in a convenient 200g portion, combining wholesome millet with date filling.",
    },
    {
      name: "Mamoul with White Wheat 200g",
      price: 97.0,
      inStock: true,
      featured: true,
      description:
        "Delicate white wheat mamoul cookies in a 200g pack, hand-molded and filled with premium Saudi dates.",
    },
    {
      name: "Millet Maamoul with Dates - Sugar Free",
      price: 110.0,
      inStock: true,
      description:
        "Sugar-free millet maamoul sweetened only by the natural richness of dates, ideal for health-conscious snacking.",
    },
    {
      name: "White Wheat Maamoul with Dates - Sugar Free",
      price: 110.0,
      inStock: true,
      description:
        "Sugar-free white wheat maamoul using only the natural sweetness of premium dates, light and satisfying.",
    },
    {
      name: "Whole Wheat Maamoul with Dates - Sugar Free",
      price: 110.0,
      inStock: true,
      description:
        "Sugar-free whole wheat maamoul with date filling, offering high fiber content and guilt-free indulgence.",
    },
    {
      name: "Rahayef Millet with Dates",
      price: 110.0,
      inStock: true,
      description:
        "Traditional millet rahayef pancakes filled with sweet date paste, a beloved Hijazi delicacy for special occasions.",
    },
    {
      name: "Rahayef Thyme with Dates",
      price: 110.0,
      inStock: true,
      description:
        "Savory-sweet rahayef combining fragrant thyme with date filling, a unique fusion of Hijazi flavors.",
    },
    {
      name: "Rahayef Whole Wheat with Dates",
      price: 110.0,
      inStock: true,
      description:
        "Wholesome whole wheat rahayef stuffed with date paste, delivering fiber-rich goodness with traditional taste.",
    },
    {
      name: "White Wheat Rahayaf Filled With Dates",
      price: 110.0,
      inStock: true,
      description:
        "Light white wheat rahayef generously filled with premium date paste, a classic treat from the Hijaz region.",
    },
    {
      name: "Rings Mamoulista - Brown Wheat 450g",
      price: 97.0,
      inStock: false,
      description:
        "Ring-shaped brown wheat mamoul with date filling, an elegant twist on the traditional mamoul cookie.",
    },
    {
      name: "Rings Mamoulista - Millet Wheat 450g",
      price: 97.0,
      inStock: false,
      description:
        "Ring-shaped millet wheat mamoul filled with dates, offering a unique presentation and wholesome flavor.",
    },
    {
      name: "Rings Mamoulista - White Wheat 450g",
      price: 97.0,
      inStock: false,
      description:
        "Elegant ring-shaped white wheat mamoul cookies with a rich date center, perfect for gifting.",
    },
    {
      name: "Sesame Balls With Tahini",
      price: 110.0,
      inStock: true,
      description:
        "Crunchy sesame balls drizzled with premium tahini, a savory-sweet Hijazi confection rich in flavor.",
    },
    {
      name: "Special Tamriati Sugar Free",
      price: 150.0,
      inStock: true,
      featured: true,
      description:
        "Premium sugar-free Tamriati date confection, crafted for those who desire authentic sweetness without added sugar.",
    },
    {
      name: "Special Tamriati with Premium Figs",
      price: 150.0,
      inStock: true,
      featured: true,
      description:
        "Luxurious Tamriati date bars enriched with premium figs, blending two of the Middle East's prized fruits.",
    },
    {
      name: "Tamriati Chocolate 20g",
      price: 8.5,
      inStock: true,
      description:
        "Bite-sized 20g Tamriati bar with rich chocolate coating over a date-filled center, perfect for on-the-go.",
    },
    {
      name: "Tamriati Chocolate 350g",
      price: 90.0,
      inStock: true,
      description:
        "Family-size 350g box of chocolate Tamriati date bars, combining decadent chocolate with sweet date filling.",
    },
    {
      name: "Tamriati Chocolate 40g",
      price: 7.0,
      inStock: false,
      description:
        "Convenient 40g chocolate Tamriati bar perfect for lunchboxes, a satisfying chocolate-date treat.",
    },
    {
      name: "Tamriati Chocolate 700g",
      price: 130.0,
      inStock: true,
      description:
        "Premium 700g box of chocolate Tamriati, ideal for gatherings with generous chocolate-date bars.",
    },
    {
      name: "Tamriati Kleija (Cardamom) 20g",
      price: 8.5,
      inStock: true,
      description:
        "Mini 20g Tamriati Kleija infused with aromatic cardamom, a traditional Middle Eastern flavor in a convenient size.",
    },
    {
      name: "Tamriati Kleija (Cardamom) 350g",
      price: 90.0,
      inStock: true,
      description:
        "350g box of cardamom-spiced Tamriati Kleija, blending warm cardamom notes with sweet date filling.",
    },
    {
      name: "Tamriati Kleija (Cardamom) 40g",
      price: 7.0,
      inStock: false,
      description:
        "Portable 40g Tamriati Kleija bar with warm cardamom spice and date filling, a fragrant everyday treat.",
    },
    {
      name: "Tamriati Kleija (Cardamom) 700g",
      price: 130.0,
      inStock: true,
      description:
        "Large 700g pack of cardamom Tamriati Kleija, perfect for hospitality trays and generous sharing.",
    },
    {
      name: "Tamriati with Brown Wheat 20g",
      price: 8.5,
      inStock: true,
      description:
        "Compact 20g brown wheat Tamriati bar with date filling, a wholesome quick snack with earthy flavor.",
    },
    {
      name: "Tamriati with Brown Wheat 350g",
      price: 90.0,
      inStock: true,
      description:
        "350g box of brown wheat Tamriati date bars, offering a hearty texture and naturally sweet taste.",
    },
    {
      name: "Tamriati with Brown Wheat 40g",
      price: 7.0,
      inStock: false,
      description:
        "40g brown wheat Tamriati bar, combining wholesome brown wheat with premium date filling in a snack size.",
    },
    {
      name: "Tamriati with Brown Wheat 700g",
      price: 130.0,
      inStock: true,
      description:
        "Generous 700g pack of brown wheat Tamriati, perfect for stocking up on this nutritious date-filled treat.",
    },
    {
      name: "Tamriati with Millet Wheat 20g",
      price: 8.5,
      inStock: true,
      description:
        "20g millet wheat Tamriati bar with date filling, a gluten-conscious option bursting with natural sweetness.",
    },
    {
      name: "Tamriati with Millet Wheat 350g",
      price: 90.0,
      inStock: true,
      description:
        "350g box of millet wheat Tamriati date bars, light and nutritious with the goodness of millet grain.",
    },
    {
      name: "Tamriati with Millet Wheat 40g",
      price: 7.0,
      inStock: false,
      description:
        "Portable 40g millet wheat Tamriati bar, ideal for a quick energy boost with wholesome millet and dates.",
    },
    {
      name: "Tamriati with Millet Wheat 700g",
      price: 130.0,
      inStock: true,
      description:
        "Premium 700g box of millet wheat Tamriati, a large format for families who love this nutritious date bar.",
    },
    {
      name: "Tamriati with Premium White Wheat 20g",
      price: 8.5,
      inStock: true,
      description:
        "Delicate 20g white wheat Tamriati with smooth date filling, a light and refined mini treat.",
    },
    {
      name: "Tamriati with Premium White Wheat 350g",
      price: 90.0,
      inStock: true,
      description:
        "350g box of premium white wheat Tamriati, featuring a silky texture and generous date paste center.",
    },
    {
      name: "Tamriati with Premium White Wheat 40g",
      price: 7.0,
      inStock: false,
      description:
        "Convenient 40g premium white wheat Tamriati, a classic flavor combination in a grab-and-go portion.",
    },
    {
      name: "Tamriati with Premium White Wheat 700g",
      price: 130.0,
      inStock: true,
      description:
        "Large 700g box of premium white wheat Tamriati bars, the ultimate sharing size for date bar enthusiasts.",
    },
  ];

  // --- AZIZ NUTS (13, includes Slay) ---
  const azizProducts: ProductDef[] = [
    {
      name: "Crispy Chocolate Peanuts",
      price: 6.0,
      inStock: true,
      description:
        "Crunchy roasted peanuts coated in a crispy chocolate shell, an irresistible sweet and savory snack.",
    },
    {
      name: "Crispy Peanuts - Cheese Flavour",
      price: 6.0,
      inStock: true,
      description:
        "Golden crispy peanuts dusted with bold cheese seasoning, a savory crunchy snack for cheese lovers.",
    },
    {
      name: "Crispy Peanuts - Chilli & Lemon",
      price: 6.0,
      inStock: true,
      description:
        "Fiery chilli and zesty lemon coated peanuts delivering a tangy kick with every crunchy bite.",
    },
    {
      name: "Crispy Peanuts - Ketchup Flavour",
      price: 6.0,
      inStock: true,
      description:
        "Crispy coated peanuts with tangy ketchup seasoning, a fun and flavorful snacking experience.",
    },
    {
      name: "Premium Almonds",
      price: 10.5,
      inStock: true,
      featured: true,
      description:
        "Hand-selected premium whole almonds, perfectly roasted for a rich, buttery crunch packed with protein.",
    },
    {
      name: "Premium Cashew",
      price: 10.5,
      inStock: true,
      description:
        "Creamy premium cashew nuts, gently roasted to highlight their naturally buttery and slightly sweet flavor.",
    },
    {
      name: "Premium Chick Peas",
      price: 4.95,
      inStock: true,
      description:
        "Crunchy roasted chickpeas seasoned to perfection, a protein-rich Middle Eastern snack staple.",
    },
    {
      name: "Premium Corn - Cheese Flavour",
      price: 6.0,
      inStock: true,
      description:
        "Crispy corn kernels coated in savory cheese seasoning, delivering a satisfying crunch with every handful.",
    },
    {
      name: "Premium Peanuts",
      price: 4.95,
      inStock: true,
      description:
        "Classic roasted peanuts with just the right amount of salt, a timeless snack for every occasion.",
    },
    {
      name: "Premium Sunflower Seeds",
      price: 4.95,
      inStock: true,
      description:
        "Carefully selected sunflower seeds, lightly salted and roasted for a wholesome, addictive crunch.",
    },
    {
      name: "Premium Sunflower Seeds - Salt and Vinegar Flavour",
      price: 6.0,
      inStock: true,
      description:
        "Tangy salt and vinegar sunflower seeds with a bold flavor punch, perfect for adventurous snackers.",
    },
    {
      name: "Premium Walnut and Almonds",
      price: 10.5,
      inStock: true,
      description:
        "A premium mix of crunchy walnuts and almonds, offering the best of both nuts in one nutritious blend.",
    },
    {
      name: "Slay Hot Noodles",
      price: 4.0,
      inStock: true,
      description:
        "Fiery hot instant noodles with bold spice seasoning, a quick and satisfying snack for heat lovers.",
    },
  ];

  // --- CHIKI CHIKA (1) ---
  const chikiProducts: ProductDef[] = [
    {
      name: "Chiki Chika - Cocoa Cream Biscuits",
      price: 10.5,
      inStock: true,
      featured: true,
      description:
        "Indulgent cocoa cream sandwich biscuits with a rich chocolate filling, crispy outside and creamy within.",
    },
  ];

  // --- OSLO (9) ---
  const osloProducts: ProductDef[] = [
    {
      name: "Arrivo - Chocolate Filled Cake",
      price: 21.0,
      inStock: false,
      description:
        "Rich chocolate cake with a molten chocolate center, a decadent treat for true chocolate aficionados.",
    },
    {
      name: "Arrivo - White Chocolate Sauce Cake",
      price: 19.0,
      inStock: true,
      description:
        "Moist cake drizzled with velvety white chocolate sauce, offering luxurious sweetness in every bite.",
    },
    {
      name: "Dubai Cake - Pistachio Cream",
      price: 12.0,
      inStock: true,
      featured: true,
      description:
        "The viral Dubai-style cake layered with luscious pistachio cream, blending Middle Eastern flavors with modern pastry.",
    },
    {
      name: "Manela - Chocolate Cake Covered in Chocolate",
      price: 26.0,
      inStock: false,
      description:
        "Double chocolate indulgence with a moist chocolate cake completely enrobed in a thick chocolate coating.",
    },
    {
      name: "Manela - Chocolate Filled Vanilla Cake",
      price: 21.0,
      inStock: false,
      description:
        "Soft vanilla cake with a surprise chocolate filling, a perfect balance of classic flavors.",
    },
    {
      name: "Manela - Coconut & Chocolate Cake",
      price: 23.0,
      inStock: false,
      description:
        "Tropical coconut meets rich chocolate in this layered cake, a delightful fusion of flavors and textures.",
    },
    {
      name: "Manela - Hazelnut & Chocolate Filled Cake Covered in Chocolate",
      price: 26.0,
      inStock: false,
      description:
        "Hazelnut-chocolate filled cake draped in chocolate, a triple-threat of nutty, creamy, and cocoa richness.",
    },
    {
      name: "Manela - Strawberry and Chocolate Cake",
      price: 21.0,
      inStock: true,
      description:
        "Fruity strawberry cake paired with chocolate layers, a berry-chocolate combination that delights the palate.",
    },
    {
      name: "Red Love - Red Velvet Cake Covered in White Chocolate",
      price: 26.0,
      inStock: false,
      description:
        "Velvety red velvet cake coated in smooth white chocolate, an elegant confection for special occasions.",
    },
  ];

  // --- PURE NATURAL (2) ---
  const pureNaturalProducts: ProductDef[] = [
    {
      name: "Baby Spoon - Honey",
      price: 40.0,
      inStock: true,
      featured: true,
      description:
        "Pure raw honey served in a charming baby spoon jar, perfect for daily use or as a thoughtful natural gift.",
    },
    {
      name: "Natural Turkish Sidr Honey",
      price: 200.0,
      inStock: true,
      featured: true,
      description:
        "Rare Turkish Sidr honey sourced from Sidr tree blossoms, prized for its rich amber color and medicinal properties.",
    },
  ];

  // ──────────────────────────────────────────────
  // Map categories to products and upsert all
  // ──────────────────────────────────────────────
  const allProductGroups: { categorySlug: string; products: ProductDef[] }[] = [
    { categorySlug: "dates", products: datesProducts },
    { categorySlug: "hijazi-taste", products: hijaziProducts },
    { categorySlug: "aziz-nuts", products: azizProducts },
    { categorySlug: "chiki-chika", products: chikiProducts },
    { categorySlug: "oslo", products: osloProducts },
    { categorySlug: "pure-natural", products: pureNaturalProducts },
  ];

  let productCount = 0;

  for (const group of allProductGroups) {
    const categoryId = categories[group.categorySlug];
    for (const p of group.products) {
      const slug = toSlug(p.name);
      const stock = p.inStock ? 50 : 0;

      await prisma.product.upsert({
        where: { slug },
        update: {
          name: p.name,
          price: p.price,
          inStock: p.inStock,
          stock,
          featured: p.featured ?? false,
          description: p.description,
          images: [],
          categoryId,
        },
        create: {
          name: p.name,
          slug,
          price: p.price,
          inStock: p.inStock,
          stock,
          featured: p.featured ?? false,
          description: p.description,
          images: [],
          categoryId,
        },
      });
      productCount++;
    }
  }
  console.log(`\nUpserted ${productCount} products`);

  // ──────────────────────────────────────────────
  // 4. Blog Posts (3)
  // ──────────────────────────────────────────────
  const blogPosts = [
    {
      title: "The Health Benefits of Dates: Nature's Perfect Snack",
      slug: "health-benefits-of-dates",
      excerpt:
        "Discover why dates have been a dietary staple in the Middle East for thousands of years and how they can boost your health.",
      content: `<h2>Why Dates Deserve a Place in Your Pantry</h2>
<p>Dates have been cultivated for over 6,000 years in the Middle East, and for good reason. These naturally sweet fruits are packed with essential nutrients that support overall health and well-being.</p>
<h3>Nutritional Powerhouse</h3>
<p>A single serving of dates provides significant amounts of fiber, potassium, magnesium, and B vitamins. They are also rich in antioxidants, including flavonoids, carotenoids, and phenolic acid, which help protect your cells from oxidative stress.</p>
<h3>Natural Energy Boost</h3>
<p>Dates are an excellent source of natural sugars, making them the perfect pre-workout snack or afternoon pick-me-up. Unlike processed sweets, dates provide sustained energy without the crash, thanks to their fiber content that slows sugar absorption.</p>
<h3>Digestive Health</h3>
<p>With nearly 7 grams of fiber per 100 grams, dates promote healthy digestion and regular bowel movements. The soluble fiber in dates also helps feed beneficial gut bacteria, supporting a healthy microbiome.</p>
<h3>Choosing the Right Dates</h3>
<p>From the prized Ajwa dates of Madinah to the caramel-sweet Sukkari variety, each type offers a unique flavor profile and texture. At Altareb Global, we source only the finest hand-picked Saudi dates to ensure premium quality in every bite.</p>`,
      category: "Health",
      tags: ["dates", "health", "nutrition", "natural", "snacking"],
      published: true,
      authorId: admin.id,
    },
    {
      title: "A Guide to Traditional Hijazi Sweets and Delicacies",
      slug: "guide-to-hijazi-sweets",
      excerpt:
        "Explore the rich culinary heritage of the Hijaz region through its beloved traditional sweets, from mamoul to tamriati.",
      content: `<h2>The Sweet Heritage of the Hijaz</h2>
<p>The Hijaz region of Saudi Arabia boasts a culinary tradition that stretches back centuries, with sweets and confections playing a central role in hospitality, celebrations, and everyday life.</p>
<h3>Mamoul: The Crown Jewel</h3>
<p>Mamoul cookies are arguably the most iconic sweet in Hijazi cuisine. These intricately molded cookies are traditionally made with semolina or wheat flour and filled with dates, nuts, or a combination of both. Each family often has their own recipe passed down through generations.</p>
<h3>Tamriati: Date Bars Reimagined</h3>
<p>Tamriati represents a modern take on traditional date confections. These bars combine premium dates with various wheat flours and flavors, from chocolate to cardamom-spiced kleija. Available in sizes from 20g snack bars to 700g family packs, they make dates accessible for any occasion.</p>
<h3>Rahayef: Stuffed Pancakes</h3>
<p>Rahayef are delicate pancakes filled with dates, cheese, or other fillings. Often served during Ramadan and special occasions, they represent the warm hospitality that defines Hijazi culture.</p>
<h3>Modern Innovations</h3>
<p>Today, traditional recipes are being adapted for modern dietary preferences. Sugar-free mamoul and millet-based options cater to health-conscious consumers while preserving the authentic flavors that have made these sweets beloved for generations.</p>`,
      category: "Culture",
      tags: ["hijazi", "sweets", "mamoul", "tamriati", "tradition", "culture"],
      published: true,
      authorId: admin.id,
    },
    {
      title: "Healthy Snacking: Nuts, Seeds, and Wholesome Alternatives",
      slug: "healthy-snacking-nuts-seeds",
      excerpt:
        "Learn how to make smarter snacking choices with premium nuts, seeds, and naturally sweetened treats.",
      content: `<h2>Snack Smarter, Not Harder</h2>
<p>In a world of processed snacks and empty calories, returning to nature's original convenience foods can transform your energy levels and overall health. Nuts, seeds, and date-based treats offer the perfect balance of taste and nutrition.</p>
<h3>The Power of Nuts</h3>
<p>Almonds, cashews, and walnuts are among the most nutrient-dense foods available. Rich in healthy fats, protein, and essential minerals, just a handful can keep you satisfied for hours. Premium roasted nuts retain their nutritional value while offering enhanced flavor and crunch.</p>
<h3>Seeds: Small but Mighty</h3>
<p>Sunflower seeds and pumpkin seeds pack an impressive nutritional punch relative to their size. They provide vitamin E, magnesium, and selenium, all essential for immune function and cellular health. Roasted and lightly seasoned, they make for an addictive, guilt-free snack.</p>
<h3>The Middle Eastern Snacking Tradition</h3>
<p>In Middle Eastern culture, offering nuts and dried fruits to guests is a sign of hospitality and generosity. This tradition has evolved into a sophisticated snacking culture, with roasted chickpeas, flavored peanuts, and premium nut mixes now enjoyed worldwide.</p>
<h3>Building Your Snack Collection</h3>
<p>Start with staples like premium almonds and sunflower seeds, then explore flavored options like cheese corn or chilli-lemon peanuts for variety. Pair with dates or date-based bars for a balanced snack that satisfies both sweet and savory cravings.</p>`,
      category: "Health",
      tags: ["snacking", "nuts", "seeds", "healthy", "almonds", "sunflower"],
      published: true,
      authorId: admin.id,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        published: post.published,
        authorId: post.authorId,
      },
      create: post,
    });
    console.log(`Blog post upserted: ${post.title}`);
  }

  // ──────────────────────────────────────────────
  // 5. Coupons (2)
  // ──────────────────────────────────────────────
  const coupons = [
    {
      code: "WELCOME10",
      description: "10% off your first order",
      discount: 10,
      isPercent: true,
      minOrder: 50,
      maxUses: 500,
      active: true,
      expiresAt: new Date("2027-12-31T23:59:59Z"),
    },
    {
      code: "FREESHIP",
      description: "Free shipping on orders over $100",
      discount: 15,
      isPercent: false,
      minOrder: 100,
      maxUses: 1000,
      active: true,
      expiresAt: new Date("2027-12-31T23:59:59Z"),
    },
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {
        description: coupon.description,
        discount: coupon.discount,
        isPercent: coupon.isPercent,
        minOrder: coupon.minOrder,
        maxUses: coupon.maxUses,
        active: coupon.active,
        expiresAt: coupon.expiresAt,
      },
      create: coupon,
    });
    console.log(`Coupon upserted: ${coupon.code}`);
  }

  // ──────────────────────────────────────────────
  // Summary
  // ──────────────────────────────────────────────
  console.log("\nSeeding complete!");
  console.log(`  - 1 admin user`);
  console.log(`  - ${categoriesData.length} categories`);
  console.log(`  - ${productCount} products`);
  console.log(`  - ${blogPosts.length} blog posts`);
  console.log(`  - ${coupons.length} coupons`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
