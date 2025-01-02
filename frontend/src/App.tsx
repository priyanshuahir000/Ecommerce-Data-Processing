/* Happy New Year */
/* Last commit of the year */

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import "./App.css";
import { useEffect, useState } from "react";
import { ProductModal } from "./components/ProductModal";
import { ProductFilters } from "./components/ProductFilters";
import { ProductCard } from "./components/ProductCard";
import type { Product } from "./types/product";
import { PaginationModal } from "./components/Pagination";
import { SkeletonCard } from "./components/SkeletonCard";

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<any>({
    priceRange: [0, 10000],
    categories: [],
    ratings: [],
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);

    await fetch("http://localhost:3000/api/v1/products/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery,
        page,
        filters: activeFilters,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, activeFilters, page]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
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

          {loading && (
            <SkeletonCard />
      )}

          {!loading && (     
          <div>
          <div  className="flex justify-between items-center mb-4">
            <p>
              {products.length > 0 ? `${page} - ${totalPages} of over ${totalProducts} results` : "No products found"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found matching your criteria.
              </p>
            </div>
          )}
          </div>
          )}
          
        

        </div>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            open={!!selectedProduct}
            onOpenChange={(open: boolean) => !open && setSelectedProduct(null)}
          />
        )}
      </div>
      <div className="flex justify-center my-8">
        <PaginationModal
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default App;
