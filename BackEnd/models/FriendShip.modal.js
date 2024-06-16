import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        friendIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }],
    },
    { timestamps: true }
);

const Friendship = mongoose.model('Friendship', friendshipSchema);

export default Friendship;
