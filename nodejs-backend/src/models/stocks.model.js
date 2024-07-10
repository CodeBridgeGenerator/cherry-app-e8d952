
    module.exports = function (app) {
        const modelName = 'stocks';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            product: { type: Schema.Types.ObjectId, ref: "products" },
qty: { type: Number, required: false, min: 0, max: 100000000 },
stockdate: { type: Number, required: false, min: 0, max: 100000000 },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };