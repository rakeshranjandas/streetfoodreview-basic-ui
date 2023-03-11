export const validationRules = {
  NON_EMPTY: (val) => {
    return val !== ""
  },
  NON_ZERO: (val) => {
    return val !== "0"
  },
}

export function ErrorSpan(props) {
  return <span className="error-span">{props.error}</span>
}

export function validate(data, rules) {
  let error = {}

  Object.keys(data).map((key) => {
    if (!(key in rules)) return true

    let rulesArr = rules[key]

    rulesArr.rules.map((rule) => {
      if (!rule(data[key])) {
        error[key] = rulesArr.message ?? key + " is not given properly"
        return false
      }

      return false
    })

    return true
  })

  return error
}
