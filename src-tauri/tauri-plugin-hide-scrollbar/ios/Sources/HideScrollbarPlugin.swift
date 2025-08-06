import Foundation
import WebKit
import Tauri

public class HideScrollbarPlugin: Plugin {
  private var webview: WKWebView?

  @objc public override func load(webview: WKWebView) {
    self.webview = webview

    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
      webview.scrollView.showsVerticalScrollIndicator = false
      webview.scrollView.showsHorizontalScrollIndicator = false
      webview.scrollView.bounces = false
    }
  }
}

@_cdecl("init_plugin_hide_scrollbar")
func initPlugin() -> Plugin {
  return HideScrollbarPlugin()
}
