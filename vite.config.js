import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Helper plugin to synchronize compiled assets to Laravel's public/build directory
function syncToLaravelPlugin() {
    return {
        name: 'sync-to-laravel',
        closeBundle() {
            try {
                const distDir = path.resolve(process.cwd(), 'dist');
                const publicBuildDir = path.resolve(process.cwd(), 'public/build');
                const publicAssetsDir = path.resolve(publicBuildDir, 'assets');
                const distAssetsDir = path.resolve(distDir, 'assets');

                if (!fs.existsSync(publicAssetsDir)) {
                    fs.mkdirSync(publicAssetsDir, { recursive: true });
                }

                if (fs.existsSync(distAssetsDir)) {
                    const files = fs.readdirSync(distAssetsDir);
                    let cssFile = '';
                    let jsFile = '';

                    for (const file of files) {
                        fs.copyFileSync(
                            path.join(distAssetsDir, file),
                            path.join(publicAssetsDir, file)
                        );
                        if (file.endsWith('.css') && file.startsWith('index-')) {
                            cssFile = `assets/${file}`;
                        }
                        if (file.endsWith('.js') && file.startsWith('index-')) {
                            jsFile = `assets/${file}`;
                        }
                    }

                    if (cssFile && jsFile) {
                        const manifest = {
                            'resources/css/app.css': {
                                file: cssFile,
                                src: 'resources/css/app.css',
                                isEntry: true,
                            },
                            'resources/js/index.jsx': {
                                file: jsFile,
                                src: 'resources/js/index.jsx',
                                isEntry: true,
                                css: [cssFile],
                            },
                        };
                        fs.writeFileSync(
                            path.join(publicBuildDir, 'manifest.json'),
                            JSON.stringify(manifest, null, 2)
                        );
                    }
                }
            } catch (err) {
                console.warn('Warning: Could not sync to public/build:', err.message);
            }
        },
    };
}

export default defineConfig(({ command }) => {
    const isBuild = command === 'build';

    return {
        plugins: [
            // When serving locally with `npm run dev`, use Laravel plugin for hot reload
            !isBuild &&
                laravel({
                    input: ['resources/css/app.css', 'resources/js/index.jsx'],
                    refresh: true,
                }),
            react(),
            tailwindcss(),
            // When building, sync assets to public/build so local Laravel continues to work seamlessly
            isBuild && syncToLaravelPlugin(),
        ].filter(Boolean),
        build: {
            outDir: 'dist',
            manifest: 'manifest.json',
        },
        server: {
            watch: {
                ignored: ['**/storage/framework/views/**'],
            },
        },
    };
});
