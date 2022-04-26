// 
async function getData() {
  return("DATA!")
}

export default function handler(req, res) {
  const d = getData()
  res.status(200).json({ name: d })
}
