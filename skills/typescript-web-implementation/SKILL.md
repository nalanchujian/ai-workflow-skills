---
name: typescript-web-implementation
version: 4.0.0
description: 在现有 TypeScript Web 项目中完成一个可独立审批的交付单元。
phases: [implement]
methodSources:
  - id: superpowers:test-driven-development
    version: 6.2.0
    source: bundled:superpowers
---

# TypeScript Web 交付单元

## 输入

- 阅读当前交付单元上下文、已批准的实施计划、验收标准、技术方案和当前项目约束。
- 已批准计划定义业务目标、验收边界和风险，而不是文件路径白名单。为完成当前工作单元可修改必要的业务代码和测试；任何超出业务目标的重构、依赖升级、凭据或配置变更都必须停止并记录风险。

## 步骤

1. 复用 `superpowers:test-driven-development`，先为每项行为变更建立失败测试，再做最小实现。
2. 遵守项目的依赖版本、代码风格和构建方式；不要无关重构、升级依赖或修改凭据与配置。
3. 在同一次交付内完成工程验证和验收测试；不能把类型检查、构建、关键行为测试或当前验收项留给其他全局节点。
4. 生成 `artifacts/delivery.md`，固定包含 `## 实际变更`、`## 工程验证`、`## 测试命令`、`## 测试结果`、`## 逐项验收`、`## 未完成事项与风险`。记录实际修改、每条命令、退出码或失败原因、当前交付单元的每个 AC 结论及风险。
5. 生成 `artifacts/acceptance-results.yaml`，且只填写当前交付单元声明的 `acceptanceRefs`。没有真实证据不得将 AC 标记为 `passed`。

## 验证

- `artifacts/delivery.md` 与 `artifacts/acceptance-results.yaml` 均存在，且每项实际变更均能关联到当前交付单元目标和验收标准。
- 已执行相关工程验证与测试；失败、跳过或无法执行的测试必须如实记录，不能用“后续 verify/test”代替当前结论。
- 实际变更均服务于当前工作单元目标与验收标准；不修改当前节点声明产物之外的 `.aiw/` 文件。
