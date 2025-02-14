class FeatureService {
  async getFeatures() {
    const response = await fetch('https://localhost:7161/api/features');
    if (!response.ok) {
      throw new Error('Failed to fetch features');
    }
    return response.json();
  }

  async getFeature(id) {
    const response = await fetch(`https://localhost:7161/api/features/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch feature');
    }
    return response.json();
  }

  async createFeature(feature) {
    const response = await fetch('https://localhost:7161/api/features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feature),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.errors && errorResponse.errors.TargetCompletionDate) {
        alert(`Target Completion Date: ${errorResponse.errors.TargetCompletionDate[0]}`);
      }
      else if (errorResponse.errors && errorResponse.errors.ActualCompletionDate) {
        alert(`Actual Completion Date: ${errorResponse.errors.ActualCompletionDate[0]}`);
      }
      else {
        alert('An unknown error occurred.');
      }
    }
    return response.ok;
  }

  async updateFeature(id, feature) {
    const response = await fetch(`https://localhost:7161/api/features/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feature),
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      if (errorResponse.errors && errorResponse.errors.TargetCompletionDate) {
        alert(`Target Completion Date: ${errorResponse.errors.TargetCompletionDate[0]}`);
      }
      else if (errorResponse.errors && errorResponse.errors.ActualCompletionDate) {
        alert(`Actual Completion Date: ${errorResponse.errors.ActualCompletionDate[0]}`);
      }
      else {
        alert('An unknown error occurred.');
      }
    }
    return response.ok;
  }

  async deleteFeature(id) {
    const response = await fetch(`https://localhost:7161/api/features/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete feature');
    }
    return response.ok;
  }
}

export default new FeatureService();