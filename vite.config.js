import { defineConfig } from 'vite';

export default ({mode}) => {
    return defineConfig({
        build: {
            assetsDir: 'static',
            rollupOptions: {
                input: {
                    index: 'src/index.js'
                },
                output: {
                    entryFileNames: 'lib/index.js'
                }
            }
        },
        plugins: []
    });
};
