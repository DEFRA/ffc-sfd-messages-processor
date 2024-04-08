module.exports = (sequelize, DataTypes) => {
  return sequelize.define('messages', {
    messageId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    scheme: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    crn: DataTypes.STRING(10),
    content: DataTypes.JSON,
    requestedDate: DataTypes.DATE,
    sbi: DataTypes.STRING(9)
  },
  {
    tableName: 'messages',
    freezeTableName: true,
    timestamps: false
  })
}
