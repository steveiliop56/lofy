import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDominantColor = (image: CanvasImageSource) => {
    const context = document.createElement("canvas").getContext("2d")

    context?.drawImage(image, 0, 0, 1, 1);

    const color = context?.getImageData(0, 0, 1, 1).data;

    if (!color) {
        return [0, 0, 0, 0];
    }

    return Array.from(color.slice(0, 4));
}

export const rgbaToHex = (rgba: number[]) => {
    const [r, g, b, a] = rgba.map(Number);

    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    const alpha = a.toString(16).padStart(2, '0'); // Assuming alpha is 0-255

    return `#${red}${green}${blue}${alpha}`;
}

export const saveFile = (blob: Blob, filename: string) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    
    const url = window.URL.createObjectURL(blob);
    
    a.href = url;
    a.download = filename;
    a.click();
    
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0)
}

export const reduceColor = (rgba: number[], percentage: number = 25) => {
    let [r, g, b, a] = rgba.map(Number)

    const factor = (100 - percentage) / 100;

    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);

    return [r, g, b, a];
}