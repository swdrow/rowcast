import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default (function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return defineConfig({
        plugins: [react()],
        server: {
            port: Number(env.VITE_PORT || 5173),
            host: '0.0.0.0'
        },
        build: {
            outDir: 'dist',
            sourcemap: mode !== 'production'
        }
    });
});
