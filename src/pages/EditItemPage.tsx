import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

const EditItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const intl = useIntl();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/');
      return;
    }

    fetch(`https://retoolapi.dev/JIvieP/items/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Item not found');
        return response.json();
      })
      .then((data) => setFormData(data))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || isNaN(Number(id))) {
      navigate('/');
      return;
    }

    fetch(`https://retoolapi.dev/JIvieP/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(() => navigate('/'))
      .catch((error) => console.error('Error updating item:', error));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">
        <FormattedMessage id="editItem" />
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.name' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="amount"
          value={formData.amount || 0}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.amount' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="tags"
          value={formData.tags || ''}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.tags' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder={intl.formatMessage({ id: 'table.header.description' })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          <FormattedMessage id="update" />
        </button>
      </form>
    </div>
  );
};

export default EditItemPage;