import { shallowMount } from "@vue/test-utils"
import VideoBox from "@/components/VideoBox"
import data from "./test-data"

describe("VideoBox.vue", () => {
    const videoData = data[0];
    let wrapper;

    console.log(videoData)

    beforeEach(() => {
        wrapper = shallowMount(VideoBox, {
            propsData: {
                video: videoData
            }
        })
    })

    it("should exist", () => {
        console.log(wrapper.html())
        expect(wrapper.exists()).toBeTruthy()
    })

    it("should contains", () => {
        const videoBox = wrapper.find(".videobox")
        const coverImage = videoBox.find("img.cover")
        const profileImage = videoBox.find("img.profile")
        const title = videoBox.find("title");

        expect(videoBox.exists()).toBeTruthy()

        expect(coverImage.exists()).toBeTruthy()
        expect(coverImage.attributes("src")).toMatch(videoData.coverImage)

        expect(profileImage.exists()).toBeTruthy()
        expect(profileImage.attributes("src")).toMatch(videoData.ownerImage)

        expect(title.exists()).toBeTruthy()
    })

    it("should be able to change cover image when mouse is over", () => {
        const coverImage = wrapper.find("img.cover")
        coverImage.trigger('mousover')

        expect(coverImage.attributes("src")).toMatch(videoData.hoverImage)
    })
})