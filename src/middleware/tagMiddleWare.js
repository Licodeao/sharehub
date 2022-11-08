const tagService = require('../service/tagService')

const verifyTagExists = async (ctx, next) => {
  const { tags } = ctx.request.body;
  const newTags = []
  for (let tag of tags) {
    const tagResult = await tagService.getTagByName(tag)
    const label = { tag }
    if (!tagResult) {
      const result = await tagService.createTag(tag)
      label.id = result.insertId
    } else {
      label.id = tagResult.id
    }
    newTags.push(label)
  }
  ctx.tags = newTags
  await next()
}

module.exports = {
  verifyTagExists
}