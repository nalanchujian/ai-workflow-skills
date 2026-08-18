---
name: typescript-web-implementation
version: 3.0.0
description: 在现有 TypeScript Web 项目中受控实施已批准的计划。
phases: [implement]
methodSources:
  - id: superpowers:test-driven-development
    version: 6.2.0
    source: bundled:superpowers
---

# TypeScript Web 实现

## 输入

- 阅读已批准的实施计划、验收标准、技术方案和当前项目约束。
- 已批准计划定义业务目标、验收边界和风险，而不是文件路径白名单。为完成当前工作单元可修改必要的业务代码和测试；任何超出业务目标的重构、依赖升级、凭据或配置变更都必须停止并记录风险。

## 步骤

1. 复用 `superpowers:test-driven-development`，先为每项行为变更建立失败测试，再做最小实现并运行相关验证。
2. 遵守项目的依赖版本、代码风格和构建方式；不要无关重构、升级依赖或修改凭据与配置。
3. 在 `artifacts/implementation.md`（实施子节点则是对应 `artifacts/subtasks/*.md`）固定包含 `## 实际变更`、`## 测试命令`、`## 测试结果`、`## 未完成事项与风险`，记录实际修改、测试命令、结果、未完成事项和任何超出业务目标的请求。

## 验证

- `artifacts/implementation.md` 存在，且每项实际变更均能关联到实施计划和验收标准。
- 已执行相关测试；失败、跳过或无法执行的测试必须如实记录。
- 实际变更均服务于当前工作单元目标与验收标准；不修改当前节点声明产物之外的 `.aiw/` 文件。
