module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: { // e.g., 'Frontend', 'Backend', 'FullStack'
      type: DataTypes.STRING,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATEONLY
    }
  });
  return Task;
};