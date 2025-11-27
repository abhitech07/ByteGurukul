module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: { // Added Course Code
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    category: { // Added Category
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Programming'
    },
    level: { // Added Level
      type: DataTypes.STRING,
      defaultValue: 'Beginner'
    },
    duration: { // Added Duration
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbnail: { // Added Image Path
      type: DataTypes.STRING,
      allowNull: true
    },
    instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', 
            key: 'id',
        }
    }
  });

  return Course;
};