import { getRepository, Repository } from 'typeorm';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private respository: Repository<Category>;

  constructor() {
    this.respository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.respository.create({
      name,
      description
    });

    await this.respository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.respository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.respository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
