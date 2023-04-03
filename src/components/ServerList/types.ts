import { DisplayServerItem } from "../../share/types";

export interface IServerActionDefine {
  title: string;
  onClick?: (data: DisplayServerItem) => void;
}