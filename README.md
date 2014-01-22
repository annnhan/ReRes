ReRes
=====

Change the response of the request.

前端开发过程中，经常会有需要对远程环境调试的需求。比如，修改线上bug，开发环境不在本地等等。我们需要把远程css文件或者js映射到本地的文件上，通过修改本地文件进行调试和开发。通常我们可以通过以下方法来实现映射：

1.修改host文件——只能把域名映射到IP

2.使用Apache或者nginx搭建反向代理——需要装环境，配置相对繁琐

3.使用Fiddler中的AutoRespnose功能——不支持目录映射，mac、linux无法使用

以上方式，或者功能缺失，或者需要额外安装软件，或者配置繁琐、或者不支持多平台。**我理想中的请求映射工具应该是这样的：简单，打开浏览器就能用、支持目录映射和文件映射、跨平台。** ReRes就是居于这个目标写出来的，您可以把请求映射到其他的url，也可以映射到你本机的文件或者目录。ReRes支持单个url映射，也支持目录映射。

**现在就开始使用ReRes**

<!--more-->

首先从chrome商店安装ReRes： <a target="_black" href="https://chrome.google.com/webstore/detail/reres/gieocpkbblidnocefjakldecahgeeica?hl=zh-CN&gl=CN">https://chrome.google.com/webstore/detail/reres/gieocpkbblidnocefjakldecahgeeica?hl=zh-CN&gl=CN</a>

安装完毕后，在地址栏输入`chrome://extensions/`进入扩展页，找到ReRes，勾选“允许访问文件网址”，这样才能让ReRes支持本地映射，如下图：

<img src="http://t3.qpic.cn/mblogpic/3fac61954487ae4ca6aa/460" />

至此，ReRes就可以使用了。下面是一些基本功能的使用操作方法：

**添加规则**

点击“添加规则”按钮，输入以下信息，然后保存：

*   **If URL match**： 一个正则表达式，当请求的URL与之匹配时，规则生效。注意:不要填开头的<code>/</code>和结束的<code>/gi</code>，如<code>/.\*/gi</code>请写成<code>.\*</code>
*   **Response**： 映射的响应地址，这个地址会替换掉url中与上面正则匹配的部分。线上地址请以http://开头，本地地址以file:///开头，比如<code>http://cssha.com</code>或<code>file:///D:/a.js</code>

**启动/禁用**

勾选/取消对应规则前面的勾选框即可。

**编辑规则**

鼠标移到响应规则上，点击“编辑”。

**删除规则**

鼠标移到响应规则上，点击“删除”。

**批量导入规则**

点击“管理规则”按钮进入管理页，点击顶部“导入”按钮，即可导入规则列表文件。规则列表文件是一个json文件，其格式如下：

<pre lang="javascript" line="1">[
    {
        "req":"^https?:\\/\\/.*test.com",
        "res":"http://qunar.com",
        "checked":false
    },
    {
        "req":".*hanan.com",
        "res":"http://cssha.com",
        "checked":true
    }
]
</pre>

其中相关字段含义如下：

*   **req**：请求所匹配的正则表达式（对应于If URL match输入框的内容）
*   **res**：映射的响应地址（对应Response输入框的内容）
*   **checked**：是否启用

 

**本插件开发过程中采用了以下开源项目，感谢支持：**

*   LESS
*   Bootstrap
*   AngularJS
