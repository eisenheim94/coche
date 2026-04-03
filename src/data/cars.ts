export interface Car {
  id: number;
  name: string;
  category: "Sports" | "Luxury" | "SUV" | "Classic";
  year: number;
  price: number;
  image: string;
  cardImage: string;
  galleryImages: string[];
  specs: {
    consumption: string;
    transmission: string;
    seats: number;
    fuel: string;
  };
  featured: boolean;
  description: string;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "BMW E36 Cabrio",
    category: "Classic",
    year: 1998,
    price: 89,
    image: "/images/E36/hero.jpg",
    cardImage: "/images/E36/1.jpg",
    galleryImages: [
      "/images/E36/1.jpg",
      "/images/E36/2.jpg",
      "/images/E36/3.jpg",
    ],
    specs: { consumption: "10.5 L", transmission: "AT", seats: 4, fuel: "Petrol" },
    featured: true,
    description:
      "The BMW E36 Convertible is a timeless open-top classic from the golden era of BMW. With its naturally aspirated inline-six, smooth power delivery, and perfectly balanced chassis, the E36 Cabrio offers a pure driving experience that modern cars struggle to replicate. Drop the top, feel the wind, and enjoy motoring the way it was meant to be.",
  },
  {
    id: 2,
    name: "Mercedes-Benz ML 350",
    category: "SUV",
    year: 2009,
    price: 109,
    image: "/images/ML/hero.jpg",
    cardImage: "/images/ML/1.jpg",
    galleryImages: [
      "/images/ML/1.jpg",
      "/images/ML/2.jpg",
      "/images/ML/3.jpg",
    ],
    specs: { consumption: "12.0 L", transmission: "AT", seats: 5, fuel: "Petrol" },
    featured: true,
    description:
      "The Mercedes-Benz ML 350 blends refined luxury with genuine off-road capability. Its silky-smooth V6 engine delivers effortless power, while the air suspension smooths out any road surface. Inside, you'll find the build quality and comfort that Mercedes is famous for — premium leather, solid switchgear, and a cabin that feels built to last forever.",
  },
  {
    id: 3,
    name: "Honda Integra DC2",
    category: "Sports",
    year: 1997,
    price: 129,
    image: "/images/DC2/hero.jpg",
    cardImage: "/images/DC2/1.jpg",
    galleryImages: [
      "/images/DC2/1.jpg",
      "/images/DC2/2.jpg",
    ],
    specs: { consumption: "8.5 L", transmission: "MT", seats: 4, fuel: "Petrol" },
    featured: true,
    description:
      "The Honda Integra DC2 is widely regarded as one of the greatest front-wheel-drive cars ever made. Its legendary B18C VTEC engine screams to a stratospheric redline, rewarding drivers who push it to the limit. Razor-sharp handling, a perfectly weighted steering rack, and Honda's bulletproof reliability make the DC2 a true driver's car in every sense.",
  },
  {
    id: 4,
    name: "Honda CR-Z",
    category: "Sports",
    year: 2012,
    price: 69,
    image: "/images/CRZ/hero.jpg",
    cardImage: "/images/CRZ/1.jpg",
    galleryImages: [
      "/images/CRZ/1.jpg",
      "/images/CRZ/2.jpg",
      "/images/CRZ/3.jpg",
    ],
    specs: { consumption: "5.5 L", transmission: "MT", seats: 2, fuel: "Hybrid" },
    featured: true,
    description:
      "The Honda CR-Z is the spiritual successor to the beloved CRX — a compact, lightweight sports hybrid that proves eco-friendly driving doesn't have to be boring. With its 6-speed manual gearbox, peppy hybrid powertrain, and go-kart-like handling, the CR-Z delivers genuine fun while sipping fuel. Its futuristic design still turns heads today.",
  },
  {
    id: 5,
    name: "Honda Accord CB4",
    category: "Classic",
    year: 1992,
    price: 59,
    image: "/images/CB4/hero.jpg",
    cardImage: "/images/CB4/1.jpg",
    galleryImages: [
      "/images/CB4/1.jpg",
      "/images/CB4/2.jpg",
      "/images/CB4/3.jpg",
    ],
    specs: { consumption: "9.0 L", transmission: "MT", seats: 5, fuel: "Petrol" },
    featured: false,
    description:
      "The fourth-generation Honda Accord CB4 represents everything that made Honda great in the early '90s — impeccable build quality, bulletproof reliability, and a driving experience that punches well above its class. The smooth-revving engine, light controls, and comfortable interior make it a joy for daily driving or weekend getaways alike.",
  },
  {
    id: 6,
    name: "Rolls-Royce Silver Spirit III",
    category: "Luxury",
    year: 1995,
    price: 199,
    image: "/images/RR/hero.jpg",
    cardImage: "/images/RR/1.jpg",
    galleryImages: [
      "/images/RR/1.jpg",
      "/images/RR/2.jpg",
      "/images/RR/3.jpg",
      "/images/RR/4.jpg",
    ],
    specs: { consumption: "16.5 L", transmission: "AT", seats: 5, fuel: "Petrol" },
    featured: true,
    description:
      "The Rolls-Royce Silver Spirit III is the embodiment of old-world luxury and craftsmanship. Hand-built at the Crewe factory, every surface is finished in the finest Connolly leather and burr walnut veneers. The 6.75-litre V8 wafts you along in near-silence, while the ride quality sets a standard that few modern cars can match. This is motoring royalty.",
  },
  {
    id: 7,
    name: "Bentley Continental GTC",
    category: "Luxury",
    year: 2011,
    price: 299,
    image: "/images/Bentley/1.jpg",
    cardImage: "/images/Bentley/2.jpg",
    galleryImages: [
      "/images/Bentley/2.jpg",
      "/images/Bentley/3.jpg",
    ],
    specs: { consumption: "15.0 L", transmission: "AT", seats: 4, fuel: "Petrol" },
    featured: true,
    description:
      "The Bentley Continental GTC is a grand touring convertible that combines breathtaking performance with uncompromising luxury. Its twin-turbocharged W12 engine delivers effortless, surging power, while the handcrafted interior cocoons you in the finest leather and polished wood. Drop the roof and cruise — this is what automotive opulence feels like.",
  },
  {
    id: 8,
    name: "Ford Mustang GT",
    category: "Sports",
    year: 2019,
    price: 149,
    image: "/images/Mustang/hero.jpg",
    cardImage: "/images/Mustang/1.jpg",
    galleryImages: [
      "/images/Mustang/1.jpg",
      "/images/Mustang/2.jpg",
      "/images/Mustang/3.jpg",
      "/images/Mustang/4.jpg",
    ],
    specs: { consumption: "13.5 L", transmission: "AT", seats: 4, fuel: "Petrol" },
    featured: false,
    description:
      "The Ford Mustang GT is an American icon — raw, visceral, and unapologetically powerful. Its naturally aspirated 5.0-litre V8 delivers a thunderous soundtrack and exhilarating straight-line speed. With its aggressive stance, muscular design, and that unmistakable exhaust note, the Mustang GT is a car that makes every drive feel like an event.",
  },
];

export const categories = ["All", "Sports", "Luxury", "SUV", "Classic"] as const;
