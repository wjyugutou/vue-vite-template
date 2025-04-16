export const enum EnumConfigType {
  /** 系统内置 */
  SYSTEM = 'Y',
  /** 系统内置否 */
  NOT_SYSTEM = 'N',
}

export interface Config {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  remark: string
  configId: number
  configName: string
  configKey: string
  configValue: string
  configType: EnumConfigType
}
