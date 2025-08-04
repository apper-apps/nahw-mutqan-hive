import questionsData from "@/services/mockData/questions.json";

class QuestionService {
  static data = [...questionsData];

  static async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.data];
  }

  static async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const question = this.data.find(item => item.id === id);
    return question ? { ...question } : null;
  }

  static async getByLevelId(levelId) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const questions = this.data.filter(item => item.levelId === levelId);
    return questions.map(q => ({ ...q }));
  }

  static async create(item) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...this.data.map(item => item.id || 0)) + 1;
    const newItem = { ...item, id: newId };
    this.data.push(newItem);
    return { ...newItem };
  }

  static async update(id, updatedData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedData };
      return { ...this.data[index] };
    }
    return null;
  }

  static async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.data.findIndex(item => item.id === id);
    if (index !== -1) {
      const deleted = this.data.splice(index, 1)[0];
      return { ...deleted };
    }
    return null;
  }
}

export default QuestionService;