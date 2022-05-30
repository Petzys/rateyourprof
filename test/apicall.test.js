import axios from "axios";
import {Covid} from "../src/components/covid";

const covid = new Covid();
jest.mock("axios");

describe("covid19 api test", () => {
    const axiosGetSpy = jest.spyOn(axios, "get");
    const mockUrl = "https://api.corona-zahlen.org/districts/08222";
    const mockResponse = {
        "data": {
            "08222": {
                "ags": "08222",
                "name": "Mannheim",
                "county": "SK Mannheim",
                "state": "Baden-Württemberg",
                "population": 309721,
                "cases": 100198,
                "deaths": 483,
                "casesPerWeek": 428,
                "deathsPerWeek": 0,
                "stateAbbreviation": "BW",
                "recovered": 95598,
                "weekIncidence": 138.18888612654615,
                "casesPer100k": 32351.051430158113,
                "delta": {
                    "cases": 0,
                    "deaths": 0,
                    "recovered": 291
                }
            }
        }
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
        const pos = await covid.getCovidNumbers();
        expect(pos).toBeDefined();
        for (let i = 0; i < 4; i++) {
            expect(pos[i]).toBeDefined();
        }
        expect(axiosGetSpy).toHaveBeenCalledWith(mockUrl);
    });
});