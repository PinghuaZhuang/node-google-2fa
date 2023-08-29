import fs from 'fs';
import { authenticator } from 'otplib';

const secret = fs.readFileSync('./.secret', {
  encoding: 'utf-8',
});

const isCodeCorrect = (code) => {
  // authenticator.timeRemaining();
  const ret = authenticator.checkDelta(code.trim(), secret.trim());
  console.log('2FA 验证:', ret, code.trim(), secret.trim());
  if (ret === 0) {
    console.log('2FA 验证通过.');
  }
  return ret;
}

const code = process.argv.slice(2)[0];
if (typeof code !== 'string') {
  console.error('code error');
} else {
  isCodeCorrect(code);
}
