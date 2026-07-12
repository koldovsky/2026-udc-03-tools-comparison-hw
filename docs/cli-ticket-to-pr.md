# Task E (bonus) — Ticket → Code → PR з CLI-агентом

## CLI-агент

**Claude Haiku 4.5**

## Команда, яку запустили

```bash
claude -p "implement the ticket in materials/task-feature-ticket.md"
```

---

## Завдання

Продемонструвати повторюваний паттерн роботи CLI-агента:
1. Прочитати тікет з файлу
2. Реалізувати код та тести
3. Перевірити, що усе працює
4. Документувати результат

## Реалізація

### Тікет
- **Файл**: `materials/task-feature-ticket.md` (FEAT-102)
- **Завдання**: Додати функцію `capitalizeWords()` для title-case рядків
- **Вимоги**: Капіталізувати першу літеру кожного слова, зберегти множинні/початкові/кінцеві пробіли

### Комміт
```
f300df3 FEAT-102: Implement capitalizeWords() function
```

**Diff**: https://github.com/pirogovskiy/2026-udc-03-tools-comparison-hw/commit/f300df3

### Що зробив агент (Haiku 4.5)

#### Реалізація функції
```typescript
export function capitalizeWords(input: string): string {
  return input.replace(/\S+/g, (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}
```

**Підхід**: 
- Regex `\S+` знаходить послідовності non-space символів (слова)
- Для кожного слова: перша літера → uppercase, решта → lowercase
- Пробіли (включно множинні) зберігаються точно як в оригіналі

#### Тести (8 нових)
```typescript
describe("capitalizeWords", () => {
  it("capitalizes the first letter of each word", () => {
    expect(capitalizeWords("WIRELESS mouse")).toBe("Wireless Mouse");
  });

  it("preserves multiple spaces between words", () => {
    expect(capitalizeWords("red   t-shirt")).toBe("Red   T-shirt");
  });

  it("preserves leading and trailing spaces", () => {
    expect(capitalizeWords("  hello world  ")).toBe("  Hello World  ");
  });

  it("returns an empty string unchanged", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("returns whitespace-only string unchanged", () => {
    expect(capitalizeWords("   ")).toBe("   ");
  });

  it("handles already title-cased input", () => {
    expect(capitalizeWords("Already Title Case")).toBe("Already Title Case");
  });

  it("lowercases non-first letters of words", () => {
    expect(capitalizeWords("hELLO wORLD")).toBe("Hello World");
  });

  it("handles single word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });
});
```

## Результати

### Перевірка acceptance criteria

| Критерій | Статус |
|---|---|
| `capitalizeWords()` експортована з `text-utils.ts` | ✅ |
| Капіталізує першу літеру кожного слова | ✅ |
| Множинні пробіли збережені: `"red   t-shirt"` → `"Red   T-shirt"` | ✅ |
| Початкові/кінцеві пробіли збережені | ✅ |
| Порожній рядок обробленого | ✅ |
| Рядок із самих пробілів не ламається | ✅ |
| Усі існуючі тести зелені | ✅ 20/20 |
| Нема регресій | ✅ 0 |

### Тестування

```
Test Files    1 passed (1)
Tests         20 passed (20)
  - 12 existing tests (slugify, parseTags, truncate, capitalize)
  - 8 new tests (capitalizeWords)
Duration      ~250ms
```

## Метрики процесу (Task E)

| Параметр | Результат |
|---|---|
| Тікет розбір | ~1 хв |
| Реалізація | ~2-3 хв (один цикл edit → test → fix) |
| Тестування | ~1 хв (перший запуск провалив на хіфену, переписав regex) |
| Документація | ~1 хв |
| **Разом** | ~5-6 хв |
| **Ітерацій** | 2 (спочатку regex `\b\w` не спрацював на "t-shirt", переписав на `\S+`) |
| **Результат** | 1 коммітз + готовий до PR |

## Висновок

Паттерн "тікет → код → тести → коммітом" спрацював гладко. Агент:
1. ✅ Прочитав тікет, зрозумів вимоги
2. ✅ Реалізував функцію
3. ✅ Додав усі тести з прикладів тікета
4. ✅ Обробив edge cases
5. ✅ Перевірив, що нема регресій

Провалом на першому regex (`\b\w`) показав, що навіть простий функціонал потребує критичного тестування на край-кейсах (hyphenated words). Другий цикл — швидка переписка regex для коректної поведінки.

**Для масштабування**: Паттерн масштабується на складніші тікети — достатньо деталізованої post-умови та прикладів, агент сам напише тести.
