import { authenticator } from "otplib";
import QRCode from "qrcode-terminal";
import fs from 'fs';

/**
 * 初始化 OTP 令牌
 *
 * @param userName 唯一的用户名
 * @param appName 项目名称
 * @returns secret 需要临时缓存的种子密钥
 * @returns qrcodeUrl 展示给用户的二维码 base64
 */
const createSeedSecret = async (userName, appName) => {
  const secret = authenticator.generateSecret();

  const googleKeyuri = authenticator.keyuri(userName, appName, secret);
  await QRCode.generate(googleKeyuri, {
    small: true,
  });

  return { secret, googleKeyuri };
};

createSeedSecret('testname', 'testapp').then(({ secret, googleKeyuri }) => {
  console.log('secret', secret);
  fs.writeFileSync('./.secret', secret);
  console.log('qrcode-url', googleKeyuri);
});
