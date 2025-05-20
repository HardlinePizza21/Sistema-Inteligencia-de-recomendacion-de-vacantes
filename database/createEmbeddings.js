//!Crea un vector para cada documento
import { MongoClient } from "mongodb"
import { getEmbedding } from "../services/getEmbedding.js";
import { buildWeightedVacancyText } from "../services/buildEmbeddigns.js";



export const createEmbedding = async () => {

    const client = new MongoClient("mongodb+srv://HardlinePizza21:samuel14madrid@vectorsearch.oqgdznm.mongodb.net/?retryWrites=true&w=majority&appName=VectorSearch")

    try {

        client.connect();

        const collection = client.db("mi_base_de_datos").collection("vacantes")

        let allEmbeddingsGenerated = false

        while (!allEmbeddingsGenerated) {

            const vacantes = await collection.find(
                {
                    embedding: {$exists: false}
                }
            ).limit(20).toArray();

            if (vacantes.length == 0){
                allEmbeddingsGenerated = true
                console.log("All embeddings generated")
                continue;
            }
            const vacantesActualizadas = [];

            await Promise.all(vacantes.map(async vacante => {

                const data = buildWeightedVacancyText(vacante)

                const embedding = await getEmbedding(data);

                // Add the embedding to an array of update operations
                vacantesActualizadas.push(
                    {
                        updateOne: {
                            filter: { "_id": vacante._id },
                            update: { $set: { "embedding": embedding } }
                        }
                    }
                )
            }));

            // Continue processing documents if an error occurs during an operation
            const options = { ordered: false };
            // Update documents with the new embedding field
            const result = await collection.bulkWrite(vacantesActualizadas, options);

            console.log("Count of documents updated: " + result.modifiedCount);
        }


    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }

}

createEmbedding().catch(console.dir);