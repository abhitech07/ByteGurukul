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
    code: { 
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
    category: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Programming'
    },
    level: { 
      type: DataTypes.STRING,
      defaultValue: 'Beginner'
    },
    duration: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbnail: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Ensure this matches your User table name
            key: 'id',
        }
    }
  }, {
    tableName: 'courses' // <--- THIS FIXED THE ERROR
  });

  return Course;
};