// models/Review.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './userModel.js'; // Make sure this exists and is imported

const Review = sequelize.define('Review', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: { // Equivalent to `user` field in Mongoose
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Must match the table name of your User model
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'Reviews',
});

export default Review;
