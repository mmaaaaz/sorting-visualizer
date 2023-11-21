export const selectionSort = async (
  arr: number[],
  swap: (arr: number[], i: number, j: number) => void,
  speed: number
): Promise<void> => {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      swap(arr, i, minIndex);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  }
};
