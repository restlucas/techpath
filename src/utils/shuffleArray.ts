import { Answer } from "@/redux/slices/lessonSlice";

const shuffleArray = (answersArray: Answer[]) => {
  return answersArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export default shuffleArray;
