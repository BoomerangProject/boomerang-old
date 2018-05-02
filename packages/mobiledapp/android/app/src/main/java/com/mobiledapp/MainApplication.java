package com.mobiledapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.peel.react.rnos.RNOSModule;
import com.reactnativenavigation.NavigationApplication;

import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {

  @Override
  public boolean isDebug() {
     return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
            new RNSensitiveInfoPackage(),
            new RandomBytesPackage(),
            new VectorIconsPackage()
     );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
     return getPackages();
  }

  @Override
  public String getJSMainModuleName() {
      return "index";
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
