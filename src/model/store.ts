import { appConfigDir } from '@tauri-apps/api/path';
import { fs, os, path } from '@tauri-apps/api';
import { DisplayServerItem } from '../share/types';

const CONFIG_FILE = 'rwrsp-config.json';

interface IFavorite {
  ip: string;
  port: number;
}

export interface IAppConfig {
  favoriteList: IFavorite[];
  locale: string;
}

const genDefaultConfig = (): IAppConfig => {
  return {
    favoriteList: [],
    locale: 'en_US'
  };
};

export class StoreModel {
  config: IAppConfig = genDefaultConfig();

  async init() {
    const configDir = await appConfigDir();
    const configFilePath = `${configDir}${path.sep}${CONFIG_FILE}`;
    if (await fs.exists(configFilePath)) {
      this.config = JSON.parse(
        await fs.readTextFile(`${configDir}${path.sep}${CONFIG_FILE}`)
      );
    } else {
      await this.flushConfig();
    }

    return this.config;
  }

  async flushConfig() {
    const configDir = await appConfigDir();

    if (!(await fs.exists(configDir))) {
      await fs.createDir(configDir);
    }

    const configFilePath = `${configDir}${path.sep}${CONFIG_FILE}`;
    await fs.writeTextFile(configFilePath, JSON.stringify(this.config));
  }

  async addFavorite(s: DisplayServerItem) {
    if (
      this.config.favoriteList.some(
        (f) => s.ipAddress === f.ip && s.port === f.port
      )
    ) {
      return;
    }
    this.config.favoriteList.push({
      ip: s.ipAddress,
      port: s.port,
    });
    await this.flushConfig();
  }

  matchFavorite(s: DisplayServerItem) {
    return this.config.favoriteList.some(
      (f) => f.ip === s.ipAddress && f.port === s.port
    );
  }

  async removeFavorite(s: DisplayServerItem) {
    this.config.favoriteList = this.config.favoriteList.filter((f) => {
      return !(f.ip === s.ipAddress && f.port === s.port);
    });
    await this.flushConfig();
  }

  async updateLocale(locale: string) {
    this.config.locale = locale;
    await this.flushConfig();
  }

  async reset() {
    this.config = genDefaultConfig();
    await this.flushConfig();
  }
}
