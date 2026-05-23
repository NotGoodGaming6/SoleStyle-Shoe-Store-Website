const Category = require('#models/misc/misc.category.model');

exports.getCategoriesService = async () => {
  return await Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'name',
        foreignField: 'category',
        as: 'products'
      }
    },
    {
      $addFields: {
        count: { $size: '$products' }
      }
    },
    {
      $project: {
        products: 0
      }
    }
  ]);
};
