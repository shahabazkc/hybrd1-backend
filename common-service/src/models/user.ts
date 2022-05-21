import mongoose from 'mongoose';

interface UserAttrs {
    userId: string;
    userType: string;
};

interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc;
};

interface UserDoc extends mongoose.Document {
    userId: string;
    userType: string;
};

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.id;
            delete ret.__v;
        }
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};


const User = mongoose.model<UserDoc, UserModel>('Users', userSchema);

export { User };