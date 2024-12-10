# Ecommerce-Data-Processing

This project involves MongoDB-based sorting, filtering, and processing of 30K e-commerce products. The goal is to efficiently manage and analyze a large dataset of e-commerce products.

## Dataset Information

### Number of brands: 325

```json
[
  {
    "$group": {
      "_id": "$brand",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$count": "string"
  }
]
```

### Number of categories: 4

```json
[
  {
    "$group": {
      "_id": "$category",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$count": "string"
  }
]
```

### Number of subcategories: 24

```json
[
  {
    "$group": {
      "_id": "$sub_category",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$count": "string"
  }
]
```

### Number of sellers: 535

```json
[
  {
    "$group": {
      "_id": "$seller",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$count": "string"
  }
]
```

### Number of Colors: 352

```json
[
  {
    "$unwind": "$product_details"
  },
  {
    "$match": {
      "product_details.Color": {
        "$exists": true
      }
    }
  },
  {
    "$project": {
      "color": "$product_details.Color"
    }
  },
  {
    "$group": {
      "_id": "$color",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$count": "Number of Colors"
  }
]
```

### Number of fabric: 244

```json
[
  {
    "$unwind": "$product_details"
  },
  {
    "$match": {
      "product_details.Fabric": {
        "$exists": true
      }
    }
  },
  {
    "$project": {
      "fabric": "$product_details.Fabric"
    }
  },
  {
    "$group": {
      "_id": "$fabric",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$count": "Types of fabric"
  }
]
```

### Number of Pattern: 118

```json
[
  {
    "$unwind": "$product_details"
  },
  {
    "$match": {
      "product_details.Pattern": {
        "$exists": true
      }
    }
  },
  {
    "$project": {
      "pattern": "$product_details.Pattern"
    }
  },
  {
    "$group": {
      "_id": "$pattern",
      "count": {
        "$sum": 1
      }
    }
  },
  {
    "$count": "Types of Pattern"
  }
]
```

### Out Of Stock Item: 1742

```json
[
  {
    "$match": {
      "out_of_stock": true
    }
  },
  {
    "$count": "string"
  }
]
```

### Number of discount: 88

```json
[
  {
    "$match": {
      "discount": { "$exists": true }
    }
  },
  {
    "$project": {
      "discount": 1
    }
  },
  {
    "$group": {
      "_id": "$discount"
    }
  },
  {
    "$count": "string"
  }
]
```

### Number of discount: 88

```json
[
  {
    "$match": {
      "discount": { "$exists": true }
    }
  },
  {
    "$project": {
      "discount": 1
    }
  },
  {
    "$group": {
      "_id": "$discount"
    }
  },
  {
    "$count": "string"
  }
]
```
