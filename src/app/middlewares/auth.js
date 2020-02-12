import jwt from 'jsonwebtoken';
// biblioteca padrão que vem com o node para deixar nossa função async
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // const [bearer, token] = authHeader.split(' '); podemos descartar o bearer desta forma
  const [, token] = authHeader.split(' ');

  try {
    /*  aki estamos utilizando o promisify que transforma nosso metodo em assíncrono para não utilizar o callback do método
    jwt.verify, caso fosse utilizar com calback, o método ficaria desta forma:
    jwt.verify(token,secret,(err,result)=>{//tratar a resposta})
    */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
