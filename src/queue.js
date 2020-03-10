import Queue from './lib/Queue';
/*
Podemos excutar a nossa lista de jobs em outra máquisa, para isso criamos este arquivo separado,
e depois de configurar nosso package.json podemos rodar o yarn queue
*/

Queue.processQueue();
