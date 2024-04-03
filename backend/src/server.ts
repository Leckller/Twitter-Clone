import { app } from "./app";

const port = 8001

app.listen(port, () => {
  console.log(`server on port ${port}`)
})