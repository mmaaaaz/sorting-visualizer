import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import {
  bubbleSort,
  insertionSort,
  quickSort,
  mergeSort,
  heapSort,
  selectionSort,
} from "./algorithms";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0);
  const [arraySize, setArraySize] = useState<number>(50);
  const [currentProcessIndex, setCurrentProcessIndex] = useState<number | null>(
    null
  );
  const algos = [
    "Bubble Sort",
    "Insertion Sort",
    "Quick Sort",
    "Merge Sort",
    "Heap Sort",
    "Selection Sort",
  ];

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
    setCurrentProcessIndex(null); // Reset the current process index
  };

  const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const swap = (arr: number[], idx1: number, idx2: number) => {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
    setCurrentProcessIndex(idx1);
    setCurrentProcessIndex(idx2);
    setArray([...arr]);
  };

  const handleSort = async (algo: string) => {
    if (!isSorting) {
      setIsSorting(true);

      await handleSortFunction(algo);
      setIsSorting(false);
      setCurrentProcessIndex(null);
    }
  };

  const handleSortFunction = (algo: string) => {
    switch (algo) {
      case "Bubble Sort":
        return bubbleSort(array, swap, speed);
      case "Insertion Sort":
        return insertionSort(array, swap, speed);
      case "Quick Sort":
        return quickSort(array, swap, speed);
      case "Merge Sort":
        return mergeSort(array, swap, speed);
      case "Heap Sort":
        return heapSort(array, swap, speed);
      case "Selection Sort":
        return selectionSort(array, swap, speed);
      default:
        throw new Error("Invalid algorithm");
    }
  };

  return (
    <div className="sorting-visualizer flex flex-col justify-between">
      <div className="controls gap-2 mt-9">
        {algos.map((algo) => (
          <button
            key={algo}
            disabled={isSorting}
            className="p-2 border rounded"
            onClick={() => handleSort(algo)}
          >
            {algo}
          </button>
        ))}

        <button
          disabled={isSorting}
          className="p-2 border rounded"
          onClick={resetArray}
        >
          Reset Array
        </button>

        <div>
          <label>Array Size: </label>
          <input
            type="range"
            disabled={isSorting}
            min="5"
            step={5}
            max="70"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center">
          <label>Speed: </label>
          <input
            type="range"
            disabled={isSorting}
            min="50"
            max="500"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="array-container min-h-[70vh] overflow-hidden overflow-x-scroll">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`array-bar text-xs font-bold tracking-wider select-none flex items-center justify-center ${
              currentProcessIndex === idx ? "bg-red-500" : "bg-blue-700"
            }`}
            style={{ height: `${value}px` }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
