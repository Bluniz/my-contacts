import * as db from "../../database/index.js";

class ContactsRepository {
  async findAll(orderBy = "ASC") {
    //! Essa validação impede o SQL injection pois sempre vai forçar a setar ASC ou DESC
    const order = orderBy.toUpperCase() === "ASC" ? "ASC" : "DESC";

    //! Ficamos vulneraveis a SQL injection pois não conseguimos usar o bind
    const rows = await db.query(
      `SELECT contacts.*, categories.name AS category_name 
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id 
      ORDER BY contacts.name ${order}`
    );

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name 
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id 
      WHERE contacts.id = $1`,
      [id]
    );

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name 
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id 
      WHERE contacts.email = $1`,
      [email]
    );
    return row;
  }

  async findByPhone(phone) {
    const [row] = await db.query(
      `
      SELECT contacts.*, categories.name AS category_name 
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id 
      WHERE contacts.phone = $1`,
      [phone]
    );

    return row;
  }

  async create({ name, email, phone, category_id }) {
    //! DESSA FORMA FICA VULNERAVEL A SQL INJECTION
    //! name = ';
    //* INSERT INTO contacts(name) VALUES('';') -> query invalida
    //? Através das injections podem enviar até mesmo comandos SQL para fazerem diversas coisas.

    //! Dessa forma evitamos a INJECTION
    //? RETURNING diz pro banco que após criar quer que retorne o dado, e é possivel escolher quais colunas queremos
    const [row] = await db.query(
      `INSERT INTO contacts(name, email, phone, category_id)
     VALUES($1, $2, $3, $4)
     RETURNING *
     `,
      [name, email, phone, category_id]
    );

    return row;
  }

  async update(id, { name, email, phone, category_id }) {
    const [row] = await db.query(
      `UPDATE contacts
       SET name = $1, email = $2, phone = $3, category_id = $4
       WHERE id = $5
       RETURNING *
      `,
      [name, email, phone, category_id, id]
    );
    return row;
  }

  delete(id) {
    const deleteOperation = db.query(`DELETE FROM contacts where id = $1`, [
      id,
    ]);

    return deleteOperation;
  }
}

export default new ContactsRepository();
