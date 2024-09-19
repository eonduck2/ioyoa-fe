import { describe, expect, it } from "@jest/globals";
import adder from "../../../adder";

describe("유튜브 url 조합 모듈을 그룹화합니다.", () => {
  //   it("'https://www.googleapis.com/youtube/v3/videos?'가 돼야 합니다.", () => {
  //     expect(ytApiGenerator("videos")).toBe(
  //       "https://www.googleapis.com/youtube/v3/videos?",
  //     );
  //   });

  it("3이 돼야 합니다.", () => {
    expect(adder(1, 2)).toBe(3);
  });
});
