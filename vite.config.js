import {resolve} from 'path';
export default{
    build: {
        lib: {
            entry: [
                resolve(__dirname,'src/attachflow.js'),
            ],
            name: 'attachflow',
            formats: ["es", "umd"],
            fileName: (format,name) => `${name}.${format}.js`,
        },
    },
}