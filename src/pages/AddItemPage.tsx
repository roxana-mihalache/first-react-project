import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import useApi, { Item } from "../hooks/useApi";
import { endpoint } from "../assets/constants/constants";

const AddItemPage = () => {
  const { addItem } = useApi(endpoint);
  const navigate = useNavigate();

  const handleSubmit = async (data: Item) => {
    try {
      addItem(data);
      navigate("/");
    } catch (error) {
      console.error("Error occured when trying to add element:", error);
    }
  };

  return <ItemForm onSubmit={handleSubmit} />;
};

export default AddItemPage;
