import { describe, expect, it } from "@jest/globals";
import mainUrlGenerator from "../../../src/modules/url/mainUrlGenerator";

describe("메인 url 조합 테스트", () => {
  it("adds 1 + 2 to equal 3", () => {
    expect(mainUrlGenerator("8080")).toBe("http://localhost:8080");
  });
});
