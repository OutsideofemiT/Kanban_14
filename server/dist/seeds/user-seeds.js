import { User } from '../models/user.js';
export const seedUsers = async () => {
    await User.bulkCreate([
        { username: 'JollyGuru', password: 'butter' },
        { username: 'SunnyScribe', password: 'sunny' },
        { username: 'RadiantComet', password: 'comet' },
    ], { individualHooks: true });
};
