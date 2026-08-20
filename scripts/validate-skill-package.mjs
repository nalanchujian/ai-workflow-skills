#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const requiredCompatibility = 'aiwCompatibility: ">=4.0.0 <5.0.0"';
const requiredContract = 'artifactContract: aiw.task-output/v1';
const forbiddenPath = /(?:^|[\s`])(?:\.aiw\/|artifacts\/|handoffs\/|runs\/)[^\s`)]*/m;
const forbiddenProtocolPatterns = [
  { pattern: /\bschemaVersion\b/, label: 'Schema 版本' },
  { pattern: /```ya?ml\b/i, label: '完整 YAML 示例' },
  { pattern: /\b(?:acceptance-intent|acceptance-results|test-results|work-breakdown|fact-register|decision-register)\.ya?ml\b/i, label: '平台产物文件名' },
];
const failures = [];

const skillDirectories = await directories(join(root, 'skills'));
const skills = new Map();

for (const directory of skillDirectories) {
  const relativePath = `skills/${directory}/SKILL.md`;
  const content = await optionalReadFile(join(root, relativePath));
  // Empty local directories are not part of Git releases. Ignore them so the
  // validator reflects the package that users actually install.
  if (content === undefined) continue;
  const { frontMatter, body } = splitFrontMatter(content, relativePath);
  const name = valueOf(frontMatter, 'name');
  const version = valueOf(frontMatter, 'version');
  if (name !== directory) failures.push(`${relativePath}：name 必须与目录名一致`);
  if (version === undefined || !/^\d+\.\d+\.\d+$/.test(version)) failures.push(`${relativePath}：version 必须是 SemVer`);
  requireLine(frontMatter, requiredCompatibility, relativePath);
  requireLine(frontMatter, requiredContract, relativePath);
  for (const heading of ['输入', '步骤', '验证']) {
    if (!new RegExp(`^#{1,6}\\s+${heading}\\s*$`, 'm').test(body)) failures.push(`${relativePath}：缺少「${heading}」章节`);
  }
  const pathMatch = forbiddenPath.exec(body);
  if (pathMatch) failures.push(`${relativePath}：不得固化 AIW 平台路径（${pathMatch[0].trim()}）`);
  for (const { pattern, label } of forbiddenProtocolPatterns) {
    if (pattern.test(body)) failures.push(`${relativePath}：不得复制 AIW ${label}，应服从运行时注入的产物协议`);
  }
  if (name !== undefined && version !== undefined) skills.set(`${name}@${version}`, relativePath);
}

for (const source of await directories(join(root, 'method-sources'))) {
  for (const version of await directories(join(root, 'method-sources', source))) {
    for (const method of await directories(join(root, 'method-sources', source, version))) {
      const relativePath = `method-sources/${source}/${version}/${method}/SKILL.md`;
      const content = await readFile(join(root, relativePath), 'utf8');
      const { body } = splitFrontMatter(content, relativePath);
      const pathMatch = forbiddenPath.exec(body);
      if (pathMatch) failures.push(`${relativePath}：不得固化 AIW 平台路径（${pathMatch[0].trim()}）`);
      for (const { pattern, label } of forbiddenProtocolPatterns) {
        if (pattern.test(body)) failures.push(`${relativePath}：不得复制 AIW ${label}，应服从运行时注入的产物协议`);
      }
    }
  }
}

for (const directory of await directories(join(root, 'profiles'))) {
  const relativePath = `profiles/${directory}/PROFILE.yaml`;
  const content = await readFile(join(root, relativePath), 'utf8');
  requireLine(content, requiredCompatibility, relativePath);
  requireLine(content, requiredContract, relativePath);
  const profileName = valueOf(content, 'name');
  if (profileName !== directory) failures.push(`${relativePath}：name 必须与目录名一致`);
  const profileVersion = valueOf(content, 'version');
  if (profileVersion === undefined || !/^\d+\.\d+\.\d+$/.test(profileVersion)) failures.push(`${relativePath}：version 必须是 SemVer`);
  for (const match of content.matchAll(/^\s{2}(clarify|solution|plan|implement):\s*([^\s]+)\s*$/gm)) {
    if (!skills.has(match[2])) failures.push(`${relativePath}：引用了不存在的技能 ${match[2]}`);
  }
}

if (failures.length > 0) {
  console.error('技能包校验失败：');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`技能包校验通过：${skills.size} 个技能、输出协议一致。`);
}

async function directories(path) {
  const entries = await readdir(path, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

async function optionalReadFile(path) {
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    if (error && typeof error === 'object' && error.code === 'ENOENT') return undefined;
    throw error;
  }
}

function splitFrontMatter(content, relativePath) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(content);
  if (!match) {
    failures.push(`${relativePath}：缺少 front matter`);
    return { frontMatter: '', body: content };
  }
  return { frontMatter: match[1], body: match[2] };
}

function valueOf(content, key) {
  return new RegExp(`^${key}:\\s*([^\\s#]+)\\s*$`, 'm').exec(content)?.[1];
}

function requireLine(content, expected, relativePath) {
  if (!content.includes(expected)) failures.push(`${relativePath}：必须声明 ${expected}`);
}
