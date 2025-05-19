import { Jimp, JimpMime } from 'jimp';

export const createLogo = async (background: string, buffer: Buffer) => {
    const canvas = new Jimp({ width: 512, height: 512, color: background})
    const logo = await Jimp.fromBuffer(buffer)

    logo.scaleToFit({ w: 400, h: 400 }); 
    canvas.composite(logo, 56, 56);

    const result = await canvas.getBuffer(JimpMime.jpeg)
    return result
}