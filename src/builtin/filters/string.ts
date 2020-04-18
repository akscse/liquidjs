/**
 * String related filters
 *
 * * prefer stringify() to String() since `undefined`, `null` should eval ''
 */
import { stringify } from '../../util/underscore'
import { assert } from '../../util/assert'

export function Append (v: string, arg: string) {
  assert(arg !== undefined, () => 'Append expect 2 arguments')
  return stringify(v) + stringify(arg)
}

export function Prepend (v: string, arg: string) {
  assert(arg !== undefined, () => 'Prepend expect 2 arguments')
  return stringify(arg) + stringify(v)
}

export function Lstrip (v: string) {
  return stringify(v).replace(/^\s+/, '')
}

export function Downcase (v: string) {
  return stringify(v).toLowerCase()
}

export function Upcase (str: string) {
  return stringify(str).toUpperCase()
}

export function Remove (v: string, arg: string) {
  return stringify(v).split(arg).join('')
}

export function RemoveFirst (v: string, l: string) {
  return stringify(v).replace(l, '')
}

export function Rstrip (str: string) {
  return stringify(str).replace(/\s+$/, '')
}

export function Split (v: string, arg: string) {
  return stringify(v).split(arg)
}

export function Strip (v: string) {
  return stringify(v).trim()
}

export function StripNewlines (v: string) {
  return stringify(v).replace(/\n/g, '')
}

export function Capitalize (str: string) {
  str = stringify(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function Replace (v: string, pattern: string, replacement: string) {
  return stringify(v).split(pattern).join(replacement)
}

export function ReplaceFirst (v: string, arg1: string, arg2: string) {
  return stringify(v).replace(arg1, arg2)
}

export function Truncate (v: string, l = 50, o = '...') {
  v = stringify(v)
  if (v.length <= l) return v
  return v.substr(0, l - o.length) + o
}

export function Truncatewords (v: string, l = 15, o = '...') {
  const arr = v.split(/\s+/)
  let ret = arr.slice(0, l).join(' ')
  if (arr.length >= l) ret += o
  return ret
}
