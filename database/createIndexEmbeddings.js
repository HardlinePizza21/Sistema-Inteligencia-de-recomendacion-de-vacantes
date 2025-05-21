import { MongoClient } from 'mongodb';
import dotenv from 'dotenv/config'

const client = new MongoClient("mongodb+srv://HardlinePizza21:samuel14madrid@vectorsearch.oqgdznm.mongodb.net/?retryWrites=true&w=majority&appName=VectorSearch");

async function run() {
  try {
    const database = client.db("mi_base_de_datos");
    const collection = database.collection("vacantes");
   
    const index = {
        name: "vector_index",
        type: "vectorSearch",
        definition: {
          "fields": [
            {
              "type": "vector",
              "path": "embedding",
              "similarity": "dotProduct",
              "numDimensions": parseInt(process.env.DIMENSION_NUM)
            }
          ]
        }
    }

    const result = await collection.createSearchIndex(index);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
