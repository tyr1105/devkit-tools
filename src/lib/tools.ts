export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  keywords: string;
}

export const tools: Tool[] = [
  {
    id: "json",
    name: "JSON 格式化",
    description: "JSON 格式化、压缩、验证工具。支持语法高亮和错误定位。",
    icon: "{ }",
    path: "/tools/json",
    keywords: "json format beautify minify validate 格式化 压缩 验证",
  },
  {
    id: "base64",
    name: "Base64 编解码",
    description: "Base64 编码与解码转换工具，支持文本和文件。",
    icon: "B64",
    path: "/tools/base64",
    keywords: "base64 encode decode 编码 解码",
  },
  {
    id: "url",
    name: "URL 编解码",
    description: "URL 编码与解码转换工具，处理特殊字符。",
    icon: "%20",
    path: "/tools/url",
    keywords: "url encode decode uri component 编码 解码",
  },
  {
    id: "timestamp",
    name: "时间戳转换",
    description: "Unix 时间戳与日期时间互转，支持秒级和毫秒级。",
    icon: "⏱",
    path: "/tools/timestamp",
    keywords: "timestamp unix time date epoch 时间戳 日期 转换",
  },
  {
    id: "regex",
    name: "正则表达式测试",
    description: "在线正则表达式测试工具，实时匹配高亮显示。",
    icon: ".*",
    path: "/tools/regex",
    keywords: "regex regular expression test match 正则表达式 测试 匹配",
  },
  {
    id: "qrcode",
    name: "二维码生成",
    description: "在线生成二维码，支持自定义大小和颜色。",
    icon: "▣",
    path: "/tools/qrcode",
    keywords: "qrcode qr code generator 二维码 生成",
  },
  {
    id: "hash",
    name: "Hash 生成",
    description: "MD5、SHA1、SHA256、SHA512 哈希值计算工具。",
    icon: "#",
    path: "/tools/hash",
    keywords: "hash md5 sha1 sha256 sha512 哈希 散列 摘要",
  },
  {
    id: "uuid",
    name: "UUID 生成",
    description: "批量生成 UUID v4，一键复制。",
    icon: "🆔",
    path: "/tools/uuid",
    keywords: "uuid guid unique id generator 唯一标识 生成",
  },
  {
    id: "color",
    name: "颜色转换",
    description: "HEX、RGB、HSL 颜色格式互转，带可视化选择器。",
    icon: "🎨",
    path: "/tools/color",
    keywords: "color hex rgb hsl converter 颜色 转换 选择器",
  },
  {
    id: "password",
    name: "密码生成",
    description: "随机密码生成器，可自定义长度和字符类型。",
    icon: "🔐",
    path: "/tools/password",
    keywords: "password generator random strong 密码 生成 随机",
  },
];
