import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from 'framer-motion';

interface FoodCardProps {
  name: string;
  description: string;
  image: string;
  price: string;
}

export function FoodCard({ name, description, image, price }: FoodCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative h-48">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="group-hover:text-primary transition-colors">{name}</CardTitle>
          <span className="text-lg font-bold text-primary">{price}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
}