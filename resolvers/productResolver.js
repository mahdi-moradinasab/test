const Product  = require("../models/product");

const productResolvers={
    Query:{
        products: async ()=> await Product.find({}),
        product: async (parent, args)=> await Product.findById(args.id),
    },
    Mutation:{
        createProduct: async (parent,args)=>{
            const { name, price, description} = args;
            const newProduct= new Product({
                name,
                price,
                description
            });
            await newProduct.save();
            return newProduct;
        },
        updateProduct: async (parent,args)=>{
            const {id}= args;
            const updateProduct= await Product.findByIdAndUpdate(id, args);
            if (!updateProduct)
                throw new Error(`product with this ID ${id} not found`);
            return updateProduct;
        },
        deleteProduct: async (parent,args)=>{
            const {id} = args;
            const deleteProduct= await Product.findByIdAndDelete(id);
            if (!deleteProduct)
                throw new Error(`product with this ID ${id} not found`)
            return deleteProduct;
        },
    },
};

module.exports = productResolvers;
