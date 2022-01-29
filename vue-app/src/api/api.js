import axios from "axios"

const defaultBaseUrl = process.env.DEFAULT_BASE_URL

const api = (baseUrl = defaultBaseUrl) =>
({
    getVideos: async () => {
        const {data} = await axios.get(`${baseUrl}/videos`)

        return data
    }
})
console.log("api creation", api)

export default api