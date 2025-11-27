module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    githubLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    liveLink: {
      type: DataTypes.STRING
    },
    status: { // 'Pending', 'Approved', 'Rejected'
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    grade: {
      type: DataTypes.STRING
    },
    studentId: { // Linked to User
        type: DataTypes.INTEGER,
        allowNull: false
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  });
  return Submission;
};