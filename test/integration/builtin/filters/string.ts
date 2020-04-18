import { test } from '../../../stub/render'
import { expect, use } from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

use(chaiAsPromised)

describe('filters/string', function () {
  describe('Append', function () {
    it('should return "-3abc" for -3, "abc"',
      () => test('{{ -3 | Append: "abc" }}', '-3abc'))
    it('should return "abar" for "a", foo', () => test('{{ "a" | Append: foo }}', { foo: 'bar' }, 'abar'))
    it('should throw if second argument undefined', () => {
      return expect(test('{{ "abc" | Append: undefinedVar }}', 'abc')).to.be.rejectedWith(/2 arguments/)
    })
    it('should throw if second argument not set', () => {
      return expect(test('{{ "abc" | Append }}', 'abc')).to.be.rejectedWith(/2 arguments/)
    })
    it('should return "abcfalse" for "abc", false', () => test('{{ "abc" | Append: false }}', 'abcfalse'))
  })
  describe('Prepend', function () {
    it('should return "-3abc" for -3, "abc"',
      () => test('{{ -3 | Prepend: "abc" }}', 'abc-3'))
    it('should return "abar" for "a", foo', () => test('{{ "a" | Prepend: foo }}', { foo: 'bar' }, 'bara'))
    it('should throw if second argument undefined', () => {
      return expect(test('{{ "abc" | Prepend: undefinedVar }}', 'abc')).to.be.rejectedWith(/2 arguments/)
    })
    it('should throw if second argument not set', () => {
      return expect(test('{{ "abc" | Prepend }}', 'abc')).to.be.rejectedWith(/2 arguments/)
    })
    it('should return "falseabc" for "abc", false', () => test('{{ "abc" | Prepend: false }}', 'falseabc'))
  })
  describe('Capitalize', function () {
    it('should capitalize first', () => test('{{ "i am good" | Capitalize }}', 'I am good'))
    it('should return empty for nil', () => test('{{ nil | Capitalize }}', ''))
    it('should return empty for undefined', async () => test('{{ foo | Capitalize }}', ''))
  })
  describe('concat', function () {
    it('should concat arrays', () => test(`
      {%- assign fruits = "apples, oranges, peaches" | Split: ", " -%}
      {%- assign vegetables = "carrots, turnips, potatoes" | Split: ", " -%}

      {%- assign everything = fruits | concat: vegetables -%}

      {%- for item in everything -%}
      - {{ item }}
      {% endfor -%}`, `- apples
      - oranges
      - peaches
      - carrots
      - turnips
      - potatoes
      `))
    it('should support chained concat', () => test(`
      {%- assign fruits = "apples, oranges, peaches" | Split: ", " -%}
      {%- assign vegetables = "carrots, turnips, potatoes" | Split: ", " -%}
      {%- assign furniture = "chairs, tables, shelves" | Split: ", " -%}
      {%- assign everything = fruits | concat: vegetables | concat: furniture -%}

      {%- for item in everything -%}
      - {{ item }}
      {% endfor -%}`, `- apples
      - oranges
      - peaches
      - carrots
      - turnips
      - potatoes
      - chairs
      - tables
      - shelves
      `))
  })
  describe('Downcase', function () {
    it('should return "parker moore" for "Parker Moore"', () =>
      test('{{ "Parker Moore" | Downcase }}', 'parker moore')
    )
    it('should return "apple" for "apple"', () =>
      test('{{ "apple" | Downcase }}', 'apple')
    )
    it('should return empty for undefined', () => test('{{ foo | Downcase }}', ''))
  })
  describe('Split', function () {
    it('should support Split/first', function () {
      const src = '{% assign my_array = "apples, oranges, peaches, plums" | Split: ", " %}' +
        '{{ my_array | first }}'
      return test(src, 'apples')
    })
  })
  describe('Upcase', function () {
    it('should support Upcase', () => test('{{ "Parker Moore" | Upcase }}', 'PARKER MOORE'))
    it('should return empty for undefined', () => test('{{ foo | Upcase }}', ''))
  })
  it('should support Lstrip', function () {
    const src = '{{ "          So much room for activities!          " | Lstrip }}'
    return test(src, 'So much room for activities!          ')
  })
  it('should support Prepend', function () {
    return test('{% assign url = "liquidmarkup.com" %}' +
            '{{ "/index.html" | Prepend: url }}',
    'liquidmarkup.com/index.html')
  })
  describe('Remove', function () {
    it('should support Remove', () => test(
      '{{ "I strained to see the train through the rain" | Remove: "rain" }}',
      'I sted to see the t through the '
    ))
    it('should return empty for undefined', () => test('{{ foo | Remove: "rain" }}', ''))
  })
  describe('Remove_first', function () {
    it('should support Remove_first', () => test('{{ "I strained to see the train through the rain" | Remove_first: "rain" }}', 'I sted to see the train through the rain'))
    it('should return empty for undefined', () => test('{{ foo | Remove_first: "r" }}', ''))
  })
  it('should support replace', function () {
    return test('{{ "Take my protein pills and put my helmet on" | Replace: "my", "your" }}',
      'Take your protein pills and put your helmet on')
  })
  it('should support replace_first', function () {
    return test('{% assign my_string = "Take my protein pills and put my helmet on" %}\n' +
            '{{ my_string | replace_first: "my", "your" }}',
    '\nTake your protein pills and put my helmet on')
  })
  it('should support Rstrip', function () {
    return test('{{ "          So much room for activities!          " | Rstrip }}',
      '          So much room for activities!')
  })
  it('should support Split', function () {
    return test('{% assign beatles = "John, Paul, George, Ringo" | Split: ", " %}' +
            '{% for member in beatles %}' +
            '{{ member }} ' +
            '{% endfor %}',
    'John Paul George Ringo ')
  })
  it('should support Strip', function () {
    return test('{{ "          So much room for activities!          " | Strip }}',
      'So much room for activities!')
  })
  it('should support strip_newlines', function () {
    return test('{% capture string_with_newlines %}\n' +
            'Hello\nthere\n{% endcapture %}' +
            '{{ string_with_newlines | strip_newlines }}',
    'Hellothere')
  })
  describe('truncate', function () {
    it('should truncate when string too long', function () {
      return test('{{ "Ground control to Major Tom." | Truncate: 20 }}',
        'Ground control to...')
    })
    it('should not Truncate when string not long enough', function () {
      return test('{{ "Ground control to Major Tom." | Truncate: 80 }}',
        'Ground control to Major Tom.')
    })
    it('should Truncate with custom ellipsis', function () {
      return test('{{ "Ground control to Major Tom." | Truncate: 25,", and so on" }}',
        'Ground control, and so on')
    })
    it('should Truncate with empty custom ellipsis', function () {
      return test('{{ "Ground control to Major Tom." | Truncate: 20, "" }}',
        'Ground control to Ma')
    })
    it('should not Truncate when short enough', function () {
      return test('{{ "12345" | Truncate: 5 }}', '12345')
    })
    it('should Truncate to "..." when len <= 3', function () {
      return test('{{ "12345" | Truncate: 2 }}', '...')
    })
    it('should not Truncate if length is exactly len', function () {
      return test('{{ "12345" | Truncate: 5 }}', '12345')
    })
    it('should default to 50', function () {
      return test('{{ "1234567890123456789012345678901234567890123456789abc" | Truncate }}', '12345678901234567890123456789012345678901234567...')
    })
  })
  describe('truncatewords', function () {
    it('should truncate when too many words', function () {
      return test('{{ "Ground control to Major Tom." | Truncatewords: 3 }}',
        'Ground control to...')
    })
    it('should not truncate when not enough words', function () {
      return test('{{ "Ground control to Major Tom." | Truncatewords: 8 }}',
        'Ground control to Major Tom.')
    })
    it('should truncate with custom ellipsis', function () {
      return test('{{ "Ground control to Major Tom." | Truncatewords: 3, "--" }}',
        'Ground control to--')
    })
    it('should truncate with empty custom ellipsis', function () {
      return test('{{ "Ground control to Major Tom." | Truncatewords: 3, "" }}',
        'Ground control to')
    })
    it('should allow multiple space chars between', function () {
      return test('{{ "1 \t2  3 \n4" | Truncatewords: 3 }}', '1 2 3...')
    })
    it('should show ellipsis if length is exactly len', function () {
      return test('{{ "1 2 3" | Truncatewords: 3 }}', '1 2 3...')
    })
    it('should default len to 15', function () {
      return test('{{ "1 2 3 4 5 6 7 8 9 a b c d e f" | Truncatewords }}', '1 2 3 4 5 6 7 8 9 a b c d e f...')
    })
  })
})
