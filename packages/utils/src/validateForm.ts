import { vaildateIdCard, validateBankCard, validateCreditCode, validateEmail, validatePhone } from '../validate'

/**
 * 验证规则类型
 */
export const enum RuleType {
  /** 邮箱 */
  Email = 'email',
  /** 手机号 */
  Phone = 'phone',
  /** 身份证 */
  IDCard = 'idCard',
  /** 银行卡 */
  BankCard = 'bankCard',
  /** 统一社会信用代码 */
  CreditCard = 'creditCard',
  /** IP */
  // IP = 'ip',
  /** URL */
  // URL = 'url',
  /** 域名 */
  // Domain = 'domain',
}

export type RuleTypeString = `${RuleType}`

interface RuleItem {
  required?: boolean
  type?: RuleTypeString
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: unknown) => boolean | string | Promise<boolean | string>
}

export interface Rules {
  [key: string]: RuleItem | RuleItem[]
}

const validators: Record<RuleTypeString, (value: unknown) => boolean | string | Promise<boolean | string>> = {
  email: validateEmail,
  phone: validatePhone,
  idCard: (value) => {
    const res = vaildateIdCard(value as string)
    return res.valid ? true : res.msg
  },
  bankCard: validateBankCard,
  creditCard: validateCreditCode,
}

/**
 * 验证表单
 * @param data 表单数据
 * @param rules 验证规则
 * @returns 错误信息
 */
export async function vaildateForm(data: Record<string, unknown>, rules: Rules): Promise<null | string> {
  try {
    const entries = Object.entries(rules)

    const promises = entries.map(async ([dataField, rule]) => {
      const value = data[dataField]

      /**
       * RuleItem[]
       */
      const _rules = Array.isArray(rule) ? rule : [rule]

      _rules.forEach((item) => {
        let _validator: RuleItem['validator'] = () => true

        if (item.required) {
          _validator = (value) => {
            if (value === null || value === undefined || value === '') {
              return item.message || `${dataField}不能为空`
            }
          }
        }
        else if (item.type) {
          _validator = validators[item.type]
        }
        else {
          if (item.max || item.min) {
            _validator = (value) => {
              const maxRes = item.max ? (value as number) <= item.max : true
              const minRes = item.min ? (value as number) >= item.min : true
              return (maxRes && minRes) ? true : item.message || `${dataField}格式不正确`
            }
          }
        }

        return async () => {
          const res = await _validator(value)
          if (res !== true) {
            return typeof res === 'string' ? res : item.message || `${dataField}格式不正确`
          }
        }
      })
    })

    await Promise.all(promises)

    return Promise.resolve(null)
  }
  catch (error) {
    return error
  }
}
