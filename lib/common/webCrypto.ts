const CryptoParams = {
  Iterations: 100000,
  Hashing: 'SHA-512',
  SaltLength: 32
};

async function encryptText(
  text: string,
  password: string
): Promise<{
  iv: Uint8Array;
  salt: Uint8Array;
  encryptedData: Uint8Array;
}> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const salt = crypto.getRandomValues(new Uint8Array(CryptoParams.SaltLength));
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: CryptoParams.Iterations,
      hash: CryptoParams.Hashing
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encoder.encode(text)
  );

  return { iv, encryptedData: new Uint8Array(encryptedData), salt };
}

async function decryptText(
  encryptedData: ArrayBuffer,
  password: string,
  salt: Uint8Array,
  iv: Uint8Array
): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: CryptoParams.Iterations,
      hash: CryptoParams.Hashing
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encryptedData
  );

  return decoder.decode(decryptedData);
}

export async function encrypt(text: string, secret: string): Promise<string> {
  const { encryptedData, salt, iv } = await encryptText(text, secret);
  return Buffer.concat([salt, iv, encryptedData]).toString('hex');
}

export async function decrypt(cipher: string, secret: string): Promise<string> {
  const data = new Uint8Array(Buffer.from(cipher, 'hex'));
  const salt = data.slice(0, CryptoParams.SaltLength);
  const iv = data.slice(CryptoParams.SaltLength, CryptoParams.SaltLength + 16);
  const enc = data.slice(CryptoParams.SaltLength + 16);
  return await decryptText(enc, secret, salt, iv);
}
