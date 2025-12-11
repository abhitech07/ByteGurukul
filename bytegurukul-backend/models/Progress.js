const { DataTypes } = require('sequelize');

module.exports = function defineProgress(sequelize, DataTypes) {
  const Progress = sequelize.define('Progress', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    // Overall course progress (0-100%)
    completionPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      validate: { min: 0, max: 100 }
    },
    // Total time spent on course in seconds
    totalTimeSpent: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Number of lectures completed
    lecturesCompleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Total number of lectures in course
    totalLectures: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Course completion status
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Completion date
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Last accessed timestamp
    lastAccessedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    // List of watched lecture IDs (stored as JSON array)
    watchedLectureIds: {
      type: DataTypes.JSON,
      defaultValue: [],
      comment: 'Array of lecture IDs that student has watched'
    },
    // Current section/module being watched
    currentLectureId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Performance score (0-100)
    performanceScore: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
      validate: { min: 0, max: 100 }
    },
    // Notes/bookmarks
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'progress',
    indexes: [
      { fields: ['userId', 'courseId'], unique: true }
    ]
  });

  return Progress;
};
