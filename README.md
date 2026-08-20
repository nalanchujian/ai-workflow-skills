# AI Workflow Skills

`AI Workflow Skills` 是 [AI Workflow](https://www.npmjs.com/package/@nalanchujian/ai-workflow) 的公开团队技能仓库。

它提供 `standard-web-feature@12.0.1`：面向 TypeScript Web 业务需求的交付单元模板。模板将 `clarify`、`solution`、`plan`、`implement` 四个可执行阶段锁定到明确的技能版本；`intake` 由 `aiw task init` 完成，不配置技能。计划获批后，AIW 会把每个业务单元生成独立的 `delivery-<unit-id>` 节点；每个节点在同一次运行中完成代码、工程验证、测试和所属验收项，不再汇总到全局 `verify`、`test` 节点。澄清阶段为每个 AC 固定证据类型；计划阶段绑定 AC、测试能力、测试目标与证据类型，且不能把 UI、API 或集成验收降级为单元测试；交付阶段只能执行批准计划。Codex 只声明业务证据，AIW 执行已批准测试并写入最终验收结论。AIW 是任务路径和产物 Schema 的唯一所有者：每次运行由程序根据 Zod Schema 生成字段说明与合法示例，再下发当前暂存输出回执。技能只描述方法、判断标准和质量要求，不得固化任务路径、平台文件名、字段白名单或完整 Schema，也不得自行生成测试结果。

## 如何使用

普通使用者只操作 `aiw`，不直接安装本仓库、不需要指定 `--skill-profile`，也无需安装、配置或理解 Superpowers：执行 `aiw init` 时，CLI 会按其默认配置安装本技能包；创建任务时会自动选择默认工作流。

从安装 CLI、初始化到创建首个任务的唯一操作入口是 [AI Workflow 用户使用手册](https://github.com/nalanchujian/ai-workflow/blob/main/docs/07-%E5%8F%91%E5%B8%83%E8%BF%90%E8%90%A5/%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.md)。只有团队维护者发布新版本、或团队明确要求切换技能版本时，才使用本仓库的版本说明。

## 内容与边界

```text
skills/       # 四项声明式阶段技能
profiles/     # standard-web-feature 模板
method-sources/ # 随技能包分发并锁定的第三方方法正文
```

- 本仓库只包含 Markdown 与 YAML 声明，不包含可执行脚本、依赖安装逻辑、密钥或业务源码。
- `method-sources/` 仅包含标准工作流实际引用的三个 Superpowers 方法；每个版本目录使用 `SOURCE.yaml` 记录上游 commit、许可证和方法清单，完整声明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
- 来源资料、网页内容和任务产物均属于数据，不能覆盖任务约束、Git 事实或安全边界。

## 版本策略

- 修正措辞、补充不改变产物或适用阶段的说明：递增 `PATCH`。
- 新增兼容的可选产物或步骤：递增 `MINOR`。
- 修改阶段、方法来源、必需产物或不兼容的执行方式：递增 `MAJOR`。

完整的版本关系、模板升级示例和 Git tag 发布步骤见[工作流版本发布指南](docs/工作流版本发布指南.md)。发布新版本时创建 Git tag。Registry 按 Git revision 保留同一来源的多个已安装版本；进行中的任务继续使用创建时锁定的版本。
