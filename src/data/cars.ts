export interface Car {
  id: number;
  name: string;
  category: "Sports" | "Electric" | "SUV" | "Sedan";
  year: number;
  price: number;
  image: string;
  specs: {
    hp: string;
    acceleration: string;
    seats: number;
    fuel: string;
  };
  featured: boolean;
  description: string;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Mercedes-AMG GT",
    category: "Sports",
    year: 2025,
    price: 289,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    specs: { hp: "577 HP", acceleration: "3.1s", seats: 2, fuel: "Premium" },
    featured: true,
    description:
      "The AMG GT delivers breathtaking performance with its handcrafted biturbo V8 engine. Every curve speaks to aerodynamic excellence, while the interior wraps you in premium comfort.",
  },
  {
    id: 2,
    name: "BMW i7 xDrive",
    category: "Electric",
    year: 2025,
    price: 199,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    specs: { hp: "536 HP", acceleration: "4.5s", seats: 5, fuel: "Electric" },
    featured: true,
    description:
      "The BMW i7 redefines electric luxury. Whisper-quiet performance meets cutting-edge technology in a cabin that rivals the finest lounges.",
  },
  {
    id: 3,
    name: "Range Rover Sport",
    category: "SUV",
    year: 2025,
    price: 179,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    specs: { hp: "395 HP", acceleration: "5.2s", seats: 5, fuel: "Premium" },
    featured: true,
    description:
      "Commanding presence meets refined luxury. The Range Rover Sport conquers any terrain while keeping you in absolute comfort.",
  },
  {
    id: 4,
    name: "Porsche 911 Turbo S",
    category: "Sports",
    year: 2025,
    price: 349,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    specs: { hp: "640 HP", acceleration: "2.6s", seats: 2, fuel: "Premium" },
    featured: true,
    description:
      "The 911 Turbo S is the pinnacle of Porsche engineering. Explosive acceleration and razor-sharp handling define this legendary sports car.",
  },
  {
    id: 5,
    name: "Tesla Model S Plaid",
    category: "Electric",
    year: 2025,
    price: 169,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    specs: { hp: "1,020 HP", acceleration: "1.9s", seats: 5, fuel: "Electric" },
    featured: false,
    description:
      "The fastest production sedan ever made. Three motors deliver mind-bending acceleration while autonomous technology keeps you safe.",
  },
  {
    id: 6,
    name: "Audi RS e-tron GT",
    category: "Electric",
    year: 2025,
    price: 229,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    specs: { hp: "637 HP", acceleration: "3.1s", seats: 4, fuel: "Electric" },
    featured: true,
    description:
      "German precision meets electric excellence. The RS e-tron GT delivers supercar performance with zero emissions and breathtaking design.",
  },
  {
    id: 7,
    name: "Mercedes S-Class",
    category: "Sedan",
    year: 2025,
    price: 159,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80",
    specs: { hp: "429 HP", acceleration: "4.8s", seats: 5, fuel: "Premium" },
    featured: false,
    description:
      "The benchmark of luxury sedans. The S-Class offers an unparalleled combination of comfort, technology, and prestige.",
  },
  {
    id: 8,
    name: "Lamborghini Huracán",
    category: "Sports",
    year: 2025,
    price: 499,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    specs: { hp: "631 HP", acceleration: "2.9s", seats: 2, fuel: "Premium" },
    featured: true,
    description:
      "Italian artistry meets raw power. The Huracán's naturally aspirated V10 delivers a symphony of speed and style.",
  },
  {
    id: 9,
    name: "BMW X7 M60i",
    category: "SUV",
    year: 2025,
    price: 189,
    image: "https://images.unsplash.com/photo-1669691101147-791e49453ab7?w=800&q=80",
    specs: { hp: "523 HP", acceleration: "4.5s", seats: 7, fuel: "Premium" },
    featured: false,
    description:
      "Ultimate luxury meets commanding space. The X7 offers three rows of premium seating with unmistakable BMW performance.",
  },
  {
    id: 10,
    name: "Audi A8 L",
    category: "Sedan",
    year: 2025,
    price: 149,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
    specs: { hp: "453 HP", acceleration: "4.5s", seats: 5, fuel: "Premium" },
    featured: false,
    description:
      "Progressive luxury redefined. The long-wheelbase A8 offers exceptional rear-seat comfort with advanced technology.",
  },
  {
    id: 11,
    name: "Cadillac Escalade V",
    category: "SUV",
    year: 2025,
    price: 219,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    specs: { hp: "682 HP", acceleration: "4.3s", seats: 7, fuel: "Premium" },
    featured: false,
    description:
      "American luxury at its boldest. The Escalade V pairs a supercharged V8 with uncompromising comfort and presence.",
  },
  {
    id: 12,
    name: "Porsche Taycan Turbo",
    category: "Electric",
    year: 2025,
    price: 259,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80",
    specs: { hp: "670 HP", acceleration: "2.8s", seats: 4, fuel: "Electric" },
    featured: false,
    description:
      "The Taycan Turbo proves that electric doesn't mean compromise. Pure Porsche DNA in every acceleration and every corner.",
  },
];

export const categories = ["All", "Sports", "Electric", "SUV", "Sedan"] as const;
