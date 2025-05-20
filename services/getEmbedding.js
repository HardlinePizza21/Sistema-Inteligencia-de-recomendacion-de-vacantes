import { pipeline } from '@xenova/transformers';

// Function to generate embeddings for a given data source
export async function getEmbedding(data) {
    const embedder = await pipeline(
        'feature-extraction',
        'Xenova/bge-base-en'
    );
    const results = await embedder(`Representación: ${data}`, { pooling: 'mean', normalize: true });
    return Array.from(results.data);
}


