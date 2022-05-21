import mongoose from 'mongoose';

interface OrderAttrs {
    sellerId: string;
    buyerId: string;
    catelogId: string;
    products: object[];
};

interface OrderModel extends mongoose.Model<any> {
    build(attrs: OrderAttrs): OrderDoc;
};

interface OrderDoc extends mongoose.Document {
    sellerId: string;
    buyerId: string;
    catelogId: string;
    products: object[];
};

const orderSchema = new mongoose.Schema({
    sellerId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    catelogId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Orders', orderSchema);

export { Order };