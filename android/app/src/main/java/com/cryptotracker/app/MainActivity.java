package com.cryptotracker.app;

import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Enable hardware acceleration
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);
            
            // Handle external links - open in browser
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    // Keep our app URL in WebView
                    if (url.startsWith("https://crypto-tracker-kappa-tan.vercel.app")) {
                        return false; // Let WebView handle it
                    }
                    // Open external links in browser
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                    return true;
                }
            });
        }
    }
    
    @Override
    public void onBackPressed() {
        // Back button exits app (single-page app behavior)
        // Don't navigate WebView history
        super.onBackPressed();
    }
}
