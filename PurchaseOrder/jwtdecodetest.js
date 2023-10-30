import jwt from 'jsonwebtoken'


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNkZjBjZjZhZTNkYmFkMDYxYjgxN2UiLCJlbWFpbCI6IlVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTY5ODU2MjA2MiwiZXhwIjoxNjk4OTk0MDYyfQ.gYmmeeqZe7I9U8WF2fg3lsxYI4oBvla8yYz7EyRR9U0"

const d = jwt.decode(token)
console.log(d)
let secret = "klajsdlf0913038120kljaklsjdfkj1"
const data = jwt.verify(token, secret)

console.log(data)





