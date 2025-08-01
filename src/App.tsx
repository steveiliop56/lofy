import React, { useEffect, useState } from "react";
import {
  getDominantColor,
  reduceColor,
  rgbaToHex,
  saveFile,
} from "./lib/utils";
import { createLogo } from "./lib/jimp";
import { Buffer } from "buffer";
import { LoaderCircle, Upload } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Logo } from "./components/logo/logo";

export const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [logo, setLogo] = useState<Buffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = e.target?.result;

        if (!data || !(data instanceof ArrayBuffer)) {
          toast.error("Failed to read file");
          return;
        }

        const image = new Image();

        image.src = URL.createObjectURL(new Blob([data]));

        await new Promise((resolve, rejet) => {
          image.onload = () => {
            resolve(true);
          };
          image.onerror = (e) => {
            toast.error("Failed to load image");
            rejet(e);
          };
        });

        const dominantColor = getDominantColor(image);
        const reducedColor = reduceColor(dominantColor, 25);
        const hexColor = rgbaToHex(reducedColor);

        const buffer = Buffer.from(data);

        const newLogo = await createLogo(color ? color : hexColor, buffer);

        setLogo(newLogo);
        setLoading(false);
      };

      reader.readAsArrayBuffer(file!);
    }
  }, [file, color]);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("Failed to retrieve file");
      return;
    }

    if (file.name.split(".").pop() !== "png") {
      toast.error("File must be a PNG");
      return;
    }

    setFile(file);
  };

  const onReset = () => {
    setFile(null);
    setColor(null);
    setLogo(null);
    setLoading(true);
  };

  return (
    <div className="flex flex-col bg-neutral-900 min-h-dvh justify-between">
      <div className="flex flex-col items-center mt-40">
        <h1 className="text-6xl bg-gradient-to-r from-blue-600 to-sky-400 to-50% text-transparent bg-clip-text font-bold inline-block leading-relaxed">
          Lofy
        </h1>
        <h2 className="text-lg text-neutral-400 mb-6 text-center">
          A logo generator that just works
        </h2>
        <div className="flex flex-col items-center justify-center bg-neutral-800 p-6 rounded-md border-neutral-700 hover:border-neutral-600 transition-colors delay-100 border-2 border-dashed w-xs md:w-sm relative text-center">
          {!file ? (
            <>
              <input
                type="file"
                accept="image/png"
                onChange={onUpload}
                className="opacity-0 min-w-full min-h-full absolute top-0 left-0 cursor-pointer"
              />
              <Upload className="size-8 text-neutral-200 mb-3" />
              <h3 className="text-md mb-1">
                Click to upload a file or drag 'n' drop
              </h3>
              <p className="text-muted-foreground">
                Only PNG files are supported at the moment
              </p>
            </>
          ) : (
            <>
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mb-3" />
                  <p className="text-muted-foreground">Loading...</p>
                </>
              ) : (
                <>
                  <Logo
                    url={URL.createObjectURL(new Blob([logo!]))}
                    className="mb-3"
                  />
                  <p className="text-muted-foreground mb-3">
                    Select a color, leave empty for auto selection
                  </p>
                  <Input
                    placeholder="#ffffff"
                    maxLength={9}
                    name="color"
                    className="mb-3"
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <Button
                    onClick={() => saveFile(new Blob([logo!]), "logo.jpg")}
                    className="min-w-full mb-3"
                  >
                    Download
                  </Button>
                  <Button
                    onClick={onReset}
                    variant="outline"
                    className="min-w-full"
                  >
                    Start Over
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-3">
        <p className="text-muted-foreground">
          Source code on{" "}
          <a
            href="https://github.com/steveiliop56/lofy"
            target="_blank"
            className="underline"
          >
            Github
          </a>
          .
        </p>
      </div>
    </div>
  );
};
