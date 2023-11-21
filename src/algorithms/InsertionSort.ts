export const insertionSort = async (
  arr: number[],
  swap: (arr: number[], i: number, j: number) => void,
  speed: number
): Promise<void> => {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0 && arr[j - 1] > arr[j]) {
      swap(arr, j, j - 1);
      j--;
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  }
};
