// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const hairServices = [
    {
      name: 'Signature Blowout',
      price: '$15',
      description: 'A smooth, voluminous blowout that leaves your hair polished, bouncy, and full of shine.',
    },
    {
      name: 'Curly Q',
      price: '$17',
      description: 'Show off your natural curls! We define and style your curls for a beautiful, manageable look.',
    },
    {
      name: 'Flat Iron',
      price: '$10',
      description: 'Enjoy perfectly straight, shiny hair with our flat iron styling—smooth results that last.',
    },
    {
      name: 'Blowout Curls',
      price: '$15',
      description: 'Blowout curls for soft, voluminous, and polished waves.',
    },
    {
      name: 'Heat Styled Curls',
      price: '$15',
      description: 'Soft, bouncy curls made with heat styling—perfect for any special occasion or everyday glam.',
    },
  ];

  const bakedGoods = [
    {
      icon: '🧁',
      name: 'Cupcakes',
      price: '$1.25 each',
      bulk: '$7 for 6 / $14 for 12',
    },
    {
      icon: '🍫',
      name: 'Brownies',
      price: '$0.75 each',
      bulk: '$4 for 6 / $8 for 12',
    },
    {
      icon: '🍓',
      name: 'Chocolate-Covered Strawberries',
      price: '$0.75 each',
      bulk: '',
    },
    {
      icon: '☕',
      name: 'Tiramisu Cups',
      price: '$2.50 each',
      bulk: '',
    },
  ];

  const gallery = [
    { src: '/elegant-blowout-hairstyle.jpg', alt: 'Signature blowout' },
    { src: '/natural-curly-hairstyle.jpg', alt: 'Natural curls styled' },
    { src: '/chocolate-covered-strawberries.jpg', alt: 'Chocolate strawberries' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
<div className="max-w-6xl mx-auto px-12 flex h-16 items-center justify-between">          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Curls & Cupcakes
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#services" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-pink-500 transition-colors">
              About
            </Link>
            <Link href="#gallery" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Gallery
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </nav>
          <Link href="/order">
            <Button className="bg-pink-500 hover:bg-pink-600">Place an Order</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <p className="text-sm font-medium text-pink-600 dark:text-pink-400 tracking-wide uppercase">
              Beautiful Hair. Delightful Treats.
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Curls and Cupcakes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert hairstyling and handcrafted baked goods that bring joy to every occasion. 
              Personalized service with passion and care.
            </p>
            <Link href="/order">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6">
                Place an Order
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-sm font-medium text-pink-600 dark:text-pink-400 tracking-wide uppercase">
              Services for Every Need
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold">We've Got You Covered</h3>
            <p className="text-lg text-muted-foreground">
              Whether you need a stunning hairstyle for a special occasion or delicious treats for your celebration, 
              we deliver quality and care in everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Hair Services */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Hair Services</h2>
              <p className="text-lg text-muted-foreground">
                Beautiful styles for any occasion! Whether you want a sleek, casual look or something glamorous for a special event.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {hairServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-semibold">{service.name}</h3>
                      <span className="text-2xl font-bold text-pink-600">{service.price}</span>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-sm text-muted-foreground italic text-center pt-4">
              All products are supplied for your convenience, but you're welcome to bring and use your own favorites.
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* Baked Goods */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold">Baked Goods</h2>
              <p className="text-lg text-muted-foreground">
                Delightful creations that bring joy to every occasion
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bakedGoods.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="text-5xl">{item.icon}</div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-lg font-bold text-pink-600">{item.price}</p>
                    {item.bulk && (
                      <p className="text-sm text-muted-foreground">{item.bulk}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-muted-foreground italic">
              We can efficiently handle large orders for all our baked goods
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-sm font-medium text-pink-600 dark:text-pink-400 tracking-wide uppercase">
                About
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold">You're in Good Hands</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold mb-2">Aanya Rastogi</h4>
                  <p className="text-pink-600 dark:text-pink-400 font-medium">Founder & Entrepreneur</p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Hello! I'm a 17-year-old entrepreneur with a passion for hairstyling and baking. 
                    From a young age, I've always loved creating beautiful hairstyles and delicious treats 
                    that bring joy to others.
                  </p>
                  <p>
                    With my small business, I strive to combine creativity, quality, and care in every service I provide. 
                    I'm excited to share my journey with you and invite you to experience the passion and dedication 
                    behind everything I do.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://img1.wsimg.com/isteam/ip/60a01477-00c1-4522-8cd4-e067df62a376/Grey%20Pink%20Pastel%20Bake%20Shop%20Single-Side%20Busines.png"
                  alt="Aanya Rastogi - Founder of Curls & Cupcakes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-sm font-medium text-pink-600 dark:text-pink-400 tracking-wide uppercase">
                Our Work
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold">
                Delightful Creations from Curls & Cupcakes
              </h3>
              <p className="text-lg text-muted-foreground">
                Take a peek at some of our beautiful hairstyles and delicious baked treats
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((image, index) => (
                <div 
                  key={index} 
                  className="relative h-[300px] rounded-lg overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                To book a hair appointment or place an order, reach out through any of these channels. 
                Please include your name, the service or item you need, and the desired date.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <h3 className="font-semibold text-lg">Call or Text</h3>
                  <a 
                    href="tel:4699824237" 
                    className="text-pink-600 hover:text-pink-700 font-medium text-lg block"
                  >
                    (469) 982-4237
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <h3 className="font-semibold text-lg">WhatsApp</h3>
                  <a 
                    href="https://wa.me/14699824237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 font-medium block"
                  >
                    Message Us
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-3">
                  <h3 className="font-semibold text-lg">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/curls.andcupcakes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 font-medium block"
                  >
                    @curls.andcupcakes
                  </a>
                </CardContent>
              </Card>
            </div>

            <Link href="/order">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6">
                Place Your Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <h3 className="text-lg font-semibold">Curls & Cupcakes</h3>
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 Curls & Cupcakes - All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}