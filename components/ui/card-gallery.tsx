"use client";

import { useEffect, useState } from "react";
import CircularGallery from "@/components/ui/circular-gallery";

export interface CardGalleryItem {
  image: string;
  title: string;
  description?: string;
}

interface Props {
  items: CardGalleryItem[];
  bend?: number;
  scrollSpeed?: number;
  scrollEase?: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function buildCard(item: CardGalleryItem): Promise<string> {
  const W = 900;
  const H = 1200;
  const PAD = 40;
  const IMG_H = 700;
  const RADIUS = 48;
  const TITLE_TOP = IMG_H + PAD + 24;
  const TITLE_SIZE = 52;
  const DESC_SIZE = 30;
  const DESC_LINE_HEIGHT = 42;
  const DESC_TOP = TITLE_TOP + TITLE_SIZE + 24;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return item.image;

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 0, 0, W, H, RADIUS);
  ctx.fill();

  try {
    const img = await loadImage(item.image);
    const imgRadius = RADIUS - 16;
    ctx.save();
    roundRect(ctx, PAD, PAD, W - PAD * 2, IMG_H, imgRadius);
    ctx.clip();

    const targetRatio = (W - PAD * 2) / IMG_H;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;
    if (imgRatio > targetRatio) {
      sw = img.naturalHeight * targetRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / targetRatio;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, PAD, PAD, W - PAD * 2, IMG_H);
    ctx.restore();
  } catch {
    // image failed; leave the image area blank
  }

  ctx.fillStyle = "#0a0a0a";
  ctx.font = `600 ${TITLE_SIZE}px Geist, system-ui, -apple-system, sans-serif`;
  ctx.textBaseline = "top";
  ctx.fillText(item.title, PAD + 8, TITLE_TOP);

  if (item.description) {
    ctx.fillStyle = "#525252";
    ctx.font = `400 ${DESC_SIZE}px Geist, system-ui, -apple-system, sans-serif`;
    const lines = wrapText(ctx, item.description, W - PAD * 2 - 16);
    lines.slice(0, 5).forEach((line, i) => {
      ctx.fillText(line, PAD + 8, DESC_TOP + i * DESC_LINE_HEIGHT);
    });
  }

  return canvas.toDataURL("image/png");
}

export default function CardGallery({ items, bend = 3, scrollSpeed = 0.6, scrollEase = 0.04 }: Props) {
  const [composed, setComposed] = useState<{ image: string; text: string }[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(items.map((it) => buildCard(it).then((image) => ({ image, text: "" })))).then((result) => {
      if (!cancelled) setComposed(result);
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  if (!composed) {
    return <div className="h-full w-full" />;
  }

  return (
    <CircularGallery
      items={composed}
      bend={bend}
      textColor="#0a0a0a"
      borderRadius={0.04}
      scrollSpeed={scrollSpeed}
      scrollEase={scrollEase}
    />
  );
}
