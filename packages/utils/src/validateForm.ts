import { notEmpty, vaildateIdCard, validateBankCard, validateCreditCode, validateEmail, validatePhone } from './validate'

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

export type ValidatorFn = (value: any, rule: RuleItem) => (null | void | string | Promise<null | void | string>)

export interface RuleItem {
  required?: boolean
  type?: RuleTypeString
  message?: string
  min?: number
  max?: number
  maxLength?: number
  minLength?: number
  pattern?: RegExp
  validator?: ValidatorFn
}

export interface Rules {
  [key: string]: RuleItem | RuleItem[]
}

const defaultValidators: Record<string, ValidatorFn> = {
  email: (value, rule) => {
    const res = validateEmail(value as string)
    return res ? null : (rule.message || '邮箱格式错误')
  },
  phone: (value, rule) => {
    const res = validatePhone(value as string)
    return res ? null : (rule.message || '手机号格式错误')
  },
  idCard: (value, rule) => {
    const res = vaildateIdCard(value as string)
    return res.valid ? null : (rule.message || '身份证格式错误')
  },
  bankCard: (value, rule) => {
    const res = validateBankCard(value as string)
    return res ? null : (rule.message || '银行卡格式错误')
  },
  creditCard: (value, rule) => {
    const res = validateCreditCode(value as string)
    return res ? null : (rule.message || '统一社会信用代码格式错误')
  },
  maxLength: (value: string, rule: RuleItem) => {
    const maxLength = rule.maxLength
    return value.length <= maxLength ? null : (rule.message || '字符串长度超过最大限制')
  },
  minLength: (value: string, rule: RuleItem) => {
    const minLength = rule.minLength
    return value.length >= minLength ? null : (rule.message || '字符串长度小于最小限制')
  },
  max: (value: number, rule: RuleItem) => {
    const max = rule.max
    return value <= max ? null : (rule.message || '数值超过最大限制')
  },
  min: (value: number, rule: RuleItem) => {
    const min = rule.min
    return value >= min ? null : (rule.message || '数值小于最小限制')
  },
  required: (value: unknown, rule: RuleItem) => {
    return notEmpty(value) ? null : (rule.message || '必填项不能为空')
  },
}

const defaultValidatorsKeys = Object.keys(defaultValidators)

/**
 * 验证表单
 * @param data 表单数据
 * @param rules 验证规则
 * @returns 错误信息
 * @example
 * ```ts
 * const formData = { username: 'zhang', age: 25, email: 'test@example.com' }
 * const rules = {
 *   username: { required: true, message: '请输入用户名' },
 *   age: { required: true, message: '请输入年龄', min: 18, max: 100 },
 *   email: { required: true, message: '请输入邮箱', type: 'email' },
 * }
 * const result = await vaildateForm(formData, rules)
 * console.log(result) // null
 * ```
 */
export async function vaildateForm(data: Record<string, unknown>, rules: Rules): Promise<null | string> {
  const rulesKeys = Object.keys(rules)

  const validateFnArray = rulesKeys.map((key) => {
    const maybeRuleArray = rules[key]
    const ruleArray = Array.isArray(maybeRuleArray) ? maybeRuleArray : [maybeRuleArray]

    return ruleArray.map((ruleItem) => {
      const arr: Array<ValidatorFn> = []
      if (ruleItem.validator) {
        arr.push(async () => {
          try {
            await ruleItem.validator(data[key], ruleItem)
            return null
          }
          catch (error) {
            console.log('异步 error', error)
            return error.message
          }
        })
      }
      else {
        const ruleItemKeys = Object.keys(ruleItem)
        ruleItemKeys.forEach((ruleItemKey) => {
          if (defaultValidatorsKeys.includes(ruleItemKey)) {
            arr.push(() => {
              return defaultValidators[ruleItemKey](data[key], ruleItem)
            })
          }
        })
      }

      return arr
    })
  }).flat(Infinity) as Array<() => ReturnType<ValidatorFn>>

  await Promise.all(validateFnArray.map(async (fn) => {
    const res = await fn()
    if (res) {
      throw new Error(res)
    }
  }))

  return Promise.resolve(null)
}
