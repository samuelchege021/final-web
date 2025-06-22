// models/index.js
import User from './userModel.js';
import { Order, OrderItem } from './orderModel.js';
import Product from './productModel.js';
import Review from './Reviewmodel.js';

// Define relationships
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE',as: 'reviews' });
Review.belongsTo(Product, { foreignKey: 'productId' });

// Optional (if reviews are linked to users):
User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });
// Export all models together
export { User, Order, OrderItem,Product,Review };