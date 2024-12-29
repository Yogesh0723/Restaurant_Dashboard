import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/home/hero";
import { FeaturedDishes } from "@/components/home/featured-dishes";
import { Stats } from "@/components/home/stats";
import { About } from "@/components/home/about";
import { Footer } from "@/components/footer";
import { Reviews } from "@/components/home/reviews";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedDishes />
      <Stats />
      <Reviews />
      <About />
      <Footer />
    </div>
  );
}