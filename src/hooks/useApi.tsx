import { useState, useEffect } from 'react';

const useApi = (endpoint: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      console.error(err.message || 'Something went wrong when trying to fetch data');
    }
  };

  const addItem = async (item: any) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      await fetchData();
    } catch (err: any) {
      console.error(err.message || 'Something went wrong when trying to add item');
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      setData((prev) => prev.filter((item) => (item as any).id !== id));
    } catch (err: any) {
      console.error(err.message || 'Something went wrong when deleting item');
    }
  };

  return { data, fetchData, addItem, deleteItem };
};

export default useApi;
