const router = require("express").Router();
const { async } = require("seed/lib/seed");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// find all tags inc associated Product data
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll();
    ({
      include: [{ model: Product }],
    });
    if (tags) {
      return res.json(tags);
    }
    return res.status(400).json({
      error: "Tags not found",
    });
  } catch (error) {
    console.log(`[ERROR]:Failed to get tags| ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// find a single tag by its `id` inc associated Product data
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, {
      include: [{ model: Product }],
    });
    if (tag) {
      return res.json(tag);
    }
    return res.status(400).json({
      error: "Tag not found",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to get tag | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// create a new tag
router.post("/", async (req, res) => {
  try {
    const { tag_name } = req.body;
    const newTag = await Tag.create({ tag_name });
    if (newTag) {
      return res.status(200).json({ message: "Tag created" });
    }
    return res.status(400).json({
      error: "Tag not found",
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to create new tag | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateTag = await Tag.findByPk(id);
    const { tag_name } = req.body;
    await Tag.update({ tag_name }, { where: { id } });

    if (updateTag) {
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

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    await Tag.destroy({ where: { id } });

    if (tag) {
      return res.status(200).json({ message: "Tag deleted" });
    }
    return res.status(404).json({
      error: "Tag not deleted",
    });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

module.exports = router;
