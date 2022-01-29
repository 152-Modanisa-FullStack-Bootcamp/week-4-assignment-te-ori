import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import api from "@/api/api.js"

describe("sanity", () => {
    it("pact sanity", () => {
    })
})

pactWith({ consumer: "VideoPortal", provider: "VideoApi" }, provider => {
    let client;
    
    beforeEach(() => {
        client = api(provider.mockService.baseUrl)
    })
    
    describe("video list", () => {

        it("get video list", async () => {
            await provider.addInteraction({
                state: "get video list successfully",
                uponReceiving: "nonempty video list",
                withRequest: {
                    method: "GET",
                    path: "/videos",
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=URF-8"
                    },
                    body: Matchers.eachLike({
                        id: Matchers.like(1),
                        videoAddress: Matchers.like("https://www.youtube.com/watch?v=FXpIoQ_rT_c"),
                        coverImage: Matchers.like("https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp"),
                        hoverImage: Matchers.like("https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp"),
                        title: Matchers.like("Vue.js Course for Beginners [2021 Tutorial]"),
                        viewCount: Matchers.like(254),
                        publishDateInMonth: Matchers.like(4),
                        ownerImage: Matchers.like("https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj"),
                        ownerName: Matchers.like("freeCodeCamp.org"),
                        description: Matchers.like("Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications.")

                    })
                }
            })

            const response = await client.getVideos()
            expect(response).toBeTruthy()
        })
    })
})