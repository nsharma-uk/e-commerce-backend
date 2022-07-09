const router = require("express").Router();
const { Category, Product } = require("../../models");

//find all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (categories) {
      return res.json(categories);
    }
    return res.status(404).json({
      error: "Categories not found",
    });
  } catch (error) {
    console.log(`[ERROR]:Failed to get categories | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// find one category by its `id` value including its associated Products
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [
        { model: Product, attributes: ["product_name", "price", "stock"] },
      ],
    });
    if (category) {
      return res.json(category);
    }
    return res.status(404).json({
      error: "Category not found",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to get category | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const { category_name } = req.body;

    // insert category in the DB
    const newCategory = await Category.create({ category_name });
    return res.json(newCategory);
  } catch (error) {
    console.log(`[ERROR]: Failed to create new category | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateCategory = await Category.findByPk(id);
    const { category_name } = req.body;
    await Category.update({ category_name }, { where: { id } });

    if (updateCategory) {
      return res.status(200).json({ message: "Category updated" });
    }
    return res.status(404).json({
      error: "Category not updated",
    });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    await Category.destroy({ where: { id } });

    if (category) {
      return res.status(200).json({ message: "Category deleted" });
    }
    return res.status(404).json({
      error: "Category not deleted",
    });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

module.exports = router;
