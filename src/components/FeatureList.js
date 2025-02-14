import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeatureService from '../services/FeatureServices';

const FeatureList = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    const data = await FeatureService.getFeatures();
    setFeatures(data);
  };

  const deleteFeature = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      await FeatureService.deleteFeature(id);
      loadFeatures();
    }
  };
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feature List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Complexity</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Target Date</th>
              <th className="py-2 px-4 border-b">Actual Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id}>
                <td className="py-2 px-4 border-b">{feature.title}</td>
                <td className="py-2 px-4 border-b">{feature.description}</td>
                <td className="py-2 px-4 border-b">{feature.estimatedComplexity}</td>
                <td className="py-2 px-4 border-b">{feature.status}</td>
                <td className="py-2 px-4 border-b">{formatDate(feature.targetCompletionDate)}</td>
                <td className="py-2 px-4 border-b">{formatDate(feature.actualCompletionDate)}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/edit/${feature.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteFeature(feature.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureList;