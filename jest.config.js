export default {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // .js, .ts, .jsx, .tsx 파일을 Babel로 변환
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
};
