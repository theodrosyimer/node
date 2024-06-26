// the idea is to stream data using async generator/iterator to add resumability to the stream (and to be able to use async/await?)

// why not use a worker thread to parallelize the work?
// like to save the data to a file for resumability and recovery (in bytes for performance) as it is being processed by the main thread (use node:fs/promises/open to open the file and then use node:fs/)
// or like save the data in chunks of 1000 records in a file and then use a worker thread to parse the data in the file
