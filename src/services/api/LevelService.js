class LevelService {
  static apperClient = null;

  static getApperClient() {
    if (!this.apperClient) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
    return this.apperClient;
  }

  static async getAll() {
    try {
      const client = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "isUnlocked" } },
          { field: { Name: "isCompleted" } },
          { field: { Name: "highScore" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "ASC"
          }
        ]
      };

      const response = await client.fetchRecords('level', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching levels:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  static async getById(id) {
    try {
      const client = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "isUnlocked" } },
          { field: { Name: "isCompleted" } },
          { field: { Name: "highScore" } }
        ]
      };

      const response = await client.getRecordById('level', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching level with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  static async create(item) {
    try {
      const client = this.getApperClient();
      const params = {
        records: [
          {
            Name: item.Name || '',
            title: item.title || '',
            description: item.description || '',
            isUnlocked: item.isUnlocked || false,
            isCompleted: item.isCompleted || false,
            highScore: item.highScore || 0
          }
        ]
      };

      const response = await client.createRecord('level', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create level ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error.message}`);
            });
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating level:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  static async update(id, updatedData) {
    try {
      const client = this.getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            ...updatedData
          }
        ]
      };

      const response = await client.updateRecord('level', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update level ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error.message}`);
            });
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating level:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  static async delete(id) {
    try {
      const client = this.getApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await client.deleteRecord('level', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete level ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) console.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting level:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
}

export default LevelService;