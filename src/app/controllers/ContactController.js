import ContactsRepository from "../repositories/ContactsRepositorie.js";
import { isRequiredProps } from "../utils/index.js";

class ContactController {
  // ? index -> listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts).status(200);
  }

  // ? Show -> Obter 1 registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      //! 404 - Not found
      return response.status(404).json({
        error: "Contact not found",
      });
    }

    response.json(contact);
  }

  // ? Store -> Criar novo registro
  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    const errors = await isRequiredProps({ name, email, phone, category_id });

    if (errors) {
      return response.status(400).json({ errors });
    }

    const contactExistsWithTheSameEmail = await ContactsRepository.findByEmail(
      email
    );

    if (contactExistsWithTheSameEmail) {
      return response.status(400).json({ error: "This e-mail already in use" });
    }

    const contactExistsWithTheSamePhone = await ContactsRepository.findByPhone(
      phone
    );

    if (contactExistsWithTheSamePhone) {
      return response.status(400).json({ error: "This phone already in use" });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(200).json(contact);
  }

  // ? Update -> Editar um registro
  async update(request, response) {
    const { id } = request.params;
    console.log(id);

    const { name, email, phone, category_id } = request.body;

    const errors = await isRequiredProps({ name, email, phone, category_id });

    if (errors) {
      return response.status(400).json({ errors });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: "User not found" });
    }

    const contactExistsWithTheSameEmail = await ContactsRepository.findByEmail(
      email
    );

    if (
      contactExistsWithTheSameEmail &&
      contactExistsWithTheSameEmail.id !== id
    ) {
      return response.status(400).json({ error: "This e-mail already in use" });
    }

    const contactExistsWithTheSamePhone = await ContactsRepository.findByPhone(
      phone
    );

    if (
      contactExistsWithTheSamePhone &&
      contactExistsWithTheSameEmail.id !== id
    ) {
      return response.status(400).json({ error: "This phone already in use" });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.status(200).json(contact);
  }

  // ? Delete => deletar um registro
  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      //! 404 - Not found
      return response.status(404).json({
        error: "Contact not found",
      });
    }

    await ContactsRepository.delete(id);

    //! 204 -> NO CONTENT
    // ? Mesma coisa do 200 porém manda quando a requisição não tem um corpo
    response.sendStatus(204);
  }
}

//! Singleton -> Só posso ter uma instância da entidade
export default new ContactController();

//! Um controller não deve saber como se cria ou faz algo, apenas chamar a entidade que sabe.
