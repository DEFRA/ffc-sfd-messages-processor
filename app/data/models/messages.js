module.exports = (sequelize, DataTypes) => {
  return sequelize.define('messages', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: DataTypes.STRING
  },
  {
    tableName: 'messages',
    freezeTableName: true,
    timestamps: false
  })
}
