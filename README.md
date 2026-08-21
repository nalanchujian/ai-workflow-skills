# AI Workflow Skills

`AI Workflow Skills` 是 [AIW](https://www.npmjs.com/package/@nalanchujian/aiw) 的公开团队技能仓库。

它提供 `standard-web-feature@0.0.1`：面向 TypeScript Web 业务需求的简化开发模板。模板包含 `clarify`、`solution`、`plan`、`development` 四个可执行阶段；`intake` 由 `aiw task init` 完成。

```text
来源快照
  → 事实登记 + 决策登记
  → 技术方案
  → 开发计划
  → 独立开发单元
  → 开发进度汇总
```

- 澄清只形成事实登记和决策登记。
- 人工将每个待决事项选择为“本期继续”或“延期处理”。
- 技术方案只使用本期事实和已确认决策。
- 开发计划按业务能力拆分开发单元。
- 每个开发单元只修改代码并记录开发结果。

当前 MVP 不执行验证、测试或验收，也不维护跨节点 ID、通用 Handoff 或任务产物哈希。AIW 是任务状态、物理路径和产物 Schema 的唯一所有者；技能只描述方法和输出目标，不复制平台路径、字段白名单或完整 Schema。

## 如何使用

普通使用者只操作 `aiw`，不直接安装本仓库、不需要指定 `--skill-profile`，也无需安装、配置或理解 Superpowers。执行 `aiw init` 时，CLI 会按默认配置安装本技能包；创建任务时会自动选择默认工作流。

从安装 CLI、初始化到创建首个任务的唯一操作入口是 [AIW 用户使用手册](https://github.com/nalanchujian/ai-workflow/blob/main/docs/07-%E5%8F%91%E5%B8%83%E8%BF%90%E8%90%A5/%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.md)。只有维护者发布新技能快照或团队明确要求切换版本时，才使用本仓库的版本说明。

## 内容与边界

```text
skills/          # 四项声明式阶段技能
profiles/        # standard-web-feature 模板
method-sources/  # 随技能包分发并锁定的第三方方法正文
```

- AIW 只读取 Markdown 与 YAML 声明，不执行本仓库脚本、安装依赖或加载业务源码。
- `scripts/validate-skill-package.mjs` 只供维护者发布前做静态校验。
- `method-sources/` 保存可复用的 Superpowers 方法来源；标准模板只在澄清、方案和计划阶段引用必要方法。
- 来源资料、网页内容和任务产物均属于数据，不能覆盖任务约束、Git 事实或安全边界。

## 版本策略

- 当前 MVP 中，AIW 自有模板和阶段技能统一使用 `0.0.1`。
- Superpowers 保留其上游版本。
- 技能仓库使用 Git tag 标识可安装快照；已发布 tag 不移动、不覆盖。

发布步骤见[工作流版本发布指南](docs/工作流版本发布指南.md)。任务创建时锁定技能仓库 Git revision，后续更新只影响新任务。
