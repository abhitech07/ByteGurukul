const { Sequelize, DataTypes } = require('sequelize');
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
// Step-by-step table creation to avoid FK errors
db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function syncDatabase() {
  try {
    // Core tables first
    await db.User.sync();
    await db.Course.sync();
    await db.Lecture.sync();

    // Enrollment + Progress after core
    await db.Enrollment.sync();
    await db.Progress.sync();
    await db.LectureProgress.sync();

    // Additional models
    await db.Application.sync();
    await db.Certificate.sync();
    await db.Comment.sync();
    await db.Notification.sync();
    await db.Task.sync();
    await db.Submission.sync();
    await db.Pyq.sync();
    await db.Review.sync();
    await db.Wishlist.sync();
    await db.Order.sync();

    console.log("All tables created successfully!");

  } catch (error) {
    console.error("ERROR creating database tables:", error);
  }
}

db.syncDatabase = syncDatabase;

module.exports = db;
