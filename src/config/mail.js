export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: '090732f763ea57',
    pass: '2098a0e734833e',
  },
  default: {
    from: 'Equipe iNeed Solutions <ineedinformation@ineedsolution.com>',
  },
};

/**
 * servicos de envio de email:
 * - Amazon SES
 * - Mailgun
 * - Sparkpost
 * - Mailtrap (funciona apenas para desenvolvimento)
 * */
