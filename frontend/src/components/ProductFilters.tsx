import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export function ProductFilters({ onFilterChange }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
  ];
  const ratings = [5, 4, 3, 2, 1];

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters({ priceRange: value });
  };

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    updateFilters({ categories: updated });
  };

  const handleRatingChange = (rating: number) => {
    const updated = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(updated);
    updateFilters({ ratings: updated });
  };

  const updateFilters = (newFilters: any) => {
    onFilterChange({
      priceRange,
      categories: selectedCategories,
      ratings: selectedRatings,
      ...newFilters,
    });
  };

  return (
    <div className="w-full space-y-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2 pt-4">
              <Slider
                defaultValue={[0, 10000]}
                max={10000}
                step={100}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center space-x-1"
                  >
                    {Array.from({ length: rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                    <span className="text-sm font-medium">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {(selectedCategories.length > 0 || selectedRatings.length > 0) && (
        <div className="flex flex-wrap gap-2 pt-4">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleCategoryChange(category)}
            >
              {category} ×
            </Badge>
          ))}
          {selectedRatings.map((rating) => (
            <Badge
              key={rating}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleRatingChange(rating)}
            >
              {rating}★ & Up ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
