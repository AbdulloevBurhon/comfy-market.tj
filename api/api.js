import { getIDFn } from "../productid.js";
let api = 'https://www.course-api.com/javascript-store-products'



export async function get() {
    try {
        const {data}= await axios.get(api);
        
        return data;
        
    } catch (error) {
        console.error(error);
    }
}



export async function getById(id) {
  try {
    const {data} = await axios.get(api)
    const filtered = data.find(i => i.id === id)
    console.log(filtered);
    getIDFn(filtered)
  } catch (error) {
    console.error(error);
  }
}