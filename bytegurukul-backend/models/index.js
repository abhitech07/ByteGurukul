const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

const db = {};

// Load all models
db.User = require('./user')(sequelize, DataTypes);
db.Course = require('./course')(sequelize, DataTypes);
db.Lecture = require('./Lecture')(sequelize, DataTypes);
db.Enrollment = require('./enrollment')(sequelize, DataTypes);
db.Progress = require('./Progress')(sequelize, DataTypes);
db.LectureProgress = require('./LectureProgress')(sequelize, DataTypes);
db.Application = require('./application')(sequelize, DataTypes);
db.Certificate = require('./certificate')(sequelize, DataTypes);
db.Comment = require('./Comment')(sequelize, DataTypes);
db.Notification = require('./Notification')(sequelize, DataTypes);
db.Task = require('./Task')(sequelize, DataTypes);
db.Submission = require('./Submission')(sequelize, DataTypes);
db.Pyq = require('./Pyq')(sequelize, DataTypes);
db.Review = require('./Review')(sequelize, DataTypes);
db.Wishlist = require('./Wishlist')(sequelize, DataTypes);
db.Order = require('./Order')(sequelize, DataTypes);
db.Project = require('./Project')(sequelize, DataTypes);
db.Chat = require('./Chat')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Course, { foreignKey: 'instructorId' });
db.Course.belongsTo(db.User, { foreignKey: 'instructorId' });

db.User.hasMany(db.Enrollment, { foreignKey: 'userId' });
db.Enrollment.belongsTo(db.User, { foreignKey: 'userId' });

db.Course.hasMany(db.Enrollment, { foreignKey: 'courseId' });
db.Enrollment.belongsTo(db.Course, { foreignKey: 'courseId' });

db.User.hasMany(db.Progress, { foreignKey: 'userId' });
db.Progress.belongsTo(db.User, { foreignKey: 'userId' });

db.Course.hasMany(db.Progress, { foreignKey: 'courseId' });
db.Progress.belongsTo(db.Course, { foreignKey: 'courseId' });

db.Course.hasMany(db.Lecture, { foreignKey: 'courseId' });
db.Lecture.belongsTo(db.Course, { foreignKey: 'courseId' });

db.User.hasMany(db.LectureProgress, { foreignKey: 'userId' });
db.LectureProgress.belongsTo(db.User, { foreignKey: 'userId' });

db.Lecture.hasMany(db.LectureProgress, { foreignKey: 'lectureId' });
db.LectureProgress.belongsTo(db.Lecture, { foreignKey: 'lectureId' });

db.User.hasMany(db.Order, { foreignKey: 'userId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });

db.Course.hasMany(db.Order, { foreignKey: 'courseId' });
db.Order.belongsTo(db.Course, { foreignKey: 'courseId' });

// SYNC ORDER (IMPORTANT)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function syncDatabase() {
  try {
    // Core tables first - use alter: true to add missing columns like authProvider
    await db.User.sync({ alter: true });
    await db.Course.sync({ alter: true });
    await db.Lecture.sync({ alter: true });

    // Enrollment + Progress after core
    await db.Enrollment.sync({ alter: true });
    await db.Progress.sync({ alter: true });
    await db.LectureProgress.sync({ alter: true });

    // Additional models
    await db.Application.sync({ alter: true });
    await db.Certificate.sync({ alter: true });
    await db.Comment.sync({ alter: true });
    await db.Notification.sync({ alter: true });
    await db.Task.sync({ alter: true });
    await db.Submission.sync({ force: true }); // Force recreate to fix grade column type issue
    await db.Pyq.sync({ alter: true });
    await db.Review.sync({ alter: true });
    await db.Wishlist.sync({ alter: true });
    await db.Order.sync({ force: true }); // Force recreate to fix orderId column type issue
    await db.Project.sync({ alter: true });
    await db.Chat.sync({ alter: true });

    console.log("All tables created/updated successfully!");

  } catch (error) {
    console.error("ERROR creating database tables:", error);
  }
}

db.syncDatabase = syncDatabase;

module.exports = db;