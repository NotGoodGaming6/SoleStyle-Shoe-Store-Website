const Product = require('#models/misc/misc.product.model');

const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

exports.getProductsService = async (queryParams) => {
  let query = {};
  
  if (queryParams.filter === 'new') {
    query.isNewItem = true;
  } else if (queryParams.filter === 'sale') {
    query.$or = [
      { isOnSale: true },
      { isOnSale: 'true' },
      { discountPercentage: { $gt: 0 } },
      { discount: { $gt: 0 } }
    ];
  } else if (queryParams.filter === 'featured') {
    query.isBestseller = true;
  }
  
  if (queryParams.category && queryParams.category !== 'all') {
    query.category = { $regex: new RegExp(`^${escapeRegex(queryParams.category)}$`, 'i') };
  }

  if (queryParams.q) {
    const searchRegex = new RegExp(escapeRegex(queryParams.q), 'i');
    query.$or = [
      { name: { $regex: searchRegex } },
      { category: { $regex: searchRegex } },
      { description: { $regex: searchRegex } }
    ];
  }

  const minPrice = queryParams.minPrice;
  const maxPrice = queryParams.maxPrice;

  if ((minPrice !== undefined && minPrice !== '') || (maxPrice !== undefined && maxPrice !== '')) {
    query.price = {};
    if (minPrice !== undefined && minPrice !== '') {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      query.price.$lte = Number(maxPrice);
    }
  }

  let sortOptions = {};
  const sortBy = queryParams.sort;

  if (sortBy === 'price-low') {
    sortOptions.price = 1;
  } else if (sortBy === 'price-high') {
    sortOptions.price = -1;
  } else if (sortBy === 'newest') {
    sortOptions._id = -1;
  } else if (sortBy === 'rating') {
    sortOptions.rating = -1;
  } else {
    sortOptions.isBestseller = -1;
  }

  const products = await Product.find(query).sort(sortOptions);
  
  const mapLegacy = (doc) => {
    if (!doc) return doc;
    const obj = doc.toObject ? doc.toObject() : doc;
    if (obj.isOnSale === 'true' || obj.isOnSale === 'false') {
      obj.isOnSale = obj.isOnSale === 'true';
    }
    if (obj.discount !== undefined && !obj.isOnSale && obj.discount > 0) {
      obj.isOnSale = true;
      obj.discountPercentage = obj.discount;
    }
    return obj;
  };

  return products.map(mapLegacy);
};

exports.getProductByIdService = async (id) => {
  const product = await Product.findOne({ id });
  if (!product) throw new Error('Product not found');
  
  const obj = product.toObject ? product.toObject() : product;
  if (obj.isOnSale === 'true' || obj.isOnSale === 'false') {
    obj.isOnSale = obj.isOnSale === 'true';
  }
  if (obj.discount !== undefined && !obj.isOnSale && obj.discount > 0) {
    obj.isOnSale = true;
    obj.discountPercentage = obj.discount;
  }
  return obj;
};

exports.getSearchSuggestionsService = async (q) => {
  if (!q) return [];
  const searchRegex = new RegExp(escapeRegex(q), 'i');
  return await Product.find({
    $or: [
      { name: { $regex: searchRegex } },
      { category: { $regex: searchRegex } }
    ]
  })
  .select('id name category price image')
  .limit(6);
};
