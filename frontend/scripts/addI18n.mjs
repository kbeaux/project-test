import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as babel from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processFile = async (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Parser le code
  const ast = parse(content, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  let hasChanges = false;
  let needsI18nImport = false;

  // Parcourir l'AST
  traverse.default(ast, {
    JSXText(path) {
      const text = path.node.value.trim();
      if (text && text.length > 1) {
        const key = text
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '.')
          .replace(/\.+/g, '.');
        
        path.replaceWith(
          t.jsxExpressionContainer(
            t.callExpression(t.identifier('t'), [t.stringLiteral(key)])
          )
        );
        
        hasChanges = true;
        needsI18nImport = true;
      }
    },
    StringLiteral(path) {
      if (path.parent.type === 'JSXAttribute' && 
          ['placeholder', 'title', 'alt'].includes(path.parent.name.name)) {
        const text = path.node.value;
        const key = text
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '.')
          .replace(/\.+/g, '.');
        
        path.replaceWith(
          t.jsxExpressionContainer(
            t.callExpression(t.identifier('t'), [t.stringLiteral(key)])
          )
        );
        
        hasChanges = true;
        needsI18nImport = true;
      }
    }
  });

  if (hasChanges) {
    if (needsI18nImport) {
      ast.program.body.unshift(
        t.importDeclaration(
          [t.importSpecifier(t.identifier('useTranslation'), t.identifier('useTranslation'))],
          t.stringLiteral('react-i18next')
        )
      );
    }

    const output = generate.default(ast, {}, content);
    fs.writeFileSync(filePath, output.code);
    console.log(`Modified: ${filePath}`);
    
    return true;
  }

  return false;
};

const walkDir = async (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await walkDir(filePath);
    } else if (stat.isFile() && 
              (file.endsWith('.tsx') || file.endsWith('.jsx'))) {
      await processFile(filePath);
    }
  }
};

// Exécuter le script
const componentsDir = path.join(__dirname, '../src/components');
walkDir(componentsDir)
  .then(() => console.log('Done!'))
  .catch(console.error);

