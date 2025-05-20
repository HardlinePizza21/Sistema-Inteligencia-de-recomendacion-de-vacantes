import { MongoClient } from "mongodb";
import { getEmbedding } from "../services/getEmbedding.js";

export const query= async(userPreferences, limit = 5, opt = "porNombre") => {

    const uri = "mongodb+srv://HardlinePizza21:samuel14madrid@vectorsearch.oqgdznm.mongodb.net/?retryWrites=true&w=majority&appName=VectorSearch"; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);

    const searchMethod = opt === "porNombre" 
        ? {path:'nombre_vacante_embedding', index: 'vector_index_by_nombre_vacante'} 
        : {path:'embedding',index: 'vector_index'}

    try {
        await client.connect();
        const database = client.db('mi_base_de_datos'); // Replace with your database name
        const collection = database.collection('vacantes'); // Replace with your collection name

        const embeddingTerm = await getEmbedding(userPreferences); 

        const results = await collection.aggregate([
            {
                $vectorSearch: {
                    queryVector: embeddingTerm,
                    path: searchMethod.path,
                    numCandidates: 200,
                    limit: limit,
                    index: searchMethod.index
                }
            },
            // {
            //     $match: {
            //         _id: { $ne: vacante._id } // Exclude the same vacante by its _id
            //     }
            // },
            {
                $project: {
                    _id:0,
                    embedding: 0, // Exclude the embedding field from the results
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ]).toArray();

        return results

    } catch (error) {
        console.error('Error deleting documents:', error);
    } finally {
        await client.close();
    }
}