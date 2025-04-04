import { MongoClient } from 'mongodb';
import { getEmbedding } from '../services/getEmbedding.js';

export const createFieldEmbedding = async() => {

    const client = new MongoClient("mongodb+srv://HardlinePizza21:samuel14madrid@vectorsearch.oqgdznm.mongodb.net/?retryWrites=true&w=majority&appName=VectorSearch");

    try {

        client.connect();

        const collection = client.db("mi_base_de_datos").collection("vacantes");

        const documents = await collection.find().toArray();

        const updateDocuments = [];

        await Promise.all(documents.map(async doc => {

            const embedding = await getEmbedding(doc.nombre_vacante);

            // Add the embedding to an array of update operations
            updateDocuments.push(
                {
                    updateOne: { 
                        filter: { "_id": doc._id },
                        update: { $set: { "nombre_vacante_embedding": embedding } }
                    }
                }
           )
       }));

       // Continue processing documents if an error occurs during an operation
       const options = { ordered: false };

       // Update documents with the new embedding field
       const result = await collection.bulkWrite(updateDocuments, options); 
       console.log("Count of documents updated: " + result.modifiedCount); 
            
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
createFieldEmbedding().catch(console.dir);
