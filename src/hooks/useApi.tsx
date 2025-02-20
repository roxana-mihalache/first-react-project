import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Item {
  id?: number;
  name: string;
  amount: string;
  url?: string;
  tags: string;
  type?: string;
  status?: string;
  deadline?: string;
  description?: string;
  isRepetable?: boolean;
}

const fetchData = async (endpoint: string): Promise<Item[]> => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

const addItem = async (endpoint: string, item: Item) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

const deleteItem = async (endpoint: string, id: number) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return id;
};

const updateItem = async (endpoint: string, id: number, updatedItem: Item) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return updatedItem;
};

const useApi = (endpoint: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Item[], Error>({
    queryKey: ["items"],
    queryFn: () => fetchData(endpoint),
  });

  const addMutation = useMutation({
    mutationFn: (item: Item) => addItem(endpoint, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteItem(endpoint, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedItem: Item) => {
      const id = updatedItem.id;
      if (!id) throw new Error("Item must have an id.");
      return updateItem(endpoint, id, updatedItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return {
    data,
    isLoading,
    addItem: addMutation.mutate,
    deleteItem: deleteMutation.mutate,
    updateItem: updateMutation.mutate,
  };
};

export default useApi;
