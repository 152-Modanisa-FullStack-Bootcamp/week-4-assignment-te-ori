import {createLocalVue, shallowMount } from "@vue/test-utils"
import VideoBox from "@/components/VideoBox"
import data from "./test-data"
import VueRouter from "vue-router"

describe("VideoBox.vue", () => {
    const videoData = data[0];
    let wrapper;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(VueRouter)
        wrapper = shallowMount(VideoBox, {
            localVue,
            propsData: {
                video: videoData
            }
        })
    })

    it("should exist", () => {
        expect(wrapper.exists()).toBeTruthy()
    })

    it("should contains", () => {
        const videoBox = wrapper.find(".videobox")
        const coverImage = videoBox.find("img.cover")
        const profileImage = videoBox.find("img.profile")
        const title = videoBox.find(".title");

        expect(videoBox.exists()).toBeTruthy()

        expect(coverImage.exists()).toBeTruthy()
        expect(coverImage.attributes("src")).toMatch(videoData.coverImage)

        expect(profileImage.exists()).toBeTruthy()
        expect(profileImage.attributes("src")).toMatch(videoData.ownerImage)

        expect(title.exists()).toBeTruthy()
    })
})