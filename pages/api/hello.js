// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
  console.log(req.method);
  axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(function (response) {
        // handle success
        res.status(200).send(response.data);
      })
      .catch(function (error) {
        // handle error
        res.status(400).json(error)
      })
}
