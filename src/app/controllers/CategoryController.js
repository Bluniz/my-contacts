import CategoriesRepository from "../repositories/CategoriesRepositories.js";
import { isRequiredProps } from "../utils/index.js";

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }
  async show(request, response) {
    const { id } = request.params;

    const errors = await isRequiredProps({ id });

    if (errors) {
      return response.status(400).json({ errors });
    }

    const category = await CategoriesRepository.show(id);

    response.json(category);
  }
  async store(request, response) {
    const { name } = request.body;

    const errors = await isRequiredProps({ name });

    if (errors) {
      return response.status(400).json({ errors });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }
  async update(request, response) {
    const { name } = request.body;
    const { id } = request.params;

    const errors = await isRequiredProps({ name, id });

    if (errors) {
      return response.status(400).json({ errors });
    }

    const updatedCategory = await CategoriesRepository.update(id, { name });

    response.json(updatedCategory);
  }
  async delete(request, response) {
    const { id } = request.params;

    const errors = await isRequiredProps({ id });

    if (errors) {
      return response.status(400).json({ errors });
    }

    const deleteOperation = await CategoriesRepository.delete(id);

    response.json(deleteOperation);
  }
}

export default new CategoryController();
