// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel(),
    fonts: [{
        provider: fontProviders.local(),
        name: "Minecraft",
        cssVariable: "--font-minecraft",
        options: {
            variants: [{
                src: ['./src/assets/fonts/Minecraft.otf'],
                weight: 'normal',
                style: 'normal'
            }]
        }
    },
    {
        provider: fontProviders.local(),
        name: "MinecraftTen",
        cssVariable: "--font-minecraft-ten",
        options: {
            variants: [{
                src: ['./src/assets/fonts/MinecraftTen.ttf'],
                weight: 'normal',
                style: 'normal'
            }]
        }
    }]
});