目标：通过 Google 搜索建议 API 遍历 a-z，获取用户真实搜索习惯。

## 背景

这个地址是 Google 浏览器搜索框自动补全的背后接口，不需要 API Key、不需要认证，直接 curl 就能用。
```
https://suggestqueries.google.com/complete/search?client=firefox&q=关键词
```

返回 JSON 格式的联想词列表

## 代码逻辑

1. 先搜一次主词（如 "My Game"）
2. 再遍历 a-z，搜 "My Game a"、"My Game b" ... "My Game z"
3. 去重后输出

## 技术实现

### API 调用示例
```bash
curl "https://suggestqueries.google.com/complete/search?client=firefox&q=My%20Game"
```

### 返回格式
```json
["My Game",["My Game","My Game pc","My Game download","My Game online","My Game unblocked","My Game 2","My Game roblox","My Game xbox","My Game app","My Game friv"]]
```

### 请求参数
| 参数 | 值 | 说明 |
|------|-----|------|
| client | firefox | 客户端类型 |
| q | 关键词 | URL编码的搜索词 |
| hl | (可选) | 语言，如 zh-CN |

## 完整流程

### 阶段1：获取主词联想
- 请求 `https://suggestqueries.google.com/complete/search?client=firefox&q=主词`
- 解析返回 JSON，取第二个元素（联想词数组）
- 保存主词对应的所有联想

### 阶段2：遍历 a-z 组合
- 对每个字母 a-z 分别请求
- 组合词格式：`主词 + 空格 + 字母`，如 "My Game a"
- 将每次返回的联想词追加到结果集

### 阶段3：去重输出
- 使用 Set 或字典去重
- 按出现频次或字母顺序排序
- 输出为文件或标准输出

## 数据输出

### 输出格式建议
```json
{
  "keyword": "My Game",
  "suggestions": [
    "My Game",
    "My Game pc",
    "My Game download",
    ...
  ],
  "total": 26,
  "timestamp": "2026-06-18T10:00:00Z"
}
```

### 输出文件
- 建议保存为 `suggestions_主词.json`
- 可选导出为 CSV 或纯文本列表

## 注意事项

1. **请求频率**：建议在请求之间加入 100-300ms 延迟，避免被限流
2. **错误处理**：网络超时、API 返回非 200 时需要重试
3. **User-Agent**：部分情况可能需要模拟浏览器 UA
4. **IP 限制**：高频请求可能导致临时 IP 被封
5. **结果有限**：每个查询只返回约 10 个联想词

## 依赖（Python 示例）

```python
import requests
import json
import time
import re

def get_suggestions(keyword):
    url = f"https://suggestqueries.google.com/complete/search?client=firefox&q={quote(keyword)}"
    resp = requests.get(url)
    return json.loads(resp.text)[1] if resp.status_code == 200 else []

def main(keyword):
    results = set()
    # 主词
    results.update(get_suggestions(keyword))
    time.sleep(0.2)
    # a-z 组合
    for char in 'abcdefghijklmnopqrstuvwxyz':
        results.update(get_suggestions(f"{keyword} {char}"))
        time.sleep(0.2)
    return sorted(results)
```

## 可能的扩展

- [ ] 支持多语言/多地区 (hl 参数)
- [ ] 批量关键词输入
- [ ] 可视化结果分析
- [ ] 导出为关键词列表用于 SEO/竞价
