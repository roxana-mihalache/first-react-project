import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ItemForm from '../components/ItemForm';
import useApi, { Item } from '../hooks/useApi';
import { endpoint } from '../assets/constants/constants';
import { FormattedMessage } from "react-intl";

const EditItemPage = () => {
  const { id } = useParams();
  const { data, updateItem } = useApi(endpoint);
  const navigate = useNavigate();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const foundItem = data?.find((i) => i.id === Number(id));
    if (foundItem) setItem(foundItem);
  }, [data, id]);

  const handleSubmit = async (updatedData: Item) => {
    if (id) {
      updateItem(updatedData);
      navigate('/');
    }
  };

  if (!item) return <p><FormattedMessage id="loading" defaultMessage="Loading..." /></p>;

  return <ItemForm onSubmit={handleSubmit} initialData={item} />;
};

export default EditItemPage;