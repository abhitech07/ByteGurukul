module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domain: { // e.g., 'Web Development', 'Mobile Development'
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER, // e.g., 49
      allowNull: false,
      defaultValue: 49
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    technologies: {
      type: DataTypes.JSON, // Stores array like ['React', 'Node']
      allowNull: false,
      defaultValue: []
    },
    features: {
      type: DataTypes.JSON, // Stores array like ['Auth', 'Payment']
      allowNull: false,
      defaultValue: []
    },
    difficulty: { // 'Beginner', 'Intermediate', 'Advanced'
      type: DataTypes.STRING,
      defaultValue: 'Intermediate'
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 4.5
    },
    icon: { // Store an emoji or icon class string
      type: DataTypes.STRING,
      defaultValue: '🚀'
    },
    demoLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sourceCodeUrl: { // Path to zip file or S3 URL
      type: DataTypes.STRING,
      allowNull: true
    },
    isPaid: { // To allow free projects if needed
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  return Project;
};