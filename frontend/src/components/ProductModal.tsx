import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Star, Store, Package } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {product.title}
          </DialogTitle>
          {product.brand && (
            <span className="text-sm text-muted-foreground">
              by {product.brand}
            </span>
          )}
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {product.images ? (
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex gap-2">
                  {product.images?.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-md overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${i + 2}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">
                    ₹{product.selling_price}
                  </span>
                  {product.discount && (
                    <Badge variant="secondary">{product.discount}</Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.average_rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  <span className="font-medium">{product.seller}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  <span>{product.sub_category}</span>
                </div>
                <p className="text-muted-foreground">
                  {product.description == ""
                    ? "No description available"
                    : product?.description.length > 200? product.description?.slice(0, 200) + "..." : product.description}
                </p>

                {product.out_of_stock && (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specifications">
            <Table>
              <TableBody>
                {product.product_details?.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {Object.keys(detail)[1]}
                    </TableCell>
                    <TableCell>{Object.values(detail)[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
