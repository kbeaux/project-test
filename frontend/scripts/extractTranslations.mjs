import { readFile, readdir, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as babel from '@babel/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const extractTranslations = async (dir) => {
  const translations = new Set();

  const processFile = async (filePath) => {
    const content = await readFile(filePath, 'utf-8');
    
    const result = await babel.transformAsync(content, {
      filename: filePath,
      presets: [
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      plugins: [
        ['@babel/plugin-syntax-typescript', { isTSX: true }],
        [
          'babel-plugin-i18next-extract',
          {
            outputPath: 'public/locales/{{locale}}/{{ns}}.json',
            locales: ['fr', 'en'],
            defaultNS: 'translation',
            keyAsDefaultValue: true,
            keyAsDefaultValueForDerivedKeys: true,
            discardOldKeys: true,
            useI18nextDefaultValue: true,
            defaultContexts: [''],
            keySeparator: false,
            contextSeparator: '_',
          },
        ],
      ],
      parserOpts: {
        plugins: ['typescript', 'jsx']
      }
    });

    if (result) {
      console.log(`Processed: ${filePath}`);
    }
  };

  const walkDir = async (currentDir) => {
    const files = await readdir(currentDir);
    
    for (const file of files) {
      const filePath = join(currentDir, file);
      const stats = await stat(filePath);
      
      if (stats.isDirectory()) {
        await walkDir(filePath);
      } else if (
        stats.isFile() && 
        (file.endsWith('.tsx') || file.endsWith('.jsx'))
      ) {
        await processFile(filePath);
      }
    }
  };

  await walkDir(dir);
  console.log('Extraction completed!');
};

// Exécuter le script
const srcDir = join(dirname(__dirname), 'src');
console.log('Starting extraction from:', srcDir);
extractTranslations(srcDir)
  .catch((error) => {
    console.error('Error during extraction:', error);
    process.exit(1);
  });