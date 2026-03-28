package com.cryptotracker.app;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Enable hardware acceleration for better performance
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);
        }
    }
    
    @Override
    public void onBackPressed() {
        // Handle back button - allow navigation within app
        WebView webView = getBridge().getWebView();
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
