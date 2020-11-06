import { Button, Switch } from '@alifd/next';
import * as React from 'react';
import Api from 'share/core/api';
import { prefs } from 'share/core/storage';
import { t } from 'share/core/utils';
import { browser } from 'webextension-polyfill-ts';
import './index.less';

interface PopupState {
  enable: boolean;
}
export default class Popup extends React.Component<any, PopupState> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      enable: true,
    };
  }

  componentDidMount() {
    prefs.ready(() => {
      this.setState({
        enable: !prefs.get('disable-all'),
      });
    });
  }

  handleChange(checked: boolean) {
    this.setState({
      enable: checked,
    });
    Api.setPrefs('disable-all', !checked);
  }

  handleOpen() {
    Api.openURL(browser.extension.getURL('options.html'));
    window.close();
  }

  render() {
    return (
      <div className="page-popup">
        <div className="switcher">
          <Switch checked={this.state.enable} onChange={this.handleChange} size="small" />
          <span>{t('enable_he')}</span>
        </div>
        <div>
          <Button onClick={this.handleOpen} type="secondary">
            {t('manage')}
          </Button>
        </div>
      </div>
    );
  }
}
