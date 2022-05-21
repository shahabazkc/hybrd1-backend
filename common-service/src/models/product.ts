import mongoose from 'mongoose';

interface ProductAttrs {
    name: string;
    price: string;
    sellerId: string;
    catalogId: string;
};

interface ProductMOdel extends mongoose.Model<any> {
    build(attrs: ProductAttrs): ProductDoc;
};

interface ProductDoc extends mongoose.Document {
    name: string;
    price: string;
    sellerId: string;
    catalogId: string;
};

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    catalogId: {
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

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductMOdel>('Products', productSchema);


export { Product };