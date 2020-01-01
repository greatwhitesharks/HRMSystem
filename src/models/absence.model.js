/**
 *
 */
class Absence {
  /**
     *
     * @param {*} data
     */
  constructor(data) {
    Object.assign(this, data);
    Object.seal(this);
  }
}

module.exports = Absence;
