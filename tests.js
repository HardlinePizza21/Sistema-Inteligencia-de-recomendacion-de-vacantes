import { MongoClient } from "mongodb";
import { getEmbedding } from "./services/getEmbedding.js";

async function deleteDocumentsWithEmbedding() {
    const uri = "mongodb+srv://HardlinePizza21:samuel14madrid@vectorsearch.oqgdznm.mongodb.net/?retryWrites=true&w=majority&appName=VectorSearch"; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('mi_base_de_datos'); // Replace with your database name
        const collection = database.collection('vacantes'); // Replace with your collection name

        const embeddingTerm = await getEmbedding("desarolador ");
        
        const results = await collection.aggregate([
            {
                $vectorSearch: {
                    queryVector: embeddingTerm,
                    path: "embedding",
                    numCandidates: 100,
                    limit: 5,
                    index: "vector_index"
                }
            },
            // {
            //     $match: {
            //         _id: { $ne: vacante._id } // Exclude the same vacante by its _id
            //     }
            // },
            {
                $project: {
                    embedding: 0, // Exclude the embedding field from the results
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ]).toArray();

        console.log(results)

    } catch (error) {
        console.error('Error deleting documents:', error);
    } finally {
        await client.close();
    }
}

deleteDocumentsWithEmbedding();