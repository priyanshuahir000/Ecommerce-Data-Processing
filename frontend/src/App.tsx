import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import "./App.css";
import {useEffect, useState} from "react";
import { ProductFilters } from "./components/ProductFilters";
import { ProductCard } from "./components/ProductCard";

function App() {
  
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<any>({
    priceRange: [0, 10000],
    categories: [],
    ratings: [],
  })

  // A useEffect hook to fetch the product data from backend using post 
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/products/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery,
        filters: activeFilters,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
  }, [searchQuery, activeFilters]);
  
  console.log(products)

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              /> 
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:w-auto w-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ProductFilters onFilterChange={setActiveFilters} />
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
