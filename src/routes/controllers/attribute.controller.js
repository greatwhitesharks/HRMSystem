const db = require('../../db');
const CustomAttributeRepository =
  require('../../repositories/customAttribute.repository');

/**
 *
 */
class AttributeController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async save(req, res, next) {
    // TODO: Trigger to add the default value to all
    const repo = new CustomAttributeRepository(db);
    await repo.save({
      name: req.body.name,
      type: req.body.type,
      default: req.body.type || null,
    });
    return res.json({status: 'success'});
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async delete(req, res, next) {
    // TODO: Don't actually delete
    const repo = new CustomAttributeRepository(db);
    repo.delete({id: req.body.attributeId});
    return res.json({status: 'success'});
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getCustomAttributes(req, res, next) {
    const repo = new CustomAttributeRepository(db);
    const attributes = await repo.getAttributes(['*']);
    res.json(attributes);
  }
}

module.exports = AttributeController;
