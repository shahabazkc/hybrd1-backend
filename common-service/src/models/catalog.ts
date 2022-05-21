import mongoose from "mongoose";

interface CatalogAttrs {
    name: string;
    sellerId: string;
    product: object[];
};

interface CatalogModel extends mongoose.Model<any> {
    build(attrs: CatalogAttrs): CatalogDoc;
};

interface CatalogDoc extends mongoose.Document {
    name: string;
    sellerId: string;
    product: object[];
};

const catalogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    product: {
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

catalogSchema.statics.build = (attrs: CatalogAttrs) => {
    return new Catalog(attrs);
};

const Catalog = mongoose.model<CatalogDoc, CatalogModel>("catalogs", catalogSchema);

export { Catalog };