import axios from "axios"

const defaultBaseUrl = "https://my-json-server.typicode.com/modanisa/bootcamp-video-db"
console.log(defaultBaseUrl)
const api = (baseUrl = defaultBaseUrl) =>
({
    getVideos: async () => {
        const {data} = await axios.get(`${baseUrl}/videos`)

        return data
    }
})
console.log("api creation", api)

export default api