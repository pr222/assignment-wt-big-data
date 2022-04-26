const { Client } = require('@elastic/elasticsearch')
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
      password: process.env.ES_PASSWORD
    }
  })
  
  return client
}

/**
 * Searching for coffee results.
 * 
 * @param {*} req - request object.
 * @param {*} res - response object.
 */
export default async function handler(req, res) {
  try {
    const client = await getESClient()

    let data = []

    const searchResult = await client.search({
      index: 'coffee',
      body: {
        "aggs": {
          "coffeeData": {
            "terms": {
              "field": "Country_of_Origin",
              "order": {
                "_key": "asc"
              },
              "size": 50
            },
            "aggs": {
              "body_avg": {
                "avg": {
                  "field": "Body"
                }
              },
              "acidity_avg": {
                "avg": {
                  "field": "Acidity"
                }
              },
              "aftertaste_avg": {
                "avg": {
                  "field": "Aftertaste"
                }
              },
              "cupperPoints_avg": {
                "avg": {
                  "field": "Cupper_Points"
                }
              }
            }
          }
        },
        "size": 0,
        "fields": [],
        "script_fields": {},
        "stored_fields": [
          "*"
        ],
        "runtime_mappings": {},
        "_source": {
          "excludes": []
        },
        "query": {
          "range": {
            "Cupper_Points": {
              "gte": 7.5,
              "lte": 11
            }
          }
        }
      }
    })

    data = searchResult.aggregations.coffeeData.buckets

    res.status(200).json({ data })
  } catch (error) {
    res.status(500)
  }
}
