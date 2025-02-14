package com.liskovsoft.smartyoutubetv.interceptors;

import android.content.Context;
import com.liskovsoft.sharedutils.helpers.Helpers;

public class AltScriptManagerInterceptor extends ScriptManagerInterceptor {
    // script app from the corresponding app versions
    private static final String[] FIRST_SCRIPT_NAME = {"app-prod.js"};
    private static final String[] LAST_SCRIPT_NAME = {"app-prod.js"};
    private static final String[] LAST_STYLE_NAME = {"airstream-prod-css.css"};

    public AltScriptManagerInterceptor(Context context) {
        super(context);
    }

    protected boolean isFirstScript(String url) {
        return Helpers.endsWith(url, FIRST_SCRIPT_NAME);
    }

    protected boolean isLastScript(String url) {
        return Helpers.endsWith(url, LAST_SCRIPT_NAME);
    }

    protected boolean isStyle(String url) {
        return Helpers.endsWith(url, LAST_STYLE_NAME);
    }
}
