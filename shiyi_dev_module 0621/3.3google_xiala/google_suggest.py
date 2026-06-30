#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Google 搜索建议采集器
通过 Google 搜索建议 API 遍历 a-z，获取用户真实搜索习惯
"""

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import requests
import json
import time
import urllib.parse
import os
import sys
from datetime import datetime


# 配置文件路径：放在软件所在目录（与 .py / .exe 同目录）
def get_config_path():
    if getattr(sys, "frozen", False):
        # PyInstaller 打包后，使用 exe 所在目录
        exe_dir = os.path.dirname(sys.executable)
    else:
        # 源码运行时，使用脚本所在目录
        exe_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(exe_dir, "config.json")


CONFIG_PATH = get_config_path()


class GoogleSuggestApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Google 搜索建议采集器")
        self.root.geometry("600x500")
        self.root.resizable(True, True)

        self.results = []
        self.is_running = False

        # 默认配置
        self.config = {
            "keyword": "",
            "delay": 200,
            "proxy": "http://127.0.0.1:7890",
        }

        self.create_widgets()
        self.load_config()  # 启动时自动导入

        # 关闭时自动保存
        self.root.protocol("WM_DELETE_WINDOW", self.on_close)

    # ---------------- 配置读写 ----------------
    def load_config(self):
        """启动时自动导入上次的设置"""
        try:
            if os.path.exists(CONFIG_PATH):
                with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                    saved = json.load(f)
                # 仅读取已知字段，避免配置文件被手动改坏
                self.config["keyword"] = str(saved.get("keyword", ""))
                self.config["delay"] = int(saved.get("delay", 200))
                self.config["proxy"] = str(saved.get("proxy", "http://127.0.0.1:7890"))
        except Exception as e:
            print(f"读取配置失败，使用默认值: {e}")

        # 把配置回填到 UI
        self.keyword_entry.delete(0, tk.END)
        if self.config["keyword"]:
            self.keyword_entry.insert(0, self.config["keyword"])
        self.delay_var.set(self.config["delay"])
        self.proxy_entry.delete(0, tk.END)
        if self.config["proxy"]:
            self.proxy_entry.insert(0, self.config["proxy"])

    def save_config(self):
        """保存当前设置到 config.json"""
        try:
            self.config["keyword"] = self.keyword_entry.get()
            self.config["delay"] = self.delay_var.get()
            self.config["proxy"] = self.proxy_entry.get()
            with open(CONFIG_PATH, "w", encoding="utf-8") as f:
                json.dump(self.config, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"保存配置失败: {e}")

    def on_close(self):
        """关闭窗口时保存配置再退出"""
        self.save_config()
        self.root.destroy()

    # ---------------- UI ----------------
    def create_widgets(self):
        # 标题
        title_frame = ttk.Frame(self.root)
        title_frame.pack(fill=tk.X, padx=10, pady=10)

        ttk.Label(
            title_frame,
            text="Google 搜索建议采集器",
            font=("Microsoft YaHei", 16, "bold")
        ).pack()

        # 输入区域
        input_frame = ttk.LabelFrame(self.root, text="设置", padding=10)
        input_frame.pack(fill=tk.X, padx=10, pady=5)

        ttk.Label(input_frame, text="主词:").grid(row=0, column=0, sticky=tk.W)

        self.keyword_entry = ttk.Entry(input_frame, width=40, font=("Microsoft YaHei", 12))
        self.keyword_entry.grid(row=0, column=1, padx=5, sticky=tk.EW)

        # 延迟设置
        ttk.Label(input_frame, text="请求延迟(ms):").grid(row=1, column=0, sticky=tk.W, pady=(5, 0))

        self.delay_var = tk.IntVar(value=200)
        delay_spin = ttk.Spinbox(
            input_frame,
            from_=100,
            to=1000,
            increment=50,
            textvariable=self.delay_var,
            width=10
        )
        delay_spin.grid(row=1, column=1, padx=5, pady=(5, 0), sticky=tk.W)

        # 代理设置
        ttk.Label(input_frame, text="代理 (可选):").grid(row=2, column=0, sticky=tk.W, pady=(5, 0))

        self.proxy_entry = ttk.Entry(input_frame, width=40, font=("Microsoft YaHei", 10))
        self.proxy_entry.grid(row=2, column=1, padx=5, pady=(5, 0), sticky=tk.EW)

        input_frame.columnconfigure(1, weight=1)

        # 按钮区域
        btn_frame = ttk.Frame(self.root)
        btn_frame.pack(fill=tk.X, padx=10, pady=10)

        self.start_btn = ttk.Button(
            btn_frame,
            text="开始采集",
            command=self.start_collect
        )
        self.start_btn.pack(side=tk.LEFT, padx=5)

        ttk.Button(
            btn_frame,
            text="复制全部",
            command=self.copy_all
        ).pack(side=tk.LEFT, padx=5)

        ttk.Button(
            btn_frame,
            text="导出JSON",
            command=self.export_json
        ).pack(side=tk.LEFT, padx=5)

        ttk.Button(
            btn_frame,
            text="导出TXT",
            command=self.export_txt
        ).pack(side=tk.LEFT, padx=5)

        ttk.Button(
            btn_frame,
            text="清空",
            command=self.clear_results
        ).pack(side=tk.LEFT, padx=5)

        # 进度区域
        progress_frame = ttk.Frame(self.root)
        progress_frame.pack(fill=tk.X, padx=10, pady=5)

        ttk.Label(progress_frame, text="进度:").pack(side=tk.LEFT)

        self.progress_var = tk.DoubleVar()
        self.progress_bar = ttk.Progressbar(
            progress_frame,
            variable=self.progress_var,
            maximum=100,
            length=300
        )
        self.progress_bar.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=5)

        self.progress_label = ttk.Label(progress_frame, text="0%")
        self.progress_label.pack(side=tk.LEFT, padx=5)

        # 结果区域
        result_frame = ttk.LabelFrame(self.root, text="结果列表（右键 / Ctrl+C / Ctrl+A 可复制）", padding=5)
        result_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=5)

        scrollbar = ttk.Scrollbar(result_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        self.result_listbox = tk.Listbox(
            result_frame,
            yscrollcommand=scrollbar.set,
            font=("Microsoft YaHei", 10),
            selectmode=tk.EXTENDED,  # 支持 Shift/Ctrl 多选
            activestyle="dotbox",
        )
        self.result_listbox.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.result_listbox.yview)

        # 复制相关快捷键
        self.result_listbox.bind("<Control-c>", lambda e: self.copy_selected())
        self.result_listbox.bind("<Control-C>", lambda e: self.copy_selected())
        self.result_listbox.bind("<Control-a>", lambda e: self.select_all_results())
        self.result_listbox.bind("<Control-A>", lambda e: self.select_all_results())

        # 右键菜单
        self.context_menu = tk.Menu(self.root, tearoff=0)
        self.context_menu.add_command(label="复制选中", command=self.copy_selected)
        self.context_menu.add_command(label="复制全部", command=self.copy_all)
        self.context_menu.add_separator()
        self.context_menu.add_command(label="全选", command=self.select_all_results)
        self.context_menu.add_command(label="清空", command=self.clear_results)

        # Windows: <Button-3>  是右键
        self.result_listbox.bind("<Button-3>", self.show_context_menu)

        # 状态栏
        self.status_label = ttk.Label(
            self.root,
            text="就绪",
            relief=tk.SUNKEN,
            anchor=tk.W
        )
        self.status_label.pack(fill=tk.X, padx=10, pady=(0, 5))

    def show_context_menu(self, event):
        try:
            self.context_menu.tk_popup(event.x_root, event.y_root)
        finally:
            self.context_menu.grab_release()

    # ---------------- 复制相关 ----------------
    def copy_selected(self):
        """复制当前选中的行（多选用换行分隔）"""
        selection = self.result_listbox.curselection()
        if not selection:
            self.status_label.config(text="未选中任何行")
            return
        lines = [self.result_listbox.get(i) for i in selection]
        self._copy_to_clipboard("\n".join(lines))
        self.status_label.config(text=f"已复制 {len(lines)} 行到剪贴板")

    def copy_all(self):
        """复制全部结果到剪贴板"""
        if not self.results:
            messagebox.showwarning("警告", "结果为空，无需复制")
            return
        self._copy_to_clipboard("\n".join(self.results))
        self.status_label.config(text=f"已复制全部 {len(self.results)} 行到剪贴板")

    def select_all_results(self):
        """Ctrl+A：全选结果列表"""
        self.result_listbox.select_set(0, tk.END)
        return "break"

    def _copy_to_clipboard(self, text):
        """写入剪贴板，失败时给出提示"""
        try:
            self.root.clipboard_clear()
            self.root.clipboard_append(text)
            # 在 Windows 上需要 update 才能立即生效
            self.root.update()
        except Exception as e:
            messagebox.showerror("复制失败", str(e))

    # ---------------- 采集 ----------------
    def start_collect(self):
        if self.is_running:
            return

        keyword = self.keyword_entry.get().strip()
        if not keyword:
            messagebox.showwarning("警告", "请输入主词！")
            return

        # 采集前先保存一次当前设置
        self.save_config()

        self.is_running = True
        self.start_btn.config(state=tk.DISABLED)
        self.results = []
        self.result_listbox.delete(0, tk.END)
        self.update_progress(0)
        self.status_label.config(text="采集中...")

        # 在新线程中执行采集
        import threading
        thread = threading.Thread(target=self.fetch_suggestions, args=(keyword,))
        thread.daemon = True
        thread.start()

    def fetch_suggestions(self, keyword):
        try:
            delay = self.delay_var.get() / 1000.0
            all_suggestions = set()

            # 先获取主词联想
            suggestions = self.get_suggestions(keyword)
            all_suggestions.update(suggestions)
            self.update_results(list(all_suggestions))
            self.update_progress(3.7)  # 1/27 ≈ 3.7%
            time.sleep(delay)

            # 遍历 a-z
            for i, char in enumerate('abcdefghijklmnopqrstuvwxyz', 1):
                query = f"{keyword} {char}"
                suggestions = self.get_suggestions(query)
                all_suggestions.update(suggestions)
                self.update_results(list(all_suggestions))
                self.update_progress((i + 1) / 27 * 100)
                time.sleep(delay)

            self.results = sorted(all_suggestions)
            self.update_results(self.results)
            self.update_progress(100)
            self.status_label.config(text=f"采集完成，共 {len(self.results)} 个联想词")

        except Exception as e:
            self.status_label.config(text=f"错误: {str(e)}")
            messagebox.showerror("错误", str(e))
        finally:
            self.is_running = False
            self.start_btn.config(state=tk.NORMAL)

    def get_suggestions(self, keyword):
        """获取 Google 搜索建议"""
        url = "https://suggestqueries.google.com/complete/search"
        params = {
            "client": "firefox",
            "q": keyword
        }

        proxies = None
        proxy = self.proxy_entry.get().strip()
        if proxy:
            proxies = {
                "http": proxy,
                "https": proxy
            }

        try:
            response = requests.get(url, params=params, proxies=proxies, timeout=15)
            if response.status_code == 200:
                data = response.json()
                return data[1] if len(data) > 1 else []
        except requests.exceptions.ProxyError:
            self.status_label.config(text="代理连接失败，请检查代理设置")
        except requests.exceptions.ConnectTimeout:
            self.status_label.config(text="连接超时")
        except Exception as e:
            print(f"请求失败: {e}")
            self.status_label.config(text=f"请求失败: {str(e)[:30]}")

        return []

    def update_results(self, results):
        """更新结果列表（在主线程中调用）"""
        self.root.after(0, self._update_results_ui, results)

    def _update_results_ui(self, results):
        self.result_listbox.delete(0, tk.END)
        for item in results:
            self.result_listbox.insert(tk.END, item)

    def update_progress(self, value):
        """更新进度条（在主线程中调用）"""
        self.root.after(0, self._update_progress_ui, value)

    def _update_progress_ui(self, value):
        self.progress_var.set(value)
        self.progress_label.config(text=f"{value:.1f}%")

    def export_json(self):
        if not self.results:
            messagebox.showwarning("警告", "没有可导出的结果！")
            return

        filepath = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON 文件", "*.json")],
            initialfile=f"suggestions_{self.keyword_entry.get().strip()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        )

        if filepath:
            try:
                data = {
                    "keyword": self.keyword_entry.get().strip(),
                    "suggestions": self.results,
                    "total": len(self.results),
                    "timestamp": datetime.now().isoformat()
                }
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                messagebox.showinfo("成功", f"已导出到:\n{filepath}")
            except Exception as e:
                messagebox.showerror("错误", str(e))

    def export_txt(self):
        if not self.results:
            messagebox.showwarning("警告", "没有可导出的结果！")
            return

        filepath = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("文本文件", "*.txt")],
            initialfile=f"suggestions_{self.keyword_entry.get().strip()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        )

        if filepath:
            try:
                with open(filepath, 'w', encoding='utf-8') as f:
                    for item in self.results:
                        f.write(item + '\n')
                messagebox.showinfo("成功", f"已导出到:\n{filepath}")
            except Exception as e:
                messagebox.showerror("错误", str(e))

    def clear_results(self):
        self.results = []
        self.result_listbox.delete(0, tk.END)
        self.update_progress(0)
        self.status_label.config(text="已清空")


def main():
    root = tk.Tk()
    app = GoogleSuggestApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
