import { Keypair } from "@solana/web3.js";

function toBase58(buffer: Buffer): string {
    const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    const BASE = BigInt(ALPHABET.length);
    let num = BigInt("0x" + buffer.toString("hex"));
    let encoded = "";

    while (num > 0) {
        const div = num / BASE;
        const mod = num % BASE;
        encoded = ALPHABET[Number(mod)] + encoded;
        num = div;
    }

    return encoded;
}

function findKeyPairWithPrefix(prefix: string) {
    let keypair: Keypair;
    let publicKeyBase58: string;

    do {
        keypair = Keypair.generate();
        publicKeyBase58 = keypair.publicKey.toBase58();
    } while (!publicKeyBase58.startsWith(prefix));

    console.log(`Found keypair with public key: ${publicKeyBase58}`);
    console.log(`Private key (base64): ${Buffer.from(keypair.secretKey).toString("base64")}`);
}

const prefix = "Attr";
findKeyPairWithPrefix(prefix);
