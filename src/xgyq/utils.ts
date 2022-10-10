import {IXgyqAreaItem} from "./ds";

export const dumpXgyqAreaItem = (item: IXgyqAreaItem): string[] => {
  return [
    `· 更新时间：${item.total.mtime}`,
    `· 总确认：${item.total.confirm}`,
    `· 总死亡：${item.total.dead}`,
    `· 总治愈：${item.total.heal}`,
    `· 新增：${item.today.wzz_add}`,
    `· 新确认：${item.today.confirm}`
  ]
}