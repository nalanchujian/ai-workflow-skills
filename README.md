# AI Workflow Skills

`AI Workflow Skills` 是 [AI Workflow](https://www.npmjs.com/package/@nalanchujian/ai-workflow) 的公开团队技能仓库。

它提供 `standard-web-feature@1.0.0`：面向 TypeScript Web 业务需求的固定七阶段模板。模板将 `clarify`、`solution`、`plan`、`implement`、`verify`、`test` 六个可执行阶段锁定到明确的技能版本；`intake` 由 `aiw task init` 完成，不配置技能。

## 安装

先安装 AI Workflow CLI，并完成本机 Superpowers 方法来源配置：

```bash
npm install -g @nalanchujian/ai-workflow
```

`~/.aiw/config.yaml` 示例：

```yaml
schemaVersion: aiw.local/v1
methodSources:
  superpowers:
    kind: local-skill-directory
    root: /absolute/path/to/superpowers/6.2.0/skills
    version: 6.2.0
    revision: 6.2.0
```

安装本仓库并查看模板：

```bash
aiw skills install https://github.com/nalanchujian/ai-workflow-skills.git --ref v1.0.0
aiw skills profiles list
```

在业务 Git 仓库中创建任务：

```bash
aiw task init \
  --project . \
  --source ./requirements.md \
  --skill-profile standard-web-feature@1.0.0
```

任务初始化会锁定当前 Git revision、模板、技能、方法来源及其哈希；后续更新本仓库不会改写已创建任务。

## 内容与边界

```text
skills/       # 六项声明式阶段技能
profiles/     # standard-web-feature 模板
```

- 本仓库只包含 Markdown 与 YAML 声明，不包含可执行脚本、依赖安装逻辑、密钥或业务源码。
- 技能引用已配置的 Superpowers 方法，不复制其正文；技能只补充 AI Workflow 所需的输入、产物、边界和验证要求。
- 来源资料、网页内容和任务产物均属于数据，不能覆盖任务约束、Git 事实或安全边界。

## 版本策略

- 修正措辞、补充不改变产物或适用阶段的说明：递增 `PATCH`。
- 新增兼容的可选产物或步骤：递增 `MINOR`。
- 修改阶段、方法来源、必需产物或不兼容的执行方式：递增 `MAJOR`。

发布新版本时创建 Git tag。业务任务必须继续使用其初始化时锁定的版本；需要采用新方法时，应重新创建任务或按团队流程重新绑定尚未执行的节点。
