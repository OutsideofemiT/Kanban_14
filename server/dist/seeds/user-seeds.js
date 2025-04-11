"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const user_js_1 = require("../models/user.js");
const seedUsers = async () => {
    await user_js_1.User.bulkCreate([
        { username: 'JollyGuru', password: 'butter' },
        { username: 'SunnyScribe', password: 'sunny' },
        { username: 'RadiantComet', password: 'comet' },
    ], { individualHooks: true });
};
exports.seedUsers = seedUsers;
