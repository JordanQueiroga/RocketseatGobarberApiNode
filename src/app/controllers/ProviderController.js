import User from '../models/User';
import File from '../models/File';

/* Apesar de estarmos falando de um User, devemos criar um outro controller pois a entidade é outra,
estamos trantando aqui de prestadores de serviços, no UserController podemos visualizar todo o tipo
de usuario, aqui não */
class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}

export default new ProviderController();
