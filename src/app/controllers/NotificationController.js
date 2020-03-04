import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    /* cheque se é um  provedor de serviço */
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({ user: req.userId })
      .sort({ createdAt: 'desc' }) // ordena as notificacoes por data
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    console.log('aki');
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }, // atualiza no banco essa coluna
      { new: true } // traz do banco os dados atualizados
    );

    return res.json(notification);
  }
}

export default new NotificationController();
