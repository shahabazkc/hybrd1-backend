import mongoose from 'mongoose';

interface UserAttrs {
    username: string;
    password: string;
    type_of_user: string;
};

interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): UserDoc;
};

interface UserDoc extends mongoose.Document {
    username: string;
    password: string;
    type_of_user: string;
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type_of_user: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };