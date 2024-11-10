"use client"
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@nextui-org/button";

export default function Picker() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [key1, setKey1] = useState(-1);
  const [key2, setKey2] = useState(-1);
  const [result, setResult] = useState("...");
  const [rescan, setRescan] = useState(false);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const calc = useCallback(() => {
    if (key1 === -1 || key2 === -1 || !data) {
      setResult("Please select both recipes.");
      setRescan(false);
      return;
    }

    const items = data.list.data;
    const item1 = items.find(item => item.Key === parseInt(key1));
    const item2 = items.find(item => item.Key === parseInt(key2));

    if (item1 && item2) {
      // Check if both scores are below 40 and suggest rescanning
      if (item1.Score < 40 && item2.Score < 40) {
        setRescan(true);
      } else {
        setRescan(false);
      }

      // Provide recommendation based on the higher score
      if (item1.Score > item2.Score) {
        setResult(`Recommended: ${item1.Recipe} (${item1.Score}) by ${Math.round(item1.Score - item2.Score, 2)} points`);
      } else if (item1.Score < item2.Score) {
        setResult(`Recommended: ${item2.Recipe} (${item2.Score}) by ${Math.round(item2.Score - item1.Score, 2)} points`);
      } else {
        setResult(`Either option (${item1.Recipe} or ${item2.Recipe}) is fine.`);
      }
    }
  }, [key1, key2, data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const items = data.list.data;

  return (
    <div className="flex flex-col justify-center align-center text-center p-0">
      <h1>Choosing Between...</h1>
      <div className="flex flex-row justify-center align-center text-center p-5">
      <Autocomplete
        label="Select a recipe"
        className="max-w-xs m-2"
        onSelectionChange={(key) => {
          setKey1(key);
        }}
      >
        {items.map(item => (
          <AutocompleteItem key={item.Key} value={item.Key}>
            {item.Recipe}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        label="Select a second recipe"
        className="max-w-xs m-2"
        onSelectionChange={(key) => {
          setKey2(key);
        }}
      >
        {items.map(item => (
          <AutocompleteItem key={item.Key} value={item.Key}>
            {item.Recipe}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      </div>
      <p id="select">{result}</p>
      {rescan && <p className="text-red-500">Note: Both scores are low; you may want to rescan if possible.</p>}
      <Button className="m-5" onClick={calc}>Go!</Button>
    </div>
  );
}
