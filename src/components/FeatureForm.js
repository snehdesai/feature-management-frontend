import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeatureService from '../services/FeatureServices';

const FeatureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState({
    title: '',
    description: '',
    estimatedComplexity: 'S', // Default value for dropdown
    status: 'New', // Default value for dropdown
    targetCompletionDate: '',
    actualCompletionDate: '',
  });

  // Dropdown options
  const complexityOptions = ['S', 'M', 'L', 'XL'];
  const statusOptions = ['New', 'Active', 'Closed', 'Abandoned'];

  useEffect(() => {
    if (id) {
      loadFeature(id);
    }
  }, [id]);

  const loadFeature = async (id) => {
    const data = await FeatureService.getFeature(id);
    setFeature(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeature({ ...feature, [name]: value });
  };
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await FeatureService.updateFeature(id, feature);
    } else {
      await FeatureService.createFeature(feature);
    }
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Feature' : 'Create Feature'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={feature.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={feature.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows="4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Complexity</label>
          <select
            name="estimatedComplexity"
            value={feature.estimatedComplexity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            {complexityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={feature.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Completion Date</label>
          <input
            type="date"
            name="targetCompletionDate"
              value={formatDate(feature.targetCompletionDate)}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Actual Completion Date</label>
          <input
            type="date"
            name="actualCompletionDate"
            value={formatDate(feature.actualCompletionDate)}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default FeatureForm;