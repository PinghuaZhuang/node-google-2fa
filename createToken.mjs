import fs from 'fs';
import { authenticator } from 'otplib';

const secret = fs.readFileSync('./.secret', {
  encoding: 'utf-8',
});

setInterval(() => {
  const timeLeft = authenticator.timeRemaining();
  console.log('timeLeft', timeLeft, secret);
  if (timeLeft === 30) {
    console.log('create code:', authenticator.generate(secret));
  }
}, 1000);
