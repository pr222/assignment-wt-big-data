// 
async function getData() {
  return("DATA!")
}

export default async function handler(req, res) {
  const d = await getData()
  res.status(200).json({ name: d })
}
