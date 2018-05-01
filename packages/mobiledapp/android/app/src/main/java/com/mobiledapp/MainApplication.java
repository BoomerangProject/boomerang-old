package com.mobiledapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativenavigation.NavigationApplication;

import com.reactnativenavigation.react.NavigationPackage;
import com.reactnativenavigation.react.ReactGateway;

import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  protected ReactGateway createReactGateway() {
    return new ReactGateway(this, isDebug(), mReactNativeHost);
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
    );
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new NavigationPackage(this),
            new RNSensitiveInfoPackage(),
            new RandomBytesPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
