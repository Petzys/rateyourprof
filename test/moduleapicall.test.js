import axios from "axios";
import {ModuleApi} from "../src/components/moduleApi";

const moduleApi = new ModuleApi();
jest.mock("axios");

describe("module api test", () => {
    const axiosGetSpy = jest.spyOn(axios, "post");
    const mockUrl = "http://localhost:8000/ratings/getStars";
    const mockResponse = {
        name: "Mathematik",
        tempo: 30,
        nachvollziehbarkeit: 87,
        anschaulichkeit: 34,
        interaktivitaet: 35,
        corona: 89,
    };
    beforeAll(() => {
        axiosGetSpy.mockImplementation((url) => {
            expect(url).toBe(mockUrl);
            return Promise.resolve({status: 200, data: mockResponse});
        });
    });
    afterAll(() => {
        axiosGetSpy.mockClear();
    });
    test("get data", async () => {
        const ans = await moduleApi.call();
        expect(ans).toBeDefined();
        expect(ans.ratings).toBeDefined();
        expect(ans.moduleName).toBeDefined();
    });
});


