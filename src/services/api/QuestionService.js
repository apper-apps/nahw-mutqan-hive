class QuestionService {
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
          { field: { Name: "text" } },
          { field: { Name: "options" } },
          { field: { Name: "correctAnswer" } },
          { field: { Name: "explanation" } },
          { field: { Name: "levelId" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "ASC"
          }
        ]
      };

      const response = await client.fetchRecords('question', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching questions:", error?.response?.data?.message);
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
          { field: { Name: "text" } },
          { field: { Name: "options" } },
          { field: { Name: "correctAnswer" } },
          { field: { Name: "explanation" } },
          { field: { Name: "levelId" } }
        ]
      };

      const response = await client.getRecordById('question', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching question with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  static async getByLevelId(levelId) {
    try {
      const client = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "text" } },
          { field: { Name: "options" } },
          { field: { Name: "correctAnswer" } },
          { field: { Name: "explanation" } },
          { field: { Name: "levelId" } }
        ],
        where: [
          {
            FieldName: "levelId",
            Operator: "EqualTo",
            Values: [parseInt(levelId)]
          }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "ASC"
          }
        ]
      };

      const response = await client.fetchRecords('question', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching questions by level:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  static async create(item) {
    try {
      const client = this.getApperClient();
      
      // Parse options if it's a string
      let options = item.options;
      if (typeof options === 'string') {
        try {
          options = JSON.parse(options);
        } catch (e) {
          options = options.split(',');
        }
      }
      
      const params = {
        records: [
          {
            Name: item.Name || '',
            text: item.text || '',
            options: Array.isArray(options) ? options.join(',') : options || '',
            correctAnswer: parseInt(item.correctAnswer) || 0,
            explanation: item.explanation || '',
            levelId: parseInt(item.levelId) || null
          }
        ]
      };

      const response = await client.createRecord('question', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create question ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
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
        console.error("Error creating question:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  static async update(id, updatedData) {
    try {
      const client = this.getApperClient();
      
      // Handle options field if present
      const updateRecord = { Id: parseInt(id), ...updatedData };
      if (updateRecord.options && Array.isArray(updateRecord.options)) {
        updateRecord.options = updateRecord.options.join(',');
      }
      
      const params = {
        records: [updateRecord]
      };

      const response = await client.updateRecord('question', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update question ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
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
        console.error("Error updating question:", error?.response?.data?.message);
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

      const response = await client.deleteRecord('question', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete question ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          failedDeletions.forEach(record => {
            if (record.message) console.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting question:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
}

export default QuestionService;