// 
import { Client } from '@elastic/Elasticsearch'
/**
 * Connect to the Elastic Search Client.
 * 
 * @returns an Elastic Search Client object.
 */
async function getESClient() {
  const client = new Client({
    cloud: {
      id: process.env.ES_CLOUD_ID
    },
    auth: {
      username: process.env.ES_USERNAME,
      password: process.env.PASSWORD
    }
  })
  
  return client
}

export default async function handler(req, res) {
  try {
    const client = await getESClient()

    let data = []

    

    res.status(200).json({ data })
  } catch (error) {
    res.status(500)
  }
}
