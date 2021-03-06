import {
  startOfDay,
  endOfDay,
  setSeconds,
  setMinutes,
  setHours,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const searchDate = Number(date);

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.params.provider_id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });
    // isto, são os horários disponiveis do provaider poderia por no banco de dados
    const schedule = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '15:00',
      '16:00',
      '17:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ];

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      // cria uma data neste formato para os horários dispoíeveis 2020-06-01 08:00:00
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          isAfter(value, new Date()) &&
          !appointment.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
