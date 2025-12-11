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

module.exports = db;