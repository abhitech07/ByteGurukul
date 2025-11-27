module.exports = (sequelize, DataTypes) => {
  const Pyq = sequelize.define('Pyq', {
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    filename: { // File ka naam store karenge
      type: DataTypes.STRING,
      allowNull: false
    },
    filePath: { // Pura path store karenge access ke liye
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Pyq;
};