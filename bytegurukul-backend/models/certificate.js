module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id',
      }
    },
    issuedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    certificateUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Certificate;
};
