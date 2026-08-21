---
name: typescript-web-implementation
version: 0.0.1
description: 在现有 TypeScript Web 项目中完成一个独立开发单元。
aiwCompatibility: ">=0.0.1 <1.0.0"
artifactContract: aiw.task-output/v1
phases: [development]
methodSources: []
---

# TypeScript Web 开发单元

## 输入

- 阅读当前开发单元上下文和项目约束。
- 开发单元中的代码范围用于定位，不是文件白名单；可以修改完成目标所必需的业务代码。

## 步骤

1. 先阅读相关源码和现有约束，再完成当前开发单元要求的代码修改。
2. 遵守项目的依赖版本、代码风格和架构边界；避免无关重构、依赖升级、凭据或环境配置变更。
3. 不扩大到其他开发单元，不生成测试结果、验证结论或验收结论。
4. 按 AIW 注入的输出要求记录完成的代码修改、变更文件、未解决问题和已知风险。

## 输出

- 业务代码修改落在 AIW 提供的独立工作区中。
- 一份开发结果，包含完成的代码修改、变更文件、未解决问题和已知风险。
- 结果不得宣称测试通过、验收通过、交付完成或生产可用。
