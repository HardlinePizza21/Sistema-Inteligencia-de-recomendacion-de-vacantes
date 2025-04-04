import { MongoClient } from "mongodb";


async function deleteDocumentsWithEmbedding() {
    const uri = "mongodb+srv://HardlinePizza21:samuel14madrid@vectorsearch.oqgdznm.mongodb.net/?retryWrites=true&w=majority&appName=VectorSearch"; // Replace with your MongoDB connection string
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const collection = client.db('mi_base_de_datos').collection('vacantes'); // Replace with your collection name

        const result = await collection.deleteMany();

        console.log(result.deletedCount)

    } catch (error) {
        console.error('Error deleting documents:', error);
    } finally {
        await client.close();
    }
}

deleteDocumentsWithEmbedding();