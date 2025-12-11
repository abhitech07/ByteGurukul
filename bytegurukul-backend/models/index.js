const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// --- IMPORT MODELS ---
db.User = require('./user')(sequelize, DataTypes);
db.Course = require('./course')(sequelize, DataTypes);
db.Enrollment = require('./enrollment')(sequelize, DataTypes);
db.Certificate = require('./certificate')(sequelize, DataTypes);
db.Application = require('./application')(sequelize, DataTypes);
db.Pyq = require('./Pyq')(sequelize, DataTypes);
// New Models
db.Lecture = require('./Lecture')(sequelize, DataTypes);
db.Task = require('./Task')(sequelize, DataTypes);
db.Submission = require('./Submission')(sequelize, DataTypes);
db.Review = require('./Review')(sequelize, DataTypes);
db.Comment = require('./Comment')(sequelize, DataTypes);
db.Notification = require('./Notification')(sequelize, DataTypes);
db.Wishlist = require('./Wishlist')(sequelize, DataTypes);
db.LectureProgress = require('./LectureProgress')(sequelize, DataTypes);
db.Progress = require('./Progress')(sequelize, DataTypes);

// --- DEFINE RELATIONSHIPS ---

// User & Course (Enrollment)
db.User.belongsToMany(db.Course, { through: db.Enrollment, foreignKey: 'userId' });
db.Course.belongsToMany(db.User, { through: db.Enrollment, foreignKey: 'courseId' });
db.Enrollment.belongsTo(db.User, { foreignKey: 'userId' });
db.Enrollment.belongsTo(db.Course, { foreignKey: 'courseId' });

// Instructor
db.Course.belongsTo(db.User, { as: 'instructor', foreignKey: 'instructorId' });

// Lectures (Course has many Lectures)
db.Course.hasMany(db.Lecture, { foreignKey: 'courseId', as: 'lectures' });
db.Lecture.belongsTo(db.Course, { foreignKey: 'courseId' });

// Internship (User has many Submissions)
db.User.hasMany(db.Submission, { foreignKey: 'studentId' });
db.Submission.belongsTo(db.User, { foreignKey: 'studentId' });

// Tasks (Task has many Submissions)
db.Task.hasMany(db.Submission, { foreignKey: 'taskId' });
db.Submission.belongsTo(db.Task, { foreignKey: 'taskId' });

// Reviews (User has many Reviews, Course has many Reviews)
db.User.hasMany(db.Review, { foreignKey: 'userId' });
db.Review.belongsTo(db.User, { foreignKey: 'userId' });
db.Course.hasMany(db.Review, { foreignKey: 'courseId' });
db.Review.belongsTo(db.Course, { foreignKey: 'courseId' });

// Comments (User has many Comments, Lecture has many Comments)
db.User.hasMany(db.Comment, { foreignKey: 'userId' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId' });
db.Lecture.hasMany(db.Comment, { foreignKey: 'lectureId' });
db.Comment.belongsTo(db.Lecture, { foreignKey: 'lectureId' });

// Notifications (User has many Notifications)
db.User.hasMany(db.Notification, { foreignKey: 'userId' });
db.Notification.belongsTo(db.User, { foreignKey: 'userId' });

// Wishlist (User has many Wishlisted Courses)
db.User.belongsToMany(db.Course, { through: db.Wishlist, foreignKey: 'userId', as: 'wishlistedCourses' });
db.Course.belongsToMany(db.User, { through: db.Wishlist, foreignKey: 'courseId', as: 'wishlistedBy' });
db.Wishlist.belongsTo(db.User, { foreignKey: 'userId' });
db.Wishlist.belongsTo(db.Course, { foreignKey: 'courseId' });

// LectureProgress (User tracks progress on Lectures)
db.User.belongsToMany(db.Lecture, { through: db.LectureProgress, foreignKey: 'userId' });
db.Lecture.belongsToMany(db.User, { through: db.LectureProgress, foreignKey: 'lectureId' });
db.LectureProgress.belongsTo(db.User, { foreignKey: 'userId' });
db.LectureProgress.belongsTo(db.Lecture, { foreignKey: 'lectureId' });

// Progress (User has course completion tracking)
db.User.hasMany(db.Progress, { foreignKey: 'userId' });
db.Progress.belongsTo(db.User, { foreignKey: 'userId' });
db.Course.hasMany(db.Progress, { foreignKey: 'courseId' });
db.Progress.belongsTo(db.Course, { foreignKey: 'courseId' });

module.exports = db;